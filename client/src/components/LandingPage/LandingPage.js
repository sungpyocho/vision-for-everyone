import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import kiwe_motion_1 from "../../assets/kiwe_motion_1.gif";
import kiwe_motion_2 from "../../assets/kiwe_motion_2.gif";
import kiwe_landing_serve from "../../assets/kiwe_landing_serve.svg";
import kiwe_landing_friend from "../../assets/kiwe_landing_friend.svg";
import MobileStepper from '@material-ui/core/MobileStepper';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import kiwe_jingle from "../../assets/kiwe_jingle.wav";

const LandingpageBlock = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 100%;
  background-color: #2fc4b2;
`;

const MessageBox = styled.div`
  position: relative;
  top: 5%;
  left: 15%;
  width: 75%;
  line-height: 130%;
  background-color: white;
  color: #232323;
  border-radius: 45px;
  word-break: keep-all;
  text-align: center;
  padding: 15px 10px 15px 10px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
`;

// 모션이 들어가는 박스
const MotionBox = styled.img`
  height: 70%;
  width: 100%;
`;

// 이미지가 들어가는 박스
const ImageBox = styled.div`
  height: 70%;
  width: 100%;
`;

// 이미지의 키위새 크기가 모션과 맞지 않아 임시로 맞춰놓기 위한 컨테이너
const RealImage = styled.img`
  height: 50%;
  width: 50%;
  left: 25%;
  position: fixed;
`

const MotionContainer = styled.div`
  position: relative;
  height: 50%;
  top: 10%;
  left: 10%;
  height: 70%;
  width: 80%;
  background-color: #2fc4b2;
`;

const MessageParagraph = styled.p`
  margin: 4px;
`;

const useStyles = makeStyles((theme) => ({
  button: {
    position: "absolute",
    top: "90%",
    right: "5%",
    height: "45px",
    width: "160px",
    borderRadius: "30px",
    backgroundColor: "pink",
    fontSize: "20px",
    padding: "5px",
    boxShadow: "2px 4px 4px rgba(74, 74, 74, 0.25)",
  },
  stepper: {
    position: "relative",
    backgroundColor: "#2fc4b2",
    justifyContent: "center"
  },
  stepperDotActive: {
    backgroundColor: "#ffc1c1"
  }
}));

function LandingPage(props) {
  const classes = useStyles();
  const [motionNum, setMotionNum] = useState(0);
  const [firstClick, setFirstClick] = useState(false); // 배터리 절약 모드시 자동재생 불가 우회 위해 첫 클릭 여부를 저장
  const motionReference = React.useRef();

  const kiweJingle = new Audio(kiwe_jingle);

  // 모션을 값에 따라 불러오기 위해 저장해두는 배열
  const motionArray = [
    kiwe_motion_1,
    kiwe_motion_1,
    kiwe_motion_2,
    kiwe_landing_serve,
    kiwe_landing_friend,
  ];
  // 모션 메시지를 담는 배열
  const motionTextArray = [
    "안녕하세요! \n저는 키위라고 해요!",
    "키위가 주문을 도와드릴게요!",
    "더 쉽고 즐겁게 주문하려면\n 키오스크 대신 저를 찾아주세요!",
    "채팅으로 말을 걸면, 제가 \n점원이 되어 주문을 도와드릴게요.",
    "어때요, 저랑 친구하실래요?",
  ];

  const motionNumHandler = () => {
    // 배터리 절약 모드에서 모션이 자동재생 불가하니, 첫 클릭은 모션을 갈아끼우지 않도록 분기
    if (firstClick && motionNum < 4) {
      setMotionNum(motionNum + 1);
    } else if (!firstClick) {
      setFirstClick(true); // 첫 클릭이 이뤄졌음을 state에 저장
    } else {
      // 키위 이미지 사운드를 플레이하고 튜토리얼 페이지로 리다이렉트
      kiweJingle.play();
      setTimeout(()=>{props.history.push("/tutorial")}, 2000);
    }
  };

  return (
    <LandingpageBlock id="landing_page">
      <div
        style={{ fontSize: "30px", textAlign: "center", fontWeight: "500" }}
      ></div>
      <MotionContainer id="motion_container" onClick={motionNumHandler}>
        {/* 개행 문자를 인식케 하기 위함 */}
        <MessageBox>
          {motionTextArray[motionNum].split("\n").map((item, i) => {
            return <MessageParagraph key={i}>{item}</MessageParagraph>;
          })}
        </MessageBox>
        {motionNum < 3 ? (
          <MotionBox
            ref={motionReference}
            src={motionArray[motionNum]}
            key={motionNum}
            autoPlay
            muted
            preLoad="auto"
            aria-hidden="true"
          ></MotionBox>
        ) : (
          <ImageBox aria-hidden="true"><RealImage src={motionArray[motionNum]} key={motionNum}></RealImage></ImageBox>
        )}
      </MotionContainer>
      {/* 튜토리얼 모션이 몇 번째까지 왔는지 나타내는 닷 */}
      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={motionNum}
        classes={{
          root: classes.stepper,
          dotActive: classes.stepperDotActive
        }}
      />
      <Button href="/tutorial" className={classes.button} aria-label="건너뛰고 키위 튜토리얼 시작하기">
        {motionNum < 4 ? "건너뛸래요" : "키위 시작하기"}
      </Button>
    </LandingpageBlock>
  );
}

export default LandingPage;
