#!/bin/bash

###################################################################
############### Function declarations #############################
###################################################################

function check_if_docker_compose_installed {
  if ! [ -x "$(command -v docker-compose)" ]; then
    echo 'Error: docker-compose is not installed.' >&2
    exit 1
  fi
}

function setup_tls_parameters {
  local data_path=$1
  if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
    echo "### Downloading recommended TLS parameters ..."
    mkdir -p "$data_path/conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
    echo
  fi
}

function should_renew_certificate {
  local data_path=$1
  local domains=("$2") # This will convert the string values into an array
    # Check if certificates already exists
  if [ -d "$data_path" ]; then
    read -p "Existing data found for ${domains[*]}. Continue and replace existing certificate? (y/N) " decision
    if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
      echo "0" #Return  empty value, which signifies that we did not create dummy certificate.
    fi
  fi
  echo "1"
}

function make_dummy_certificate {
  local data_path=$1
  local domains=("$2") # This will convert the string values into an array

  # In the case user wants to replace old certificate we will replace it with the new one.
  echo "### Creating dummy certificate for domains ${domains[*]} ..."
  path="/etc/letsencrypt/live/${domains[0]}"
  mkdir -p "$data_path/conf/live/${domains[0]}"
  docker-compose run --rm --entrypoint " \
    openssl req -x509 -nodes -newkey rsa:1024 -days 1 \
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" certbot
  echo
}

function start_nginx {
  echo "### Starting nginx ..."
  docker-compose up --force-recreate -d nginx
  echo
}


function delete_dummy_certificate {
  local dummy_certificate_domain=$1
  echo "### Deleting dummy certificate for $dummy_certificate_domain ..."
  docker-compose run --rm --entrypoint " \
    rm -Rf /etc/letsencrypt/live/$dummy_certificate_domain && \
    rm -Rf /etc/letsencrypt/archive/$dummy_certificate_domain && \
    rm -Rf /etc/letsencrypt/renewal/$dummy_certificate_domain.conf" certbot
  echo
}

function request_new_certificate {
  local domains=( "$1" )
  local email="$2"
  local rsa_key_size="$3"
  local staging="$4"

  echo "### Requesting Let's Encrypt certificate for ${domains[*]} ..."
  #Join $domains to -d args
  domain_args=""
  for domain in $domains; do
    domain_args="$domain_args -d $domain"
  done

  # Select appropriate email arg
  case "$email" in
    "") email_arg="--register-unsafely-without-email" ;;
    *) email_arg="--email $email" ;;
  esac

  # Enable staging mode if needed
  if [ "$staging" != "0" ]; then
    staging_arg="--staging";
  fi

  docker-compose run --rm --entrypoint " \
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      $email_arg \
      $domain_args \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal" certbot
  echo
}

function reload_nginx {
  echo "### Reloading nginx ..."
  docker-compose exec nginx nginx -s reload
}


###################################################################
##################### Script start ################################
###################################################################


domains_list=(kiwe.app www.kiwe.app)
rsa_key_size=4096
data_path="./client/certbot"
email="korra0501@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

check_if_docker_compose_installed

setup_tls_parameters $data_path

# Create dummy certificates if needed.
n_renewals=0
dummy_certificate_domains=()
for domains in "${domains_list[@]}"; do
    renew_certificate=$(should_renew_certificate "$data_path" "$domains")
    if [ "$renew_certificate" -eq "1" ]; then
      n_renewals=$(( n_renewals+1 ))
      make_dummy_certificate "$data_path" "$domains"
      dummy_certificate_domains+=( "${domains[0]}" )
    else
      dummy_certificate_domains+=( "" )
    fi
done

if [ "$n_renewals" -eq  "0" ]; then
  echo "No new renewals, quitting."
  exit
fi

start_nginx

# For each domain renew certificate (if needed).
n_domains="${#domains_list[@]}"
for (( i=0; i<"$n_domains"; i++ )); do
  dummy_certificate_domain="${dummy_certificate_domains[$i]}"
  if [ -z "$dummy_certificate_domain" ]; then
    # if we did not create dummy certificate continue to the next domain.
    continue
  fi

  delete_dummy_certificate "$dummy_certificate_domain"

  domains="${domains_list[$i]}"

  request_new_certificate "$domains" "$email" "$rsa_key_size" "$staging"
done

# Reload nginx with new certificates.
reload_nginx