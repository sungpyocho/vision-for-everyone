import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";
import { withRouter } from "react-router-dom";

import { AppBar, Button, Toolbar, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

import FontSizeChanger from 'react-font-size-changer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#2FC4B2",
  },
  title: {
    flexGrow: 1,
  },
  homeIconContainer: {
    marginLeft: theme.spacing(0),
  },
  homeIcon: {},
  settingsIcon: {
    marginRight: theme.spacing(0),
  },
  dummy: {
    flexGrow: 1,
  },
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
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            aria-label="홈으로"
            aria-haspopup="true"
            color="inherit"
            href="/"
            edge="start"
            // onClick={handleMenuSettings}
            className={classes.homeIconContainer}
          >
            <HomeIcon />
          </IconButton>
          <div className={classes.dummy} />
          <IconButton
            aria-label="설정"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenuSettings}
          >
            <SettingsIcon className={classes.settingsIcon} />
          </IconButton>
          <Menu
            id="settings-appbar"
            anchorEl={anchorElSettings}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openSettings}
            onClose={handleCloseSettings}
          >
            <MenuItem>
              <FontSizeChanger
                targets={['#target']}
                onChange={(element, newValue, oldValue) => {
                  console.log(element, newValue, oldValue);
                }}
                options={{
                  stepSize: 2,
                  range: 3
                }}
                customButtons={{
                  up: <span style={{'fontSize': '36px'}}>가</span>,
                  down: <span style={{'fontSize': '20px'}}>가</span>,
                  style: {
                    backgroundColor: '#3bc3b3',
                    color: 'white',
                    WebkitBoxSizing: 'border-box',
                    WebkitBorderRadius: '5px',
                    width: '60px'
                  },
                  buttonsMargin: 10
                }}          
              />
            </MenuItem>
            <MenuItem onClick={handleCloseSettings}>고대비</MenuItem>
          </Menu>
          {/* // 로그인 한 상태일때는 회원 버튼을 표시 */}
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
