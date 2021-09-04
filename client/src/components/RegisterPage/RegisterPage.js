import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import { Button, InputBase } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, Grid, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © kiWE '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  avatar: {
    marginTop: theme.spacing(0),
    backgroundColor: '#6ac48a',
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  inputText: {
    backgroundColor: 'white',
    height: '50px',
    borderRadius: '25px',
    flex: 1,
    marginTop: theme.spacing(0),
    paddingLeft: '15px',
    paddingright: '15px',
  },
  submit: {
    margin: theme.spacing(2),
    backgroundColor: '#ffc1c1',
    fontSize: '18px',
    color: '#232323',
    width: '70%',
    height: '50px',
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: '25px',
    boxShadow: '2px 4px 4px rgba(74, 74, 74, 0.25)',
    border: '1px solid #FFFFFF',
  },
}));

export default function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [arePasswordsSame, setArePasswordsSame] = useState(true); // 두 비번이 같은가?
  const [registerSuccess, setRegisterSuccess] = useState(true);

  const emailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const nameHandler = event => {
    setName(event.currentTarget.value);
  };

  const passwordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const confirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    setArePasswordsSame(true);
    setRegisterSuccess(true);

    if (Password !== ConfirmPassword) {
      setArePasswordsSame(false);
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        setRegisterSuccess(false);
      }
    });
  };

  return (
    <Bg>
      <Wrapper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputBase
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="이름"
                    placeholder="이름"
                    autoFocus
                    value={Name}
                    onChange={nameHandler}
                    className={classes.inputText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputBase
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="이메일 주소"
                    placeholder="이메일 주소"
                    name="email"
                    autoComplete="email"
                    value={Email}
                    onChange={emailHandler}
                    className={classes.inputText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputBase
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호(8자 이상)"
                    placeholder="비밀번호(8자 이상)"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={Password}
                    onChange={passwordHandler}
                    className={classes.inputText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputBase
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="비밀번호 확인"
                    placeholder="비밀번호 확인"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={ConfirmPassword}
                    onChange={confirmPasswordHandler}
                    className={classes.inputText}
                  />
                </Grid>
                {!arePasswordsSame && (
                  <Grid item xs={12}>
                    <Alert severity="error">
                      비밀번호를 동일하게 입력해주세요.
                    </Alert>
                  </Grid>
                )}
                {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
              </Grid>
              {!registerSuccess && (
                <Grid item xs={12} style={{ marginTop: '15px' }}>
                  <Alert severity="error">
                    회원가입에 실패했습니다. <br />
                    입력 내용을 다시 확인해주세요.
                  </Alert>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                키위 가입하기
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ color: 'white' }}
                  >
                    이미 계정이 있으신가요? 로그인
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={2}>
            <Copyright />
          </Box>
        </Container>
      </Wrapper>
    </Bg>
  );
}

RegisterPage.propTypes = {
  history: PropTypes.object,
};

const Wrapper = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 66.6%;
  left: 16.7%;
  right: 16.7%;
  background-color: #2fc4b2;
  @media (max-width: 768px) {
    width: 100%;
    left: 0%;
    right: 0%;
  }
`;

const Bg = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 100%;
  padding: 0px;
  background-color: #2fc4b2;
`;
