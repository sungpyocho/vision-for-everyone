import React, { useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import kiwe_motion_1 from "../../assets/kiwe_motion_1.mp4";
import kiwe_motion_2 from "../../assets/kiwe_motion_2.mp4";

const LandingpageBlock = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 100%;
  background-color: #2fc4b2;
`;

const MessageBox = styled.div`
  position: relative;
  top: 5%;
  left: 35%;
  width: 60%;
  line-height: 130%;
  background-color: white;
  border-radius: 25px;
  border-bottom-left-radius: 0px;
  padding: 10px;
  overflow: hidden;
  font-size: 30px;
`;

const MotionBox = styled.video`
  height: 70%;
  width: 100%;
`;

const MotionContainer = styled.div`
  position: relative;
  height: 50%;
  top: 10%;
  left: 10%;
  height: 70%;
  width: 80%;
  background-color: #2fc4b2;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "90%",
    right: "5%",
    height: "45px",
    width: "160px",
    borderRadius: "25px",
    backgroundColor: "pink",
    padding: "5px",
  },
}));

function LandingPage(props) {
  const classes = useStyles();
  const [motionNum, setMotionNum] = useState(0);

  // 모션을 값에 따라 불러오기 위해 저장해두는 배열
  const motionArray = [kiwe_motion_1, kiwe_motion_2, kiwe_motion_1];
  // 모션 메시지를 담는 배열
  const motionTextArray = [
    "안녕하세요. 저는 키위에요!",
    "키오스크야 저리가랏!",
    "쉽고 빠르게 주문해보실래요? 눌러주세요!",
  ];

  const motionNumHandler = () => {
    if (motionNum < 2) {
      setMotionNum(motionNum + 1);
    } else {
      props.history.push("/tutorial");
    }
  };

  return (
    <LandingpageBlock>
      <div
        style={{ fontSize: "30px", textAlign: "center", fontWeight: "500" }}
      ></div>
      <MotionContainer onClick={motionNumHandler}>
        <MessageBox>{motionTextArray[motionNum]}</MessageBox>
        <MotionBox
          src={motionArray[motionNum]}
          key={motionNum}
          autoPlay
          muted
        ></MotionBox>
      </MotionContainer>
      <Button href="/login" className={classes.button}>
        스킵하고, 로그인할래요
      </Button>
    </LandingpageBlock>
  );
}

export default LandingPage;
