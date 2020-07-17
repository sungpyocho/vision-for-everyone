import React from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// 여기서부터는 메뉴, 이벤트 이쁘게 띄워주기 위해 불러온 컴포넌트
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess'; // 세부메뉴 열기
import ExpandMore from '@material-ui/icons/ExpandMore'; // 세부메뉴 닫기

function OrderMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openEvent, setOpenEvent] = React.useState(false);
  const [openCall, setOpenCall] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(true);

  const useStyles = makeStyles((theme)=> ({
    root: {
      width:'100%',
      minWidth:'50%',
      maxWidth: 720,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    }
  }));

  const classes = useStyles();

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

  const handleOpenSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  }

  return (
    <MenuComponent >
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
          {/* <DialogContentText id="menu-description">
            짜장면: 사천원, 짬뽕: 오천원, 탕수육: 만원
          </DialogContentText> */}
          <List className={classes.root}>
            <ListItem Button>
              <ListItemText primary="육개장" secondary="2500원"/>
            </ListItem>
            <ListItem Button>
              <ListItemText primary="탕수육인데 겁나 긴 탕수육" secondary="5000원"/>
            </ListItem>
            <ListItem Button onClick={handleOpenSubMenu}>
              <ListItemText primary="버거류"/>
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText primary="와퍼" secondary="4800원" className={classes.nested}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="와퍼주니어" secondary="2900원" className={classes.nested}/>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="트리플치즈트러플베이컨와퍼" secondary="7900원" className={classes.nested}/>
                </ListItem>
              </List>
            </Collapse>
          </List>
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
        <DialogTitle id="event-title" >{"키위 오픈 기념 이벤트"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="event-description" >
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
      <CustomButton onClick={handleOpenCall} >직원호출</CustomButton>
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
