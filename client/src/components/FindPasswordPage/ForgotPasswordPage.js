import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import DraftsIcon from "@material-ui/icons/Drafts";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6ac48a",
    color: "white",
  },
}));

export default function ForgotPasswordPage(props) {
  const classes = useStyles();

  const [Email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const sendEmailHandler = (event) => {
    event.preventDefault(); // page refresh 방지

    if (Email === "") {
      alert("이메일을 입력해주세요.");
    } else {
      axios
        .post("/api/users/forgot", {
          email: Email,
        })
        .then((res) => {
          if (res.data.message === "해당 이메일로 가입한 이력이 없습니다.") {
            setShowError(true);
            setSentEmail(false);
          } else if (res.data.message === "비밀번호 복구 이메일 송신 완료") {
            setShowError(false);
            setSentEmail(true);
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
          <DraftsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <Typography>회원가입 때 사용했던 비밀번호를 입력해 주세요.</Typography>
        <Typography>
          해당 이메일로 비밀번호 재설정 URL을 보내드립니다.
        </Typography>
        <form className={classes.form} onSubmit={sendEmailHandler} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={emailHandler}
          />
          {showError && (
            <Alert severity="error">
              해당 이메일로 가입한 이력이 없습니다.
            </Alert>
          )}
          {sentEmail && (
            <Alert severity="success">비밀번호 복구 이메일을 보냈습니다!</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            확인
          </Button>
        </form>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}
