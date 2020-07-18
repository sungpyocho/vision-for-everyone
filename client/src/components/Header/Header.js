import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";
import { withRouter } from "react-router-dom";

import {AppBar,
  Button,
  Dialog,DialogActions,DialogTitle,
  Switch,
  Divider,
  List,ListItem,ListItemText,
  Toolbar,
  Menu,MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import KiweHeaderIcon from "../../assets/kiwe-header.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "linear-gradient(90deg, #faf796 20%,  #6ac48a 90%)",
  },
  title: {
    flexGrow: 1,
  },
  settingsDialog: {
    minWidth: "50vw",
    height: "80vh",
  },
  bold: {
    fontWeight: "bolder",
  }
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [anchorElMypage, setAnchorElMypage] = useState(null);
  // const [checked, setChecked] = useState(false);
  const openSettings = Boolean(anchorElSettings);
  const openMypage = Boolean(anchorElMypage);

  // 접근성 설정 메뉴를 위한 변수
  const [ openAccessibilitySettings, setOpenAccessibilitySettings] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(5);
  const [highContrast, setHighContrast] = React.useState(false);
  const [readMessage, setReadMessage] = React.useState(false);

  useEffect(() => {
    // 페이지 이동할때마다 dispatch가 작동해서 백엔드에 계속 요청
    dispatch(auth()).then((response) => {
      // 로그인하지 않은 상태일때는 로그인 버튼을 표시
      if (!response.payload.isAuth) {
        setIsLogin(false);
      } else {
        // 로그인 한 상태일때는 회원 버튼을 표시
        // 마이페이지, 로그아웃의 두 메뉴를 가진 회원버튼
        setIsLogin(true);
      }
    });
  }, [props.history.location.pathname]);

  const handleOpenAccessibilitySettings = () => {
    setOpenAccessibilitySettings(!openAccessibilitySettings);
  };

  const handleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const handleFontLarger = () => {
    if (fontSize < 10) {
      setFontSize(fontSize + 1);
    }
  };
  const handleFontSmaller = () => {
    if (fontSize > 1) {
      setFontSize(fontSize - 1);
    }
  };
  const handleReadMessage = () => {
    setReadMessage(!readMessage);
  }

  const handleMenuSettings = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleMenuMypage = (event) => {
    setAnchorElMypage(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElSettings(null);
  };

  const handleCloseMypage = () => {
    setAnchorElMypage(null);
  };

  const redirectToEditPage = () => {
    props.history.push("/edit");
  };

  const handleLogout = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        setIsLogin(false);
        props.history.push("/login");
      } else {
        alert("로그아웃이 실패하였습니다.");
      }
    });
    setAnchorElMypage(null);
  };

  const handleLogin = () => {
    props.history.push("/login");
  };

  return (
    // 헤더 바 전체
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* 1. 키위 로고 */}
          <a href="/" className={classes.title}>
            <img
              alt="키위 로고"
              aria-label="키위 홈으로"
              src={KiweHeaderIcon}
              style={{ height: "28px" }}
            />
          </a>
          {/* 2. 편의성 설정 아이콘*/}
          <IconButton
            aria-label="편의성 설정"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenAccessibilitySettings}
          >
            <SettingsIcon/>
          </IconButton>
          {/* 2-1. 아이콘 클릭시 뜨는 설정 페이지 */}
          <Dialog
            open={openAccessibilitySettings}
            onClose={handleOpenAccessibilitySettings}
            
          >
            <DialogTitle>편의성 설정</DialogTitle>
            <List className={classes.settingsDialog}>
              <ListItem>
                <ListItemText classes={{root: classes.bold}} disableTypography>접근성</ListItemText>
              </ListItem>
              <ListItem Button>
                <ListItemText primary="글자 크기" />
                <ListItemText>{fontSize}</ListItemText>
                <Button variant="outlined" onClick={handleFontSmaller} color="primary">글자 줄이기</Button>
                <Button variant="outlined" onClick={handleFontLarger} color="secondary" >글자 키우기</Button>
              </ListItem>
              <ListItem Button>
                <ListItemText primary="고대비 모드" />
                <Switch size="small" checked={highContrast} onChange={handleHighContrast}></Switch>
              </ListItem>
              <ListItem Button>
                <ListItemText primary="도착한 메시지 읽어주기" />
                <Switch size="small" checked={readMessage} onChange={handleReadMessage}></Switch>
              </ListItem>
              <Divider></Divider>
              <ListItem>
                <ListItemText classes={{root: classes.bold}} disableTypography>나만의 테마</ListItemText>
              </ListItem>
              <ListItem><ListItemText primary="준비중입니다" /></ListItem>
            </List>
            <DialogActions>
              <Button onClick={handleOpenAccessibilitySettings} color="primary" autoFocus>
                닫기
              </Button>
            </DialogActions>
          </Dialog>
          {/* 3. 로그인: 로그인한 상태일때는 회원 버튼을 표시 */}
          {isLogin && (
            <div>
              <IconButton
                aria-label="계정"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenuMypage}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="settings-appbar"
                anchorEl={anchorElMypage}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMypage}
                onClose={handleCloseMypage}
              >
                <MenuItem onClick={redirectToEditPage}>마이페이지</MenuItem>
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
              </Menu>
            </div>
          )}
          {/* 로그인하지 않은 상태일때는 로그인 버튼을 표시 */}
          {!isLogin && (
            <div>
              <Button color="inherit" onClick={handleLogin}>
                로그인
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
