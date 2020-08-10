import React from "react";
import styled from "styled-components";
import Map from "../Sections/Map";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function OrderMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [openCall, setOpenCall] = React.useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleOpenMap = () => {
    setOpenEvent(true);
  };

  const handleOpenCall = () => {
    setOpenCall(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleCloseMap = () => {
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
        aria-label="메뉴버튼 바입니다"
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
      {/* 식당찾기 버튼 */}
      <CustomButton onClick={handleOpenMap}>식당찾기</CustomButton>
      <Dialog
        open={openEvent}
        onClose={handleCloseMap}
        aria-labelledby="map-title"
        aria-describedby="map-description"
      >
        <DialogTitle id="map-title" onClose={handleCloseMap}>
          주변 식당찾기
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="map-description">
            고려대학교 학식 키위로 결제시 5% 할인
          </DialogContentText> */}
          <Map />
        </DialogContent>
        <DialogActions></DialogActions>
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
