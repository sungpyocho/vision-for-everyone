import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_actions/message_actions';

function Chat() {
  const dispatch = useDispatch();
  // redux 구조를 보면 state.message.messages가 메세지들의 배열이다.
  const messagesFromRedux = useSelector(state => state.message.messages);


  // component가 mount되면 실행
  // useEffect를 써서 렌더링하면 이 컴포넌트에서 이거 해야해!라고 지시
  useEffect(() => {
      eventQuery('firstGreetings');
  }, [])

  // 클라이언트가 보낸 메세지 처리
  const textQuery = async (text) => {
    // 보낸 메세지 처리
    // conversation을 이렇게 만든 이유는
    // dialogflow의 fulfillmentMessages의 형식과 같은 형식을 취하기 위해!
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text
        }
      }
    }

    // 보낸 메세지 데이터를 리덕스 스토어에 저장
    dispatch(saveMessage(conversation));
    // 챗봇이 보낸 답변 처리
    const textQueryVariables = {
      text
    }
    try {
      // textQuery route로 리퀘스트 전송
      const response = await axios.post('/api/dialogflow/textQuery', textQueryVariables);
      for (let content of response.data.fullfillmentMessages) {
        conversation = {
          who: 'kiwe',
          content: content
        }
        dispatch(saveMessage(conversation));
      }

    } catch (error) {
        conversation = {
          who: 'kiwe',
          content: {
            text: {
              text: "챗봇의 답변 처리과정에서 에러가 발생했습니다."
            }
          }
        }
      dispatch(saveMessage(conversation));
    }
  }

  // 챗봇의 첫 인사 메세지 처리
  const eventQuery = async (event) => {
    // 챗봇이 보낸 답변 처리
    const eventQueryVariables = {
      event
    }
    try {
      // textQuery 라우트로 리퀘스트 전송
      const response = await axios.post('/api/dialogflow/eventQuery', eventQueryVariables);
      for (let content of response.data.fullfillmentMessages) {
        let conversation = {
          who: 'kiwe',
          content: content
        }
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
    let conversation = {
        who: 'bot',
        content: {
          text: {
            text: "챗봇의 답변 처리과정에서 에러가 발생했습니다."
          }
        }
      }
      dispatch(saveMessage(conversation));
    }
  }

  const keyPressHandler = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        return alert("내용을 입력해주세요");
      }
      // request를 server의 text Query로 전송
      textQuery(event.target.value);

      event.target.value = "";
    }
  }

  return (
    <div>
      This is chat
    </div>
  )
}

export default Chat;