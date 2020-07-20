import React, { useContext /* useEffect */ } from "react";
import PageFrame from "../../components/page-frame/page-frame";
import Header from "../../components/header/header";
import MenuItemForm from "../../components/forms/menu-item-form/menu-item-form";
import { useParams } from "react-router-dom";
import { MenuItemsContext } from "../../contexts/menu-items.context";

function UpdateItems() {
  let { id } = useParams();
  const { items } = useContext(MenuItemsContext);
  console.log("Items", items);

  const ItemToBeUpdated = items.find((item) => item.id === id);
  console.log("ItemToBeUpdated", ItemToBeUpdated);
  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Update Items</h1>
          <MenuItemForm initialValues={ItemToBeUpdated} />
        </PageFrame>
      </main>
    </div>
  );
}

export default UpdateItems;
