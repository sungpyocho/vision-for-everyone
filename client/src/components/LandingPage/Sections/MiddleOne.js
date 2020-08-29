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
          <h3>함께하는 키오스크 키위가 질문합니다.</h3>
        </div>
      </div>

      <div className="detail">
        <PeopleIcon className={classes.icon} />
        <h4>당신의 키오스크는 친근한가요?</h4>
        <div className="list">
          <Filter1Icon className={classes.numIcon} />
          키위봇과 대화해 보세요.
          <br />
          <Filter2Icon className={classes.numIcon} />
          식당 점원처럼 원하는 메뉴, 수량을 알아듣고, 결제도 척척합니다.
        </div>
      </div>
    </MiddleOneBlock>
  );
}

export default MiddleOne;
