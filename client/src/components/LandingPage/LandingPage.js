import React, { useState } from 'react';
import styled from "styled-components";
import kiwe_jingle from "../../assets/kiwe_jingle.wav";
import { 
  LandingFirstImg,
  LandingSecondImg,
  LandingThirdImg,
  LandingFourthImg,
  LandingFifthImg
} from '../../assets';

function LandingPage(props){
  const [step, setStep] = useState(0);
  
  const stepHandler = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      toNextPage();
    }
  }

  const toNextPage = () => {
    kiweJingle.play();
    setTimeout(() => {
      props.history.push("/chat");
    }, 2000);
  }
  
  const kiweJingle = new Audio(kiwe_jingle);

  const data = [
    {"img": LandingFirstImg, "head": "안녕하세요<br/>저에게 주문하시겠어요?", "desc": "키위는 채팅으로<br/>음식을 주문할 수 있는 웹서비스입니다. 원하는 식당과 메뉴를 말씀해주시면 제가 찾아드릴게요!"},
    {"img": LandingSecondImg, "head": "사용자님의<br/>간편한 주문을 위해", "desc": "저는 초성만 적어도 이해할 수 있는 똑똑한 인공지능이에요."},
    {"img": LandingThirdImg, "head": "식당과 메뉴를 못 정했다면 식당찾기와 메뉴판을 클릭해서 탐색해보세요.", "desc": "식당찾기 혹은 ㅅㄷㅊㄱ,<br/>메뉴판 혹은 ㅁㄴㅍ이라고 메세지창에 입력해도 근처 식당과 메뉴판을 보여드릴게요!"},
    {"img": LandingFourthImg, "head": "음식을 가져오기 힘들 땐, 음식전달받기<br/>기능을 활성화하세요", "desc": "결제 전 '전달받기'버튼을 누르면 돼요. 다른 사람을 위해<br/>꼭 필요할 때만 사용해주세요."},
    {"img": LandingFifthImg, "head": "사용자님에 맞게 사용환경을 변경해보세요.", "desc": "웹 상단의 설정 탭에서<br/>글자크기를 바꾸거나<br/>고대비 모드를 적용할 수 있어요."}
  ]

  return (
    <Container>
      <ImageBox src={data[step].img}/>
      <Headline dangerouslySetInnerHTML={{__html: data[step].head}} />
      <Description dangerouslySetInnerHTML={{__html: data[step].desc}} />
      <ButtonContainer>
        { (step < 4) ?
        <>
          <NextButton onClick={stepHandler}>NEXT</NextButton>
          <SkipButton>바로 주문하기</SkipButton>
        </>
        : <StartOrderButton onClick={stepHandler}>주문 시작할게요!</StartOrderButton>
        }
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  background-color: white;
  height: 100vh;
`

const ImageBox = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 35vh;
  position: relative;
`;

const Headline = styled.div`
  position: relative;
  font-family: Noto Sans KR;
  font-weight: 700;
  font-size: 28px;
  line-height: 41px;
  text-align: center;
  margin-bottom: 5%;
  margin-left: 20px;
  margin-right: 20px;
  word-break: keep-all;
  @media (max-height: 599px) {
    margin-top: 0%;
  }
  @media (min-height: 600px) and (max-height: 699px){
    margin-top: 5%;
  }
  @media (min-height: 700px) {
    margin-top: 15%;
  }
`;

const Description = styled.div`
  position: relative;
  font-family: Noto Sans KR;
  font-weight: 500;
  font-size: 22px;
  margin: 15px;
  text-align: center;
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 4%;
  width: 100%;
  text-align: center;
`;

const NextButton = styled.div`
  background-color: black;
  border-radius: 15px;
  border: 1px solid;
  color: white;
  font-weight: bold;
  font-size: 18px;
  height: 51px;

  text-align: center;
  vertical-align: middle;
  line-height: 51px;
  flex-direction: row;
  
  display: inline-block;
  width: 40vw;
  margin: 0px 4vw 0px 4vw;
  
  &:hover {
    background-color: white;
    color: black;
  }
`;

const SkipButton = styled.div`
  background-color: white;
  border-radius: 15px;
  border: 1px solid;
  color: black;
  font-weight: bold;
  font-size: 18px;
  height: 51px;

  text-align: center;
  vertical-align: middle;
  line-height: 51px;
  flex-direction: row;
  
  display: inline-block;
  width: 40vw;
  margin: 0px 4vw 0px 4vw;
  
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StartOrderButton = styled.div`
  background-color: black;
  border-radius: 15px;
  border: 1px solid;
  color: white;
  font-weight: bold;
  font-size: 18px;
  height: 51px;

  text-align: center;
  vertical-align: middle;
  line-height: 51px;
  flex-direction: row;
  
  display: inline-block;
  width: 85%;
  margin: 0px 15px 0px 15px;
  
  &:hover {
    background-color: white;
    color: black;
  }
`;

export default LandingPage;