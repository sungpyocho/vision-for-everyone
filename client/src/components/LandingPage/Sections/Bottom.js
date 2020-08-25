import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Box: {
    marginTop: "0px",
  },
}));

const BottomBlock = styled.div`
  padding-bottom: 48px;
  section {
    padding: 48px;
  }

  Button {
    margin-left: 10px;
  }

  .col__elem {
    justify-content: center;
  }
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © kiWE "}
      {new Date().getFullYear()}
    </Typography>
  );
}

function Bottom() {
  const classes = useStyles();

  return (
    <BottomBlock>
      <Box className={classes.Box} mt={8}>
        <Copyright />
      </Box>
    </BottomBlock>
  );
}

export default Bottom;
