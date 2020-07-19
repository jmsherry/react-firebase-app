import React, { useContext } from "react";
import { MenuItemsContext } from "../../contexts/menu-items.context";
import List from "./../list/list";
import MenuItem from "./../menu-item/menu-item";

const Menu = () => {
  const { items } = useContext(MenuItemsContext);
  return (
    <div className="menuListDisplay">
      <List data={items} ItemComponent={MenuItem} />
    </div>
  );
};

export default Menu;
