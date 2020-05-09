import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function OrderMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [openCall, setOpenCall] = React.useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleOpenEvent = () => {
    setOpenEvent(true);
  };

  const handleOpenCall = () => {
    setOpenCall(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleCloseEvent = () => {
    setOpenEvent(false);
  };

  const handleCloseCall = () => {
    setOpenCall(false);
  };

  return (
    <MenuComponent>
      {/* 메뉴 버튼 */}
      <CustomButton onClick={handleOpenMenu}>메뉴</CustomButton>
      <Dialog
        open={openMenu}
        onClose={handleCloseMenu}
        aria-labelledby="menu-title"
        aria-describedby="menu-description"
      >
        <DialogTitle id="menu-title">{"메뉴"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="menu-description">
            짜장면: 사천원, 짬뽕: 오천원, 탕수육: 만원
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu} color="primary" autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      {/* 이벤트 버튼 */}
      <CustomButton onClick={handleOpenEvent}>이벤트</CustomButton>
      <Dialog
        open={openEvent}
        onClose={handleCloseEvent}
        aria-labelledby="event-title"
        aria-describedby="event-description"
      >
        <DialogTitle id="event-title">{"키위 오픈 기념 이벤트"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="event-description">
            고려대학교 학식 키위로 결제시 5% 할인
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEvent} color="primary" autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      {/* 직원호출 버튼 */}
      <CustomButton onClick={handleOpenCall}>직원호출</CustomButton>
      <Dialog
        open={openCall}
        onClose={handleCloseCall}
        aria-labelledby="call-title"
        aria-describedby="call-description"
      >
        <DialogTitle id="call-title">{"직원호출"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="call-description">
            직원호출 기능은 추후 점주와 협의하여 제공할 계획입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCall} color="primary" autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </MenuComponent>
  );
}

const MenuComponent = styled.div`
  display: flex;
  top: 56px;
  height: 10%;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) {
    top: 64px;
  }
`;

const CustomButton = styled.div`
  border: none;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 16px;
  font-weight: 500;
  display: inline-block; /*이부분에 성질을 inline-block로 바꿔줘서 가로배치를 해줬다.*/
  width: 33%;
  flex-shrink: 1;
  cursor: pointer;
  background-color: #f1f1f0;
  box-shadow: 0 0 4px #999;
  outline: none;
  transition: background 0.8s;
  background-position: center;
  @media (max-height: 500px) {
    padding: 4px;
  }
  @media (min-height: 500px) and (max-height: 600px) {
    padding: 8px;
  }
  @media (min-height: 600px) and (max-height: 900px) {
    padding: 10px;
  }
  @media (min-height: 900px) {
    padding: 12px;
  }

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
