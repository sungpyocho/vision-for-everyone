import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core"; 
import { makeStyles } from '@material-ui/core/styles';
// import { SettingsIcon, AccountCircleIcon } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(90deg, #faf796 20%,  #6ac48a 90%)',
  },
  title: {
    flexGrow: 1,
    color: 'black',
    fontWeight: 500,
    fontFamily: 'Spoqa Han Sans',
  },
  settingsIcon: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}> 
            KiWE
          </Typography>
          <SettingsIcon className={classes.settingsIcon}/>
          <AccountCircleIcon />
        </Toolbar>
      </AppBar>
    </div>
  )
}