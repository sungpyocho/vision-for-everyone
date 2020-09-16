import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import event_bears from "./event_bears.jpeg";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardBackground,
} from "@material-ui/core/";

export default function Event() {
  const useStyles = makeStyles((theme) => ({
    eventDialogPaper: {
      minWidth: "70vw",
      maxWidth: "70vw",
      margin: "0px",
      minHeight: "70vw",
      maxHeight: "70vw",
      borderRadius: "20px",
    },
    media: {
      height: "240px"
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
  const [openEvent, setOpenEvent] = useState(false);
  const handleOpenEvent = () => {
    setOpenEvent(true);
  };
  const handleCloseEvent = () => {
    setOpenEvent(false);
  };

  return (
    <div style={{ display: "inline-block" }}>
      <Button variant="outlined" color="primary" onClick={handleOpenEvent}>
        이벤트
      </Button>
      <Dialog
        onClose={handleCloseEvent}
        aria-labelledby="simple-dialog-title"
        open={openEvent}
        classes={{ paper: classes.eventDialogPaper }}
      >
        <DialogTitle style={{ textAlign: "center", color: "#289C8E" }}>
          이벤트
        </DialogTitle>
        <CardMedia className={classes.media} image={require("./event_bears.jpeg")}>
        </CardMedia>
        <Typography variant="subtitle1">
          [페이스북] 키위 팔로우하고 귀여운 곰돌이 받아가자!
        </Typography>
        <DialogActions>
          <Button
            className={classes.menuCloseButton}
            onClick={handleCloseEvent}
            autoFocus
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
