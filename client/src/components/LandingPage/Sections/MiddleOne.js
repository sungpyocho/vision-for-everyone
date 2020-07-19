import React from "react";
import kiweDetail from "../../../assets/kiwe-detail.png";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import PeopleIcon from "@material-ui/icons/People";
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

const MiddleOneBlock = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  .img {
    width: 100%;
    height: 100%;
  }
  .sub-header {
    margin-bottom: 80px;
    width: 100%;
  }

  .detail {
    margin-top: 40px;
  }

  i {
    font-size: 200%;
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

function MiddleOne() {
  const classes = useStyles();
  return (
    <MiddleOneBlock>
      <div>
        <img src={kiweDetail} alt="키위 소개" aria-hidden="true" className="img" />
        <div className="sub-header">
          <h3>대화로 주문하는 키오스크: 키위</h3>
        </div>
      </div>

      <div className="detail">
        <PeopleIcon className={classes.icon} />
        <h4>당신의 키오스크는 친근한가요?</h4>
        <div className="list">
          <Filter1Icon className={classes.numIcon} />
          키오스크의 복잡한 화면, 끝없는 줄서기, 답답하지 않으셨나요?
          <br />
          <Filter2Icon className={classes.numIcon} />
          원하는 식당과 메뉴를 키위에게 말해보세요. 척 하면 알아듣고 결제까지 단숨입니다.
        </div>
      </div>
    </MiddleOneBlock>
  );
}

export default MiddleOne;
