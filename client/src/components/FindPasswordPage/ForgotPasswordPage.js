import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { Button, InputBase } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#6ac48a',
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  inputText: {
    backgroundColor: 'white',
    height: '50px',
    borderRadius: '25px',
    flex: 1,
    paddingLeft: '15px',
    paddingright: '15px',
    marginTop: '30px',
  },
  submit: {
    margin: theme.spacing(6),
    backgroundColor: '#ffc1c1',
    fontSize: '18px',
    color: '#232323',
    width: '50%',
    height: '50px',
    marginLeft: '25%',
    marginRight: '25%',
    borderRadius: '25px',
    boxShadow: '2px 4px 4px rgba(74, 74, 74, 0.25)',
    border: '1px solid #FFFFFF',
  },
}));

export default function ForgotPasswordPage() {
  const classes = useStyles();

  const [Email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);

  const emailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const sendEmailHandler = event => {
    event.preventDefault(); // page refresh 방지

    if (Email === '') {
      alert('이메일을 입력해주세요.');
    } else {
      axios
        .post('/api/user/forgot', {
          email: Email,
        })
        .then(res => {
          if (res.data.message === '해당 이메일로 가입한 이력이 없습니다.') {
            setShowError(true);
            setSentEmail(false);
          } else if (res.data.message === '비밀번호 복구 이메일 송신 완료') {
            setShowError(false);
            setSentEmail(true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Bg>
      <Wrapper>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              비밀번호 찾기
            </Typography>
            <Typography>
              <br />
              회원가입 때 사용했던 이메일을 입력해 주세요.
            </Typography>
            <Typography>비밀번호 재설정 URL을 보내드립니다.</Typography>
            <form
              className={classes.form}
              onSubmit={sendEmailHandler}
              noValidate
            >
              <InputBase
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                placeholder="이메일 주소"
                name="email"
                autoComplete="email"
                autoFocus
                value={Email}
                onChange={emailHandler}
                className={classes.inputText}
              />
              {showError && (
                <Alert severity="error">
                  해당 이메일로 가입한 이력이 없습니다.
                </Alert>
              )}
              {sentEmail && (
                <Alert severity="success">
                  비밀번호 복구 이메일을 보냈습니다!
                </Alert>
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
      </Wrapper>
    </Bg>
  );
}

const Wrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 66.6%;
  left: 16.7%;
  right: 16.7%;
  background-color: #289c8e;
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
  background-color: #289c8e;
`;
