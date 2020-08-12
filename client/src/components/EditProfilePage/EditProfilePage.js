import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Settings from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";
import { editProfile } from "../../_actions/user_actions";

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

// 1. Component가 loaded 된다면, AXIOS를 이용해 DB에서 해당 회원정보를 가져옴. 
// 2. 서버단 API에서는 해당 회원정보를 가져와서 보내줌.
// 3. 클라이언트에서는 받아서 form input에다가 띄워줌. 
// 4. 유저가 수정하고 '수정 완료' 등의 버튼을 클릭
// 5. 클릭 이벤트로 다시 API를 부름. 이 API는 POST REQUEST
// 6. 서버: API에서 이미지, 이름, 비밀번호, 주소 받아서 몽고디비 업데이트하는 코드
export default function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [arePasswordsSame, setArePasswordsSame] = useState(true); // 두 비번이 같은가?

  useEffect(() => {
      dispatch(auth()).then((response) => {
        if (response) {
          console.log('디스패치 속 ', response.payload);
          // const pastImage = response.payload.image;
          const pastName = response.payload.name;
          const pastAddress = response.payload.address;
          const email = response.payload.email;
          setName(pastName);
          setAddress(pastAddress);
          setEmail(email);
      } else {
          props.history.push("/login");
        }
      });
    }, []) 
  // useEffect()의 두 번째 인자로 빈 배열을 넣어줘야 마운트시만 호출된다 

  const nameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const addressHandler = (event) => {
    setAddress(event.currentTarget.value);
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

    if (Password !== ConfirmPassword) {
      setArePasswordsSame(false);
    }

    let body = {
      name: Name,
      password: Password,
      address: Address,
      email: Email,
    };
    var isEdit = window.confirm("사용자 정보를 변경합니다");
    if (isEdit) {
      dispatch(editProfile(body)).then((response) => {
        if (response.payload.success) {
          props.history.push("/chat");
        }
      })
      .catch((err) => console.log(err));
    }

  };

  const handleClick = () => {
    // DB 정보 수정
    alert('클릭시 발동되는 알림')
  } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Settings />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원정보 수정
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="주소"
                name="address"
                value={Address}
                onChange={addressHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleClick}
          >
            수정
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}     
     
     
     
     
     
