import React from "react";
import styled from "styled-components";
import Map from "../Sections/Map";
import Menu from "./Menu";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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

function OrderMenu({ handleTextQuery }) {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [openMap, setopenMap] = React.useState(false);
  const [openCall, setOpenCall] = React.useState(false);
  const [userSelectedRestaurant, setUserSelectedRestaurant] = React.useState(
    null
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      top: "20vh",
      width: "100vw",
      height: "100vh",
      borderRadius: "25px",
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

  const handleUserSelectedRestaurant = (name) => {
    setIsDisabled(false);
    setUserSelectedRestaurant(name);
  };

  // 메뉴리스트 클릭시 메시지를 보내는 함수. 메뉴판 컴포넌트에 넘겨줍니다
  const menuListClick = (res) => {
    handleCloseMenu();
    handleTextQuery(res);
  };

  // 식당리스트 클릭시 메시지를 보내는 함수. 맵 컴포넌트에 넘겨줍니다
  const mapRestaurantClick = (res) => {
    handleCloseMap();
    handleUserSelectedRestaurant(res);
    handleTextQuery(res);
  };

  return (
    <MenuComponent>
      {/* 메뉴판 버튼 */}
      <CustomButton disabled={isDisabled} onClick={handleOpenMenu}>
        메뉴판
      </CustomButton>
      <Dialog
        open={openMenu}
        onClose={handleCloseMenu}
        aria-label="메뉴버튼 바입니다"
        aria-labelledby="menu-title"
        aria-describedby="menu-description"
      >
        <Menu
          selectedBranch={userSelectedRestaurant}
          menuListClick={menuListClick}
        />
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
        maxWidth={false}
        fullWidth={true}
      >
        <DialogTitle
          id="map-title"
          style={{ textAlign: "center" }}
          onClose={handleCloseMap}
        >
          내 주변 식당찾기
        </DialogTitle>
        {/* <DialogContentText id="map-description">
            고려대학교 학식 키위로 결제시 5% 할인
          </DialogContentText> */}
        <Map mapRestaurantClick={mapRestaurantClick} />
      </Dialog>
      {/* 직원호출 버튼 */}
      <CustomButton disabled={isDisabled} onClick={handleOpenCall}>
        직원호출
      </CustomButton>
      <Dialog
        open={openCall}
        onClose={handleCloseCall}
        aria-labelledby="call-title"
        aria-describedby="call-description"
      >
        <DialogTitle id="call-title" style={{ textAlign: "center" }}>
          {"직원호출"}
        </DialogTitle>
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
  padding-left: 3%;
  padding-right: 3%;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) {
    top: 64px;
  }
`;

const CustomButton = styled.button`
  border: none;
  overflow: hidden;
  position: relative;
  border-radius: 25px;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 16px;
  font-weight: 500;
  display: inline-block; /*이부분에 성질을 inline-block로 바꿔줘서 가로배치를 해줬다.*/
  width: 33%;
  flex-shrink: 1;
  cursor: pointer;
  color: ${(props) => (props.disabled ? "#ffffff" : "#289cb2")};
  background-color: ${(props) => (props.disabled ? "#aaaaaa" : "#ffffff")};
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
