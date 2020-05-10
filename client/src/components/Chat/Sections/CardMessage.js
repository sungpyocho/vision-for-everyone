import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 180,
    paddingTop: 10,
    marginBottom: "10px",
  },
  media: {
    height: 130,
  },
});

function CardMessage(props) {
  const classes = useStyles();
  let endOfMessage = null;

  useEffect(() => {
    endOfMessage.scrollIntoView({ behaviour: "smooth" });
  }, []);

  return (
    <div
      style={{
        float: "left",
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.cardInfo.fields.image.stringValue}
            title={props.cardInfo.fields.menuDetail.stringValue}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.cardInfo.fields.menuDetail.stringValue}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {props.cardInfo.fields.shopName.stringValue}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            // onClick={}
          >
            주문하기
          </Button>
        </CardActions>
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
}

export default CardMessage;
