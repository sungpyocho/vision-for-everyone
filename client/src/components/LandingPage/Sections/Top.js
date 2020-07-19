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
  register: {
    color: "#6ac48a",
    borderRadius: 5,
    boxShadow: "0 0 0.2rem rgba(0, 0, 0, .1)",
  },
  order: {
    backgroundColor: "#6ac46a",
    color: "white",
    borderRadius: 5,
    boxShadow: "0 0 0.2rem rgba(0, 0, 0, .1)"
  }
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
  h2 {
    color: gray
  }
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
              <img src={kiweLanding} alt="키위소개" aria-hidden="true" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <div>
              <div className="title-block">
                <h2 aria-label="키오스크 위">Kiosk + We </h2>
                <h3>누구나 쉽게,
                  <br/> 
                대화하며 주문해요</h3>
              </div>

              <div className={classes.root}>
                {/* <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={toTutorialPage}
                >
                  튜토리얼 페이지로
                </Button> */}
                <Button
                  variant="outlined"
                  className={classes.register}
                  onClick={toRegisterPage}
                >
                  키위 가입하기
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.order}
                  onClick={toChatPage}
                >
                  주문하러 가기
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
