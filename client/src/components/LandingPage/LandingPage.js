import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
  button: {
    color: "#6ac48a",
    borderRadius: 5,
  },
}));

function LandingPage(props) {
  const classes = useStyles(); // Customize Material-UI

  const toTutorialPage = () => {
    props.history.push("/tutorial");
  };

  const toRegisterPage = () => {
    props.history.push("/register");
  };

  return (
    <div style={{ fontSize: "30px", textAlign: "center", fontWeight: "500" }}>
      시각장애인을 위한
      <br />
      키오스크 대체 챗봇
      <br />
      "키위" 홈페이지
      <div className={classes.root}>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={toTutorialPage}
        >
          튜토리얼 페이지로
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={toRegisterPage}
        >
          회원가입 페이지로
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
