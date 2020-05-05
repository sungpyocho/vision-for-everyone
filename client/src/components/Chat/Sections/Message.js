import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import kiweAvatar from "../../../assets/kiwe-green.png";
import UserAvatar from "../../../assets/kiwe-lime.png";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: "inline-block",
  },
}));

const Message = (props) => {
  const classes = useStyles();
  let endOfMessage = null;

  useEffect(() => {
    endOfMessage.scrollIntoView({ behaviour: "smooth" });
  }, []);

  const srcOfAvatar = props.who === "kiwe" ? kiweAvatar : UserAvatar;
  const whoIsAvatar = props.who === "kiwe" ? "키위봇" : "";

  return (
    <MessageComponent who={props.who}>
      <div>
        <Avatar alt={props.who} src={srcOfAvatar} className={classes.avatar} />
        <AvatarName>{whoIsAvatar}</AvatarName>
      </div>
      <MessageBox who={props.who}>
        <span>{props.text}</span>
      </MessageBox>
      {/* 자동 scroll을 위한 div */}
      <div
        ref={(el) => {
          endOfMessage = el;
        }}
        style={{ float: "left", clear: "both" }}
      ></div>
    </MessageComponent>
  );
};

const MessageComponent = styled.div`
  text-align: ${(props) => (props.who === "kiwe" ? "left" : "right")};
  padding: 5px;
`;

const AvatarName = styled.span`
  margin-left: 0.5rem;
  font-size: 18px;
  font-weight: 500;
`;

const MessageBox = styled.div`
  max-width: 60%;
  margin: 2px 14px;
  width: inherit;
  overflow-wrap: break-word;
  padding: 7px 20px;
  display: inline-block;
  font-size: 16px;
  word-spacing: 0.3px;
  background: ${(props) => (props.who === "kiwe" ? "white" : "#6ac48a")};
  color: ${(props) => (props.who === "kiwe" ? "black" : "white")};
  border-top-left-radius: ${(props) => (props.who === "kiwe" ? 0 : "10px")};
  border-top-right-radius: ${(props) => (props.who === "kiwe" ? "10px" : 0)};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: start;
`;

export default Message;
