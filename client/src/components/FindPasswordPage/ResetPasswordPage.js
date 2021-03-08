import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

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

export default function ResetPasswordPage(props) {
  const classes = useStyles();

  const [Password, setPassword] = useState(""); // 비번
  const [ConfirmPassword, setConfirmPassword] = useState(""); // 비번 확인
  const [arePasswordsSame, setArePasswordsSame] = useState(true); // 두 비번이 같은가?
  const [isLinkValid, setIsLinkValid] = useState(true); // 링크가 유효한가?
  const [isUsingPastPassword, setIsUsingPastPassword] = useState(false); // 과거 비밀번호를 또 입력했나?

  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // 1. 비밀번호를 입력하지 않았다면...? => (그럴일은 잘 없으니) 브라우저단의 Alert
    if (Password === "" || ConfirmPassword === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (Password !== ConfirmPassword) {
      // 2. 입력한 비밀번호가 서로 다르다면...? => Material UI의 화면상 Alert. Submit 버튼 밑에 뜨게.
      setArePasswordsSame(false);
      setIsUsingPastPassword(false);
    } else {
      setArePasswordsSame(true);
      setIsUsingPastPassword(false);

      // axios로 백엔드 API와 통신
      axios
        .post("/api/user/reset", {
          password: Password,
          resetPwdToken: props.location.pathname.slice(7),
        })
        .then((res) => {
          // 3. 비밀번호 재설정 링크가 유효하지 않다면..
          if (res.data.message === "link not valid") {
            setIsLinkValid(false);
            setIsUsingPastPassword(false);
          } else {
            setIsLinkValid(true);
            setIsUsingPastPassword(false);
          }
          // 4. 예전에 사용한 비밀번호를 또 입력했다면..
          if (res.data.pwdNotChanged === true) {
            setIsUsingPastPassword(true);
          }
          // 5. 전부 관문을 통과한다면 로그인 페이지로 리다이렉트
          if (res.data.success === true && res.data.userInfo) {
            alert("비밀번호가 성공적으로 변경되었습니다.");
            props.history.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          비밀번호 재설정
        </Typography>
        {!isLinkValid && (
          <Alert severity="error">
            비밀번호 재설정 URL의 유효기간이 지났습니다. <br />
            비밀번호 찾기를 다시 진행해주세요.
          </Alert>
        )}
        {isLinkValid && (
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="new-password"
                  label="새 비밀번호"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
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
                  autoComplete="new-password"
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
              {isUsingPastPassword && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    저번에 동일한 비밀번호를 사용하셨네요. <br />
                    다른 비밀번호를 설정해주세요.
                  </Alert>
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              새 비밀번호 설정
            </Button>
          </form>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
