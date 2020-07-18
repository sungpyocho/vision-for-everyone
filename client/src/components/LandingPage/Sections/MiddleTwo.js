import React from "react";
import styled from "styled-components";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import { makeStyles } from "@material-ui/core/styles";
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "200%",
  },
  numIcon: {
    marginRight: "15px",
  },
}));

const MiddleTwoBlock = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;

  i {
    font-size: 200%;
  }
  ul {
    text-align: justify;
  }

  .list {
    text-align: justify;
    font-weight: 400;
  }

  h4 {
    margin-top: 0px;
    font-weight: 500;
  }
`;

const MiddleTwo = () => {
  const classes = useStyles();
  return (
    <MiddleTwoBlock>
      <AccessibilityIcon className={classes.icon} />
      <h4>당신만의 키오스크가 있나요?</h4>

      <div className="list">
        <Filter1Icon className={classes.numIcon} />
        키위는 나만의 키오스크를 만들 수 있는 다양한 옵션을 제공합니다
        <br />
        <Filter2Icon className={classes.numIcon} />
        키오스크가 불편한 분들을 위해 접근성 설정도 가능해요
      </div>
    </MiddleTwoBlock>
  );
};

export default MiddleTwo;
