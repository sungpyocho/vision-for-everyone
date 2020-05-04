import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1.5),
        backgroundColor: "#f1f0f0",
        borderRadius: "5px",
        fontFamily: "Spoqa Han Sans",
      },
    }
  }));

function OrderMenu() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained">메뉴</Button>
            <Button variant="contained">이벤트</Button>
            <Button variant="contained">직원호출</Button>
        </div>
    )
}

export default OrderMenu