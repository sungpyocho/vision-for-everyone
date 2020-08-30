import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const motionArray = []; // 모션을 값에 따라 불러오기 위해 저장해두는 배열

const LandingpageBlock = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 100%;
  background-color: #2fc4b2;
`;

const MessageBox = styled.div`
  position: relative;
  top: 5%;
  left: 30%;
  height: 20%;
  width: 50%;
  background-color: white;
  border-radius: 25px;
  padding: 10px;
  overflow: hidden;
  font-size: 30px;
`;

const MotionBox = styled.video`
  height: 50%;
  width: 50%;
  src: "naver.com";
`;

const MotionContainer = styled.div`
  position: relative;
  height: 50%;
  top: 10%;
  left: 10%;
  height: 70%;
  width: 80%;
  background-color: pink;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "90%",
    right: "5%",
    height: "40px",
    borderRadius: "25px",
    backgroundColor: "pink",
    padding: "5px",
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  const [motionNum, setMotionNum] = useState(0);
  const motionNumHandler = () => {
    if (motionNum < 10) {
      setMotionNum(motionNum+1);
    }
  };

  return (
    <LandingpageBlock>
      <div
        style={{ fontSize: "30px", textAlign: "center", fontWeight: "500" }}
      ></div>
      <MotionContainer onClick={motionNumHandler}>
        <MessageBox>안녕하세요, 저는 {motionNum} </MessageBox>
        <MotionBox src={motionArray[motionNum]}>
        </MotionBox>
      </MotionContainer>
      <Button href="/login" className={classes.button}>건너뛸래요</Button>
    </LandingpageBlock>
  );
}

export default LandingPage;
