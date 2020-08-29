import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import chatImg from "../../assets/tutorial/tutorial-chat.jpg";
import payImg from "../../assets/tutorial/tutorial-money.jpg";
import restImg from "../../assets/tutorial/tutorial-restaurant.jpg";
import byeImg from "../../assets/tutorial/tutorial-bye.jpg";
import foodImg from "../../assets/tutorial/tutorial-food.jpg";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 360,
    margin: "1rem",
  },
  title: {
    fontSize: 14,
  },
});

export default function TutorialPage(props) {
  const classes = useStyles();

  const moveToChat = () => {
    props.history.push("/chat");
  };

  return (
    <div style={{ backgroundColor: "#f1f0f0" }}>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea ref={input => input && input.focus()}>
              <CardMedia
                component="img"
                alt="첫번째 가이드."
                height="130"
                image={chatImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 1
                </Typography>
                <Typography variant="h5" component="h2">
                  키위는 세 개의 버튼 아래 채팅창이 있어요. 채팅 입력창을 통해
                  키위와 손쉽게 소통하며 주문해보아요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="두번째 가이드."
                height="130"
                image={restImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 2
                </Typography>
                <Typography variant="h5" component="h2">
                  버튼은 메뉴, 이벤트, 직원호출 버튼이 있어요. 직원호출은 아직
                  개발중이지만, 직원을 호출할 수 있어요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="세번째 가이드."
                height="130"
                image={foodImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 3
                </Typography>
                <Typography variant="h5" component="h2">
                  채팅창에서는 카톡처럼 대화하며 어디서 어떤 메뉴를 먹을지
                  고르고, 결제까지 바로 할 수 있어요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="네번째 가이드."
                height="130"
                image={byeImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 4
                </Typography>
                <Typography variant="h5" component="h2">
                  키위와 대화를 시작하려면 안녕, 또는 ㅎㅇ처럼 초성을
                  입력해주세요. 헬로, 하이같은 말도 물론 가능해요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="다섯번째 가이드."
                height="130"
                image={restImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 5
                </Typography>
                <Typography variant="h5" component="h2">
                  키위봇에게 식당을 알려주세요. 현재 고려대 학식, 스타벅스,
                  버거킹 등의 식당을 테스트할 수 있어요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="여섯번째 가이드."
                height="130"
                image={chatImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 6
                </Typography>
                <Typography variant="h5" component="h2">
                  키위봇에게 주문할 메뉴의 이름과 수량을 말씀하세요. "짜장면 3",
                  혹은 "ㅉㅈㅁ 3" 처럼요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="일곱번째 가이드."
                height="130"
                image={payImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 7
                </Typography>
                <Typography variant="h5" component="h2">
                  카카오페이, 삼성페이, 토스 등 결제방법을 선택해주세요.
                  삼성페이, ㅋㅋㅇ처럼 말해주세요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={4} align="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="여덟번째 가이드."
                height="130"
                image={byeImg}
                title="guide"
              />
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  aria-hidden="true"
                >
                  시작 가이드 8
                </Typography>
                <Typography variant="h5" component="h2">
                  결제모듈 연결이란 메시지가 나오면 대화가 끝나요. 처음으로
                  돌아가려면 안녕을 입력해주세요.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={moveToChat} size="small" color="primary">
                채팅창에서 확인해보기
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
