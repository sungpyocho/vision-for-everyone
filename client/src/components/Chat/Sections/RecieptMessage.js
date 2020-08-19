import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core/";

const useStyles = makeStyles({
  root: {
    minWidth: 180,
    paddingTop: 10,
    marginBottom: "10px",
    marginTop: "30px",
  },
});

const RecieptMessage = (props) => {
  const classes = useStyles();
  let endOfMessage = null;

  useEffect(() => {
    endOfMessage.scrollIntoView({ behaviour: "smooth" });
  }, []);

  return (
    <div
      style={{
        marginLeft: "10vw",
        marginRight: "10vw",
      }}
    >
      <Card className={classes.root}>
        {/* <CardActionArea> */}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {props.orderResult.restaurantName}에서 주문이 완료되었어요 :)
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            대기번호
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            component="h2"
            style={{ textAlign: "center" }}
          >
            {Math.floor(Math.random() * 100)}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center" }}
          >
            주문하신 메뉴
          </Typography>
          <List component="nav">
            <ListItem>
              <ListItemText style={{ textAlign: "left" }}>
                {props.orderResult.menuName}
              </ListItemText>
              <ListItemText style={{ textAlign: "right" }}>
                {props.orderResult.totalAmount}원
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText style={{ textAlign: "right" }}>
                결제하신 금액: 총 {props.orderResult.totalAmount}원
              </ListItemText>
            </ListItem>
          </List>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
      {/* 자동 scroll을 위한 div */}
      <div
        ref={(el) => {
          endOfMessage = el;
        }}
        style={{ float: "left", clear: "both" }}
      ></div>
    </div>
  );
};

export default RecieptMessage;
