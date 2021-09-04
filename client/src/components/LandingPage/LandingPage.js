import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kiwe_jingle from '../../assets/kiwe_jingle.wav';
import {
  LandingFirstImg,
  LandingSecondImg,
  LandingThirdImg,
  LandingFourthImg,
  LandingFifthImg,
} from '../../assets';

function LandingPage(props) {
  const [step, setStep] = useState(0);

  const stepHandler = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      toChatPage();
    }
  };

  const toChatPage = () => {
    kiweJingle.play();
    setTimeout(() => {
      props.history.push('/chat');
    }, 2000);
  };

  const kiweJingle = new Audio(kiwe_jingle);

  const data = [
    {
      img: LandingFirstImg,
      head: '안녕하세요,<br/>저에게 주문하시겠어요?',
      desc: '키위는 간단한 채팅으로<br/>음식을 주문할 수 있는<br/>인공지능이에요.',
    },
    {
      img: LandingSecondImg,
      head: '사용자님의<br/>간편한 주문을 위해',
      desc: '원하는 식당과 메뉴의 초성만<br/>입력해도 제가 찾아드릴게요!',
    },
    {
      img: LandingThirdImg,
      head: '식당과 메뉴를 못 정했다면 식당찾기와 메뉴판 버튼을<br/>클릭해서 탐색해보세요.',
      desc: '메세지창에 식당찾기 혹은 ㅅㄷㅊㄱ,<br/> 메뉴판 혹은 ㅁㄴㅍ을 입력하세요.',
    },
    {
      img: LandingFourthImg,
      head: '음식을 가져오기 힘들 땐,<br/>결제 전 <b>음식 전달받기</b><br/>기능을 활성화하세요.',
      desc: '다른 사람을 위해<br/>꼭 필요할 때만 사용해주세요.',
    },
    {
      img: LandingFifthImg,
      head: '사용자님에 맞게 사용환경을 변경해보세요.',
      desc: '웹 상단의 설정 탭에서<br/>글자크기를 바꾸거나<br/>고대비 모드를 적용할 수 있어요.',
    },
  ];

  return (
    <Container>
      <ImageBox src={data[step].img} />
      <Headline dangerouslySetInnerHTML={{ __html: data[step].head }} />
      <Description dangerouslySetInnerHTML={{ __html: data[step].desc }} />
      <ButtonContainer>
        {step < 4 ? (
          <>
            <NextButton onClick={stepHandler}>NEXT</NextButton>
            <SkipButton>바로 주문하기</SkipButton>
          </>
        ) : (
          <StartOrderButton onClick={stepHandler}>
            주문 시작할게요!
          </StartOrderButton>
        )}
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  font-family: Noto Sans KR;
  text-align: center;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  word-break: keep-all;
`;

const ImageBox = styled.img`
  margin: 0 auto;
  width: 35vh;
`;

const Headline = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 1.5;
  margin: 0 20px 20px;

  @media (max-height: 599px) {
    margin-top: 15px;
    font-size: 25px;
    line-height: 1.4;
  }

  @media (min-height: 600px) {
    margin-top: 20px;
  }
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 22px;
  margin: 15px;
  line-height: 1.5;

  @media (max-height: 599px) {
    font-size: 18px;
    line-height: 1.4;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  display: flex;
  padding: 0 16px;
`;

const NextButton = styled.div`
  background-color: #000;
  border-radius: 15px;
  border: 1px solid;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  height: 51px;
  line-height: 51px;
  flex: 1;
  margin-right: 8px;

  &:active {
    background-color: #fff;
    color: #000;
  }
`;

const SkipButton = styled.div`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid;
  color: #000;
  font-weight: 700;
  font-size: 18px;
  height: 51px;
  line-height: 51px;
  flex: 1;

  &:active {
    background-color: #000;
    color: #fff;
  }
`;

const StartOrderButton = styled.div`
  background-color: #000;
  border-radius: 15px;
  border: 1px solid;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
  height: 51px;
  line-height: 51px;
  flex: 1;

  &:active {
    background-color: #fff;
    color: #000;
  }
`;

LandingPage.propTypes = {
  history: PropTypes.object,
};

export default LandingPage;
