import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import kiweAvatar from "../../../assets/kiwe-logo.svg";
import UserAvatar from "../../../assets/kiwe-user.png";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import Event from "./Event";

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: "inline-block",
  },
}));

const Message = (props) => {
  const classes = useStyles();
  let endOfMessage = null;

  const [isHeadMessage, setIsHeadMessage] = useState(null);

  useEffect(() => {
    endOfMessage.scrollIntoView({ behaviour: "smooth" });
    setIsHeadMessage(props.isHeadMessage);
    if (props.who === "kiwe" && props.isHeadMessage) props.setIsHeadMessage(false);
  }, []);

  const srcOfAvatar = props.who === "kiwe" ? kiweAvatar : UserAvatar;
  const whoIsAvatar = props.who === "kiwe" ? "키위봇" : "";
  return (
    <MessageComponent who={props.who}>
      {isHeadMessage ? <div>
        {whoIsAvatar && props.showKiweChatLogo && (
          <Avatar alt="" src={srcOfAvatar} className={classes.avatar} />
        )}
        <AvatarName>{whoIsAvatar}</AvatarName>
      </div> : null} 
      <MessageBox who={props.who}>
        <span tabIndex="0">{props.text}</span>
      </MessageBox>
      {props.resName && <Event></Event>}
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
  background: ${(props) => (props.who === "kiwe" ? "#efefef" : "#ffb5b5")};
  color: ${(props) => (props.who === "kiwe" ? "#232323" : "#232323")};
  border-top-left-radius: ${(props) => (props.who === "kiwe" ? 0 : "30px")};
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: ${(props) => (props.who === "kiwe" ? "30px" : 0)};
  text-align: start;
`;

export default Message;
