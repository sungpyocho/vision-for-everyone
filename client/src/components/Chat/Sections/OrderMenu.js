import React from "react";
import styled from "styled-components";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1.5),
//         backgroundColor: "#f1f0f0",
//         borderRadius: "5px",
//         fontFamily: "Spoqa Han Sans",
//       },
//     }
//   }));

function OrderMenu() {
  return (
    <ButtonWrapper>
      <Button>메뉴</Button>
      <Button>이벤트</Button>
      <Button>직원호출</Button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  text-align: center; /*inline-block의 장점은 폰트의 성질도 포함되고 있어서 text-align으로 정렬을 쉽게 할수가 있다.*/
  width: 100%;
  height: 80%;
`;

const Button = styled.div`
  border: none;
  overflow: hidden;
  position: relative;
  border-radius: 2px;
  padding: 12px 18px;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 16px;
  display: inline-block; /*이부분에 성질을 inline-block로 바꿔줘서 가로배치를 해줬다.*/
  width: 20%;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #f1f1f0;
  box-shadow: 0 0 4px #999;
  outline: none;
  vertical-align: middle;
  transition: background 0.8s;
  background-position: center;

  &:hover {
    background: #6ac48a radial-gradient(circle, transparent 1%, #6ac48a 1%)
      center/15000%;
  }

  &:active {
    background-color: #f1f1f0;
    background-size: 100%;
    transition: background 0s;
  }
`;

export default OrderMenu;
