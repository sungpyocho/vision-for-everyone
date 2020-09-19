import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { DialogTitle, DialogContent } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess"; // 세부메뉴 열기
import ExpandMore from "@material-ui/icons/ExpandMore"; // 세부메뉴 닫기
import Divider from "@material-ui/core/Divider"; // 리스트 사이에 넣는 구분선

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "50vh",
    fontWeight: "500",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  category: {
    fontSize: "16px",
    fontWeight: "500",
  }
}));

function Menu({ selectedBranch, menuListClick }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState([0]);
  const [menusFromDB, setMenusFromDB] = useState(null);

  // 여러개의 state를 관리할 때, Material UI에서 쓰는 로직.
  // 꼭 기억해두자.
  const handleOpen = (value) => () => {
    const currentIndex = open.indexOf(value);
    const newOpen = [...open];

    if (currentIndex === -1) {
      newOpen.push(value);
    } else {
      newOpen.splice(currentIndex, 1);
    }
    setOpen(newOpen);
  };

  useEffect(() => {
    if (!selectedBranch) return;
    const postBranchName = async (branchName) => {
      const response = await axios.post("/api/restaurant/get-menu", {
        branchName: branchName,
      });

      const categories = response.data.category;
      setMenusFromDB(categories);
    };
    postBranchName(selectedBranch);
  }, [selectedBranch]);

  return (
    <>
      <DialogTitle id="menu-title" style={{ textAlign: "center", color: "#289C8E" }}>
        {"메뉴판"}
      </DialogTitle>
      <DialogContent>
        <List className={classes.root}>
          {menusFromDB &&
            menusFromDB.map((category, idx) => {
              return (
                <div key={category._id}>
                  <ListItem button onClick={handleOpen(category)}>
                    <ListItemText className={classes.category} disableTypography={true}> {category.name} </ListItemText>
                    {/* {open.indexOf(category) !== -1 ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )} 디자인안에서 빠져서 확장축소버튼은 일단 뺌*/}
                  </ListItem>
                  <Collapse
                    in={open.indexOf(category) !== -1}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {category.menu.map((menu) => (
                        <ListItem
                          button
                          key={menu._id}
                          onClick={() => menuListClick(menu.menuName)}
                        >
                          <ListItemText
                            primary={menu.menuName}
                            secondary={menu.menuPrice+"원"}
                            className={classes.nested}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                  <Divider aria-hidden="true" />
                </div>
              );
            })}
        </List>
      </DialogContent>
    </>
  );
}

export default Menu;
