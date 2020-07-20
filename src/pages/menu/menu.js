import React, { useContext /* useEffect */ } from "react";
import Header from "../../components/header/header";
import PageFrame from "../../components/page-frame/page-frame";
import NoResults from "../../components/no-results/no-results";
// import ErrorDisplay from "../../components/error-display/error-display";
// import { CircularProgress } from "@material-ui/core";
import Menu from "../../components/menu/menu";
import { MenuItemsContext } from "../../contexts/menu-items.context";
// import { useToasts } from "react-toast-notifications";
// import useFetch from "react-fetch-hook";

function MenuPage() {
  const { items } = useContext(MenuItemsContext);

  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Our Menu</h1>

          {items?.length ? (
            <Menu items={items} />
          ) : (
            <NoResults dataName="Menu Items" />
          )}
        </PageFrame>
      </main>
    </div>
  );
}

export default MenuPage;
