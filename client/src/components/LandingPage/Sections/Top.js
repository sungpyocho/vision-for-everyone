import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import kiweLanding from "../../../assets/kiwe-landing.png";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    marginTop: "50px",
    textAlign: "center",
  },
  button: {
    color: "#6ac48a",
    borderRadius: 5,
    boxShadow: "0 0 0.2rem rgba(0, 0, 0, .1)",
  },
}));

const TopBlock = styled.div`
  img {
    width: 100%;
    height: auto;
  }
  .title-block {
    margin-top: 30px;
  }
  padding-top: 64px;

  h3 {
    font-weight: 500;
    margin: 0;
  }

  .sub-title {
    font-weight: 400;
    margin-top: 25px;
  }
`;

function Top(props) {
  const classes = useStyles();
  const toTutorialPage = () => {
    props.props.history.push("/tutorial");
  };

  const toRegisterPage = () => {
    props.props.history.push("/register");
  };

  const toChatPage = () => {
    props.props.history.push("/chat");
  };

  return (
    <TopBlock>
      <div>
        <Grid container>
          <Grid item xs={12} sm={6} align="center">
            <div>
              <img src={kiweLanding} alt="kiwe-landing-page-image" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <div>
              <div className="title-block">
                <h3>Kiosk We: </h3>
                <h3>함께하는 키오스크 키위.</h3>

                <div className="sub-title">
                  키위와 함께라면 식당에서의 주문은 편리해집니다.
                </div>
              </div>

              <div className={classes.root}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={toTutorialPage}
                >
                  튜토리얼 페이지로
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={toRegisterPage}
                >
                  회원가입 페이지로
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={toChatPage}
                >
                  챗봇 페이지로
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </TopBlock>
  );
}

export default Top;
