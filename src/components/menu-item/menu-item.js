import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { MenuItemsContext } from "../../contexts/menu-items.context";
import { AuthContext } from "../../contexts/auth.context";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  item: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  display: {
    marginInlineEnd: "50px",
  },
}));

const MenuItem = ({
  item: {
    id,
    name,
    description,
  },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { deleteItem } = useContext(MenuItemsContext);
  const { user } = useContext(AuthContext);

  function updateHandler(id) {
    history.push(`/menu-item/update/${id}`);
  }

  return (
    <li className={classes.item}>
      <div className={classes.display}>
        <p>{name}</p>
      </div>
      <div className={classes.display}>
        <p>{description}</p>
      </div>
      {user && <div className={classes.controls}>
        <Button onClick={() => updateHandler(id)} aria-label="update menu item">
          <EditOutlinedIcon />
        </Button>
        <Button onClick={() => deleteItem(id)} aria-label="delete menu item">
          <DeleteOutlineIcon />
        </Button>
      </div>}
    </li>
  );
};

export default MenuItem;
