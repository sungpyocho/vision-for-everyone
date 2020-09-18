import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import { Button, InputBase } from "@material-ui/core/";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_actions";

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
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#6ac48a",
  },
  form: {
    width: "85%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputText: {
    backgroundColor: "white",
    height: "50px",
    borderRadius: "25px",
    flex: 1,
    paddingLeft: "15px",
    paddingright: "15px",
    marginTop: theme.spacing(2),
  },
  submit: {
    backgroundColor: "white",
    color: "#232323",
    fontSize: "18px",
    width: "70%",
    height: "50px",
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: theme.spacing(4),
    borderRadius: "25px",
    boxShadow: "2px 4px 4px rgba(74, 74, 74, 0.25)",
    border: "1px solid #FFFFFF",
  },
  register: {
    margin: theme.spacing(2),
    backgroundColor: "#ffc1c1",
    fontSize: "18px",
    color: "#232323",
    width: "70%",
    height: "50px",
    marginLeft: "15%",
    marginRight: "15%",
    borderRadius: "25px",
    boxShadow: "2px 4px 4px rgba(74, 74, 74, 0.25)",
    border: "1px solid #FFFFFF"
  },
  loginError: {
    color: "white",
    backgroundColor: "#2fc4b2"
  },
  loginErrorIcon: {
    color: "white"
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // page refresh 방지

    let body = {
      email: Email,
      password: Password,
    };

    // _actions/user_action.js의 loginUser로 보내져서, Axios로 처리
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        // 페이지를 이동할 때는 props.history.push를 사용
        props.history.push("/chat");
      } else {
        setLoginError(true);
      }
    });
  };

  return (
    <Bg>
      <Wrapper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src={require("../../assets/kiwe-login.svg")} width="104" height="104"></img>
            <form
              className={classes.form}
              onSubmit={onSubmitHandler}
              noValidate
            >
              <InputBase
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                placeholder="이메일 주소"
                autoFocus
                value={Email}
                onChange={emailHandler}
                className={classes.inputText}
              />
              <InputBase
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                value={Password}
                onChange={passwordHandler}
                className={classes.inputText}
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="로그인 유지"
          /> */}
              {loginError && (
                <Alert severity="error" classes={{standardError: classes.loginError, icon:classes.loginErrorIcon}}>
                  아이디 또는 비밀번호를 다시 확인해주세요.
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                로그인 하기
              </Button>
              <Button
                fullWidth
                variant="contained"
                className={classes.register}
                href="/register"
              >
                회원가입 하기
              </Button>
              <Grid container justify="center">
                <Grid item>
                  <Link
                    href="/forgot"
                    variant="body2"
                    style={{ color: "white" }}
                  >
                    비밀번호 찾기
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={4}>
            <Copyright />
          </Box>
        </Container>
      </Wrapper>
    </Bg>
  );
}
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
