import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage, clearMessage } from "../../_actions/message_actions";

import Cookies from "universal-cookie"; //set id to cookie
import { v4 as uuid } from "uuid"; //generate unique id for sessions in visitors v4 for random id generation

import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, InputBase } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";

import OrderMenu from "./Sections/OrderMenu";
import Message from "./Sections/Message";
import CardMessage from "./Sections/CardMessage";
import RecieptMessage from "./Sections/RecieptMessage";
import chime from "../../assets/chime.mp3";
import order_ready from "../../assets/order_ready.mp3";
import order_success from "../../assets/order_success.mp3";

const cookies = new Cookies(); //creating cookie object

const useStyles = makeStyles((theme) => ({
  inputForm: {
    display: "flex",
    borderRadius: 0,
    backgroundColor: "#2FC4B2",
    borderTop: "1px solid lightgrey",
    height: "50px",
    bottom: 0,
    position: "absolute",
    width: "calc(100% - 20px)",
    padding: "10px",
  },
  input: {
    marginLeft: theme.spacing(0),
    backgroundColor: "white",
    borderRadius: "25px",
    flex: 1,
    marginRight: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  button: {
    backgroundColor: "#ffb5b5",
    color: "white",
    borderRadius: 25,
  },
  dialog: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
  },
  iframe: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
    position: "fixed",
    backgroundColor: "white",
  },
  closeButton: {
    position: "fixed",
    bottom: "5%",
    right: "5%",
  },
}));

