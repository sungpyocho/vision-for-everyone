import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import { Link, Grid, Box } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © kiWE "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6ac48a",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6ac48a",
    color: "white",
  },
}));

export default function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [arePasswordsSame, setArePasswordsSame] = useState(true); // 두 비번이 같은가?
  const [registerSuccess, setRegisterSuccess] = useState(true);

  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const submitHandler = (event) => {
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

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login") ;
      } else {
        setRegisterSuccess(false);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          키위 회원가입
        </Typography>
        <form className={classes.form} onSubmit={submitHandler} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
                value={Name}
                onChange={nameHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                value={Email}
                onChange={emailHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호(8자 이상)"
                type="password"
                id="password"
                autoComplete="current-password"
                value={Password}
                onChange={passwordHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="비밀번호 확인"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={ConfirmPassword}
                onChange={confirmPasswordHandler}
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
            <Grid item xs={12} style={{ marginTop: "15px" }}>
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
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 계정이 있으신가요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
