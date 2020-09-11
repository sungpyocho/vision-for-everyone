import React from "react";
import styled from "styled-components";
import Map from "../Sections/Map";
import Menu from "./Menu";
import PropTypes from "prop-types";

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
    menuDialogPaper: {
      minWidth: "90vw",
      maxWidth: "90vw",
      margin: "0px",
      minHeight: "70vh",
      maxHeight: "70vh",
      borderRadius: "25px",
    },
    mapDialogPaper: {
      minWidth: "100vw",
      maxWidth: "100vw",
      margin: "0px",
      height: "calc(100% - 32px)",
      top: "32px",
      borderRadius: "25px 25px 0px 0px",
      overflow: "auto"
    },
    staffDialogPaper: {
      borderRadius: "25px",
    },
    menuCloseButton: {
      color: "#232323",
      backgroundColor: "#FFB5B5",
      borderRadius: "20px",
      right: "5px",
      bottom: "5px",
      boxShadow: "1px 2px 2px rgba(74, 74, 74, 0.25)",
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
      {/* 1. 메뉴판 버튼 */}
      <CustomButton disabled={isDisabled} onClick={handleOpenMenu}>
        메뉴판
      </CustomButton>
      <Dialog
        classes={{ paper: classes.menuDialogPaper }}
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
          <Button
            className={classes.menuCloseButton}
            onClick={handleCloseMenu}
            autoFocus
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>

      {/* 2. 식당찾기 버튼 */}
      <CustomButton onClick={handleOpenMap}>식당찾기</CustomButton>
      <Dialog
        classes={{ paper: classes.mapDialogPaper }}
        open={openMap}
        onClose={handleCloseMap}
        aria-labelledby="map-title"
        aria-describedby="map-description"
      >
        <DialogTitle
          id="map-title"
          style={{ textAlign: "left" }}
          onClose={handleCloseMap}
        >
          내 주변 식당찾기
        </DialogTitle>
        {/* <DialogContentText id="map-description">
            고려대학교 학식 키위로 결제시 5% 할인
          </DialogContentText> */}
        <Map mapRestaurantClick={mapRestaurantClick} />
      </Dialog>

      {/* 3. 직원호출 버튼 */}
      <CustomButton disabled={isDisabled} onClick={handleOpenCall}>
        직원호출
      </CustomButton>
      <Dialog
        classes={{ paper: classes.staffDialogPaper }}
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
          <Button onClick={handleCloseCall} className={classes.menuCloseButton} autoFocus>
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
  font-weight: 700;
  display: inline-block; /*요소의 가로배치를 위해*/
  width: 33%;
  flex-shrink: 1;
  cursor: pointer;
  color: ${(props) => (props.disabled ? "#ffffff" : "#289cb2")};
  background-color: ${(props) => (props.disabled ? "#aaaaaa" : "#ffffff")};
  box-shadow: 1px 2px 2px rgba(74, 74, 74, 0.25);
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

export default withStyles(styles)(OrderMenu);
