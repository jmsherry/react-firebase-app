import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { MenuContext } from "./../../contexts/menu.context";
import { AuthContext } from "./../../contexts/auth.context";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const NavDrawer = () => {
  const classes = useStyles();
  const { isOpen, toggle } = useContext(MenuContext);
  const { user } = useContext(AuthContext);
  const handleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggle();
  };

  let links = [
    { text: "Menu", to: "/" },
  ];

  const privateLinks = [{ text: "Add Items", to: "/menu-item/add" }];
  const loginPageLink = { text: "Login", to: "/login" };

  if(user) {
    links = [...links, ...privateLinks];
  } else {
    links = [...links, loginPageLink];
  }

  return (
    <Drawer anchor="left" open={isOpen} onClose={handleDrawer()}>
      <div
        className={classes.list}
        role="presentation"
        onClick={handleDrawer()}
        onKeyDown={handleDrawer()}
      >
        <List>
          {links.map(({ text, to }) => (
            <ListItem button component={NavLink} to={to} key={text}>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavDrawer;
