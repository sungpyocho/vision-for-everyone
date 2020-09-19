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
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import event_image from "../../../assets/event_image.png";
import event_icon from "../../../assets/event_icon.svg";

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
      minWidth: "80vw",
      maxWidth: "80vw",
      margin: "0px",
      minHeight: "50vh",
      maxHeight: "50vh",
      borderRadius: "20px",
    },
    media: {
      height: "240px",
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
      <img role="img" src={event_icon} aria-label="식당 이벤트 보기" onClick={handleOpenEvent}></img>
      <Dialog
        onClose={handleCloseEvent}
        aria-labelledby="simple-dialog-title"
        open={openEvent}
        classes={{ paper: classes.eventDialogPaper }}
      >
        <DialogTitle style={{ textAlign: "center", color: "#289C8E" }}>
          이벤트
        </DialogTitle>
        <CardMedia className={classes.media} image={event_image}></CardMedia>
        <span
          style={{ fontWeight: "700" }}
        >
          2만원 이상 구매시 스타벅스 아메리카노 증정
        </span>
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
