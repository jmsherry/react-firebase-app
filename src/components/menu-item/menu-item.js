import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { MenuItemsContext } from "../../contexts/menu-items.context";
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
    _id,
    name,
    description,
  },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { deleteItem } = useContext(MenuItemsContext);

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
      <div className={classes.controls}>
        <Button onClick={() => updateHandler(_id)} aria-label="update menu item">
          <EditOutlinedIcon />
        </Button>
        <Button onClick={() => deleteItem(_id)} aria-label="delete menu item">
          <DeleteOutlineIcon />
        </Button>
      </div>
    </li>
  );
};

export default MenuItem;
