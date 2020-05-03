import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../_actions/message_actions';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import chime from '../../assets/chime.mp3';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    borderRadius: 5,
    marginTop: 500,
    borderTop: '1px solid lightgrey',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  button: {
    backgroundColor: "#70db70",
    color: "white",
    borderRadius: 5,
  }
}));

function Chat() {
  const classes = useStyles(); // Customize Material-UI

  // redux 구조를 보면 state.message.messages가 메세지들의 배열이다.
  const messagesFromRedux = useSelector(state => state.message.messages);
  const dispatch = useDispatch();

  // chime mp3
  const sound = new Audio(chime);

  const [Input, setInput] = useState("");

  const inputHandler = (event) => {
      setInput(event.currentTarget.value);
  }

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
      response.data.fullfillmentMessages.forEach(content => {
        conversation = {
          who: 'kiwe',
          content: content
        }
        dispatch(saveMessage(conversation));
      })
      sound.play(); // chime 재생
    
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
      response.data.fullfillmentMessages.foreach(content => {
        let conversation = {
          who: 'kiwe',
          content: content
        }
        dispatch(saveMessage(conversation));
      })
      sound.play(); // chime 재생

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

  // Functions about query input
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

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (!Input) {
      return alert("내용을 입력해주세요");
    }
    // request를 server의 text Query로 전송
    textQuery(Input);
    setInput("");
    // const inputValue = this.input.value;

    // if (!inputValue) {
    //   return alert("내용을 이이입입력해주세요");
    // }
    // // request를 server의 text Query로 전송
    // textQuery(inputValue);
    // this.input.value = "";
  }

  // Helper functions
  const isNormalMessage = (message) => {
    return message.message && message.message.text && message.message.text.text; 
  }

  const isCardMessage = (message) => {
    return message.content && message.content.payload.fields.card;
  }

  // Render functions
  const renderCards = (cards) => {

  }

  const renderOneMessage = (message, i) => {

  }

  const renderMessages = (messagesFromRedux) => {
    if (messagesFromRedux) {
      return messagesFromRedux.map((message, i) => {
        return renderOneMessage(message, i)
      })
    } else {
      return null;
    }
  }

  return (
    <div>
      <div>
        지금 여기는 버튼이에욤

      </div>
      <div>
        여기는 채팅이구요
      </div>
      {/* Input Field and Button */}
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          placeholder="메세지를 입력하세요"
          type="text"
          value={Input}
          onChange={inputHandler}
        />
        <Button variant="contained" className={classes.button} type="submit">
          <SendIcon />
        </Button>
      </Paper>
    </div>
  )
}

export default Chat;