function Chat() {
  const classes = useStyles(); // Customize Material-UI

  // Kakao Pay Link State for <iframe>
  const [kakaoPayLink, setKakaoPayLink] = useState(null);

  // kakao pay 모달창 상태
  const [openCall, setOpenCall] = useState(true);

  // 영수증 메시지 출력 관련
  const [receipt, setReceipt] = useState(null);

  // iframe에서 온 상태 메시지
  const [kakaoPayResult, setKakaoPayResult] = useState(null);

  // showCloseButton = iframe 창에서 맨 마지막 리디렉트 이후 버튼을 보여주시 위해 상태를 생성함.
  const [showCloseButton, setShowCloseButton] = useState(false);
  
  // 키위봇 로고를 처음 및 사용자 답변 이후에 띄워주기 위한 boolean 값 저장
  const [showKiweChatLogo, setShowKiweChatLogo] = useState(true);

  // 키위봇 로고를 띄워줄지 결정하기 위해 이전 채팅을 누가 보냈는지 string으로 저장(예: "kiwe", "user")
  // const [whoSentPrevMsg, setWhoSentPrevMsg] = useState(null);

  const [isHeadMessage, setIsHeadMessage] = useState(true);

  // redux 구조를 보면 state.message.messages가 메세지들의 배열이다.
  const messagesFromRedux = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();

  // SFX mp3
  const sound = new Audio(chime);
  const orderSuccess = new Audio(order_success);
  const orderReady = new Audio(order_ready);

  // Keyboard Input State
  const [Input, setInput] = useState("");
  const inputHandler = (event) => {
    setInput(event.currentTarget.value);
  };

  // Name of Selected Restaurant
  const [resName, setResName] = useState(null);

  // component가 mount되면 실행
  useEffect(() => {
    checkUserId();
    dispatch(clearMessage());
    eventQuery("firstGreetings");

    const handler = (event) => {
      if (typeof event.data === "string" || event.data instanceof String) {
        const data = JSON.parse(event.data);
        setKakaoPayResult(data.message);
      } else return;
    };
    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    if (kakaoPayResult === "Success") {
      setShowCloseButton(true);
      dispatch(saveMessage(receipt));
    } else if (kakaoPayResult === "Fail" || kakaoPayResult === "Cancel") {
      setShowCloseButton(true);
    }
  }, [kakaoPayResult]);

  // 쿠키를 체크해서 UserId값이 없으면 추가
  const checkUserId = () => {
    if (cookies.get("userID") === undefined) {
      //if cookie is already not present before then generate new cookie
      cookies.set("userID", uuid(), { path: "/" }); //  '/' means that the cookie will be accessible for all pages i.e unique session for all pages
    }
  };

  // 클라이언트가 보낸 메세지 처리
  const textQuery = async (text) => {
    setIsHeadMessage(true);
    // 보낸 메세지 처리
    // conversation을 이렇게 만든 이유는
    // dialogflow의 fulfillmentMessages의 형식과 같은 형식을 취하기 위해!

    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };

    // 보낸 메세지 데이터를 리덕스 스토어에 저장
    dispatch(saveMessage(conversation));
    // 챗봇이 보낸 답변 처리
    const textQueryVariables = {
      text: text,
      userID: cookies.get("userID"),
    };

    try {
      // textQuery route로 리퀘스트 전송
      const response = await axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      // 주문 전 일반 대화.
      // headers는 카카오페이 주문창 URL을 포함하므로, 일반대화에서는 없을수밖에 없다.
      if (!response.data.headers) {
        setResName(response.data.restaurantName);
        response.data.fulfillmentMessages.forEach((content) => {
          conversation = {
            who: "kiwe",
            content: content,
            resName: response.data.restaurantName
          };
          dispatch(saveMessage(conversation));
        });
      } else {
        // 마지막 주문 단계. 메세지 출력.
        conversation = {
          who: "kiwe",
          content: {
            message: "text",
            platform: "PLATFORM_UNSPECIFIED",
            text: {
              text: ["카카오페이에서 결제를 완료하세요."],
            },
          },
        };
        dispatch(saveMessage(conversation));

        // 1.5초 뒤에 새 창에서 주문 창을 염.
        setTimeout(() => {
          setKakaoPayLink(response.data.headers.Location);
        }, 1500);
      }
      // chime 재생
      sound.play();

      // 마지막 주문 단계. 메세지 출력.
      conversation = {
        who: "kiwe",
        orderResult: {
          restaurantName: response.data.restaurantName,
          menuName: response.data.menuName,
          totalAmount: response.data.totalAmount,
          quantity: response.data.quantity,
          price: response.data.price,
        },
      };

      // 일단 state에다가 conversation 저장하고, 추후 iframe이 닫혔을 때, 영수증 메시지 출력하기
      setReceipt(conversation);
    } catch (error) {
      // 에러 발생 시
      conversation = {
        who: "kiwe",
        content: {
          text: {
            text:
              "챗봇의 답변 처리과정에서 에러가 발생했습니다. 페이지를 새로고침해주세요.",
          },
        },
      };
      dispatch(saveMessage(conversation));
      sound.play(); // chime 재생
    }
  };

  // 챗봇의 첫 인사 메세지 처리
  const eventQuery = async (event) => {
    // 챗봇이 보낸 답변 처리
    const eventQueryVariables = {
      event: event,
      userID: cookies.get("userID"),
    };
    try {
      // eventQuery 라우트로 리퀘스트 전송
      const response = await axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      response.data.fulfillmentMessages.forEach((content) => {
        let conversation = {
          who: "kiwe",
          content: content,
        };
        dispatch(saveMessage(conversation));
      });
      // chime 재생
      // Chrome Autoplay 방지 정책으로 인해 주석을 지워도 소리가 나지 않지만
      // 갑자기 소리나면 사람들이 annoyed활 수 있으니 소리를 나게 하지 않는다.
      // sound.play();
    } catch (error) {
      // 에러 발생 시
      let conversation = {
        who: "kiwe",
        content: {
          text: {
            text:
              "챗봇의 답변 처리과정에서 에러가 발생했습니다. 페이지를 새로고침해주세요.",
          },
        },
      };
      dispatch(saveMessage(conversation));
      sound.play(); // chime 재생
    }
  };

  // Functions about query input
  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (!Input) {
      return alert("내용을 입력해주세요");
    }
    // 튜토리얼봇으로 넘어가는 것을 막기 위한 코드
    if ("[튜토리얼] 스타벅스 시청점".includes(Input) && Input !== '스타벅스') {
      return alert("식당찾기 버튼을 눌러 진행해주세요.");
    }
    // request를 server의 text Query로 전송
    textQuery(Input);
    setInput("");
  };

  // Helper functions: 메시지의 종류를 파악(일반메시지인지, 카드메시지인지, 영수증인지)할 수 있는 boolean 값을 반환
  const isNormalMessage = (message) => {
    return message.content && message.content.text && message.content.text.text;
  };

  const isCardMessage = (message) => {
    return message.content && message.content.payload.fields.card;
  };

  const isRecieptMessage = (message) => {
    return message.orderResult && message.orderResult.restaurantName;
  };

  // Render functions: redux에 저장된 메시지를 종류별로 렌더링하는 역할
  const renderCards = (cards) => {
    return cards.map((card, i) => (
      <CardMessage key={i} cardInfo={card.structValue} />
    ));
  };

  const renderOneMessage = (message, i) => {
    // 이전 메시지를 키위가 보내지 않았을 때만 키위 로고를 보여주는 로직: 무한 루프때문에 수정 필요
    // if ((whoSentPrevMsg !== "kiwe") && (message.who === "kiwe")) {
    //   setShowKiweChatLogo(true);
    // } else if (whoSentPrevMsg==="kiwe"){
    //   setShowKiweChatLogo(false);
    // }
    // setWhoSentPrevMsg(message.who);

    // 영수증 메시지일 경우
    if (isRecieptMessage(message)) {
      orderSuccess.play();
      return <RecieptMessage key={i} orderResult={message.orderResult} />;
    }
    // 일반 메세지일 경우
    else if (isNormalMessage(message)) {
      return (
        <Message key={i} isHeadMessage={isHeadMessage}
        setIsHeadMessage={setIsHeadMessage} showKiweChatLogo={showKiweChatLogo} who={message.who} text={message.content.text.text} resName={message.resName}/>      );
    }
    // 카드 메세지일 경우
    else if (isCardMessage(message)) {
      return (
        <div style={{ width: "100%", maxHeight: "350px", overflow: "auto" }}>
          {renderCards(message.content.payload.fields.card.listValue.values)}
        </div>
      );
    }
  };

  const renderMessages = (messagesFromRedux) => {
    if (messagesFromRedux) {
      return messagesFromRedux.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  const handleTextQuery = useCallback((text) => {
    textQuery(text);
  }, []);

  const handleCloseCall = () => {
    if (kakaoPayResult === "Fail" || kakaoPayResult === "Cancel") {
      // 결제 실패, 결제 취소 시 /chat 페이지 리로드
      window.location.reload(false);
    }
    // 사용자에게 이미 로드된 채팅 보이지 않기 위해 setTimeout 함수 적용
    setTimeout(() => {
      setOpenCall(false);
    }, 500);
  };

  return (
    <Bg>
      <Wrapper>
        {/* Order Buttons */}
        <OrderMenu aria-label="메뉴" handleTextQuery={handleTextQuery} resName={resName} />
        <div aria-label="키위봇과 대화하는 채팅창입니다">
          {/* Chat Messages */}
          <Messages aria-live="polite">
            {renderMessages(messagesFromRedux)}
          </Messages>
          {/* Input Field and Button */}
          <Paper
            component="form"
            className={classes.inputForm}
            onSubmit={handleSubmit}
          >
            <InputBase
              autoFocus
              className={classes.input}
              placeholder="메시지를 입력하세요"
              type="text"
              value={Input}
              onChange={inputHandler}
            />
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
              aria-label="메시지 보내기"
            >
              <SendIcon />
            </Button>
          </Paper>
        </div>
        {kakaoPayLink && (
          <Dialog className={classes.dialog} open={openCall}>
            <iframe
              className={classes.iframe}
              src={kakaoPayLink}
              title="KakaoPay Link"
            ></iframe>
            {showCloseButton && (
              <Button
                className={classes.closeButton}
                onClick={handleCloseCall}
                color="primary"
                autoFocus
              >
                닫기
              </Button>
            )}
          </Dialog>
        )}
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
  background-color: #2fc4b2;
  @media (max-width: 768px) {
    width: 100%;
    left: 0%;
    right: 0%;
  }
`;

const Messages = styled.div`
  overflow: auto;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  bottom: 70px;
  position: absolute;
  height: calc(90% - 70px);
  width: 100%;
`;

const Bg = styled.div`
  height: calc(100% - 56px);
  position: absolute;
  width: 100%;
  padding: 0px;
  background-color: #2fc4b2;
`;

export default Chat;
