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
import { makeStyles } from "@material-ui/core/styles";

// 여기서부터는 메뉴, 이벤트 팝업을 이쁘게 띄워주기 위해 불러온 컴포넌트
// 1. 메뉴 팝업용
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess"; // 세부메뉴 열기
import ExpandMore from "@material-ui/icons/ExpandMore"; // 세부메뉴 닫기
import Divider from "@material-ui/core/Divider"; // 리스트 사이에 넣는 구분선

// 2. 이벤트 팝업용
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardBackground from "../../../assets/kiwe-event.jpg";

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

const MapDialog = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
});

function OrderMenu() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [openSubMenu2, setOpenSubMenu2] = React.useState(false);
  const [openMap, setopenMap] = React.useState(false);
  const [openCall, setOpenCall] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "50vw",
      minHeight: "80vh",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    media: {
      height: "200px",
    },
  }));

  const classes = useStyles();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleOpenSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  const handleOpenSubMenu2 = () => {
    setOpenSubMenu2(!openSubMenu2);
  };

  const handleOpenMap = () => {
    setopenMap(true);
  };

  const handleCloseMap = () => {
    setopenMap(false);
  };

  const handleOpenCall = () => {
    setOpenCall(true);
  };

  const handleCloseCall = () => {
    setOpenCall(false);
  };

  return (
    <MenuComponent>
      {/* 메뉴판 버튼 */}
      <CustomButton onClick={handleOpenMenu}>메뉴판</CustomButton>
      <Dialog
        open={openMenu}
        onClose={handleCloseMenu}
        aria-label="메뉴버튼 바입니다"
        aria-labelledby="menu-title"
        aria-describedby="menu-description"
      >
        <DialogTitle id="menu-title">{"메뉴"}</DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            <ListItem Button>
              <ListItemText primary="육개장" secondary="2500원" />
            </ListItem>
            <ListItem Button>
              <ListItemText primary="타이어보다 싼 탕수육" secondary="5000원" />
            </ListItem>
            <Divider />
            <ListItem Button onClick={handleOpenSubMenu}>
              <ListItemText primary="버거류" />
              {openSubMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText
                    primary="와퍼"
                    secondary="4800원"
                    className={classes.nested}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="와퍼주니어"
                    secondary="2900원"
                    className={classes.nested}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="트리플치즈트러플베이컨와퍼"
                    secondary="7900원"
                    className={classes.nested}
                  />
                </ListItem>
              </List>
            </Collapse>
            <Divider />
            <ListItem Button onClick={handleOpenSubMenu2}>
              <ListItemText primary="음료/사이드" />
              {openSubMenu2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenu2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText
                    primary="콜라M"
                    secondary="1700원"
                    className={classes.nested}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="감자튀김"
                    secondary="1300원"
                    className={classes.nested}
                  />
                </ListItem>
                <ListItem button>
                  <ListItemText
                    primary="소프트콘"
                    secondary="700원"
                    className={classes.nested}
                  />
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
      {/* 식당찾기 버튼 */}
      <CustomButton onClick={handleOpenMap}>식당찾기</CustomButton>
      <Dialog
        className={classes.root}
        open={openMap}
        onClose={handleCloseMap}
        aria-labelledby="map-title"
        aria-describedby="map-description"
        fullScreen={true}
      >
        <DialogTitle id="map-title" onClose={handleCloseMap}>
          내 주변 식당찾기
        </DialogTitle>
          {/* <DialogContentText id="map-description">
            고려대학교 학식 키위로 결제시 5% 할인
          </DialogContentText> */}
          <Map/>
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
