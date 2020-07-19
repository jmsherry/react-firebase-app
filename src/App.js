import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch,
} from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { AuthProvider } from "./contexts/auth.context";
// import { PeopleProvider } from "./contexts/people.context";
import { MenuItemsProvider } from "./contexts/menu-items.context";
import { MenuProvider } from "./contexts/menu.context";

import Menu from "./pages/menu/menu";
import NotFound from "./pages/404/404";
import AddMenuItem from "./pages/add-menu-item/add-menu-item";
import UpdateMenuItem from "./pages/update-menu-item/update-menu-item";

function App() {
  return (
    <ToastProvider autoDismiss={true}>
      <AuthProvider>
        <MenuItemsProvider>
          <MenuProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={Menu} />
                <Route exact path={`/menu-item/add`} component={AddMenuItem} />
                <Route
                  exact
                  path={`/menu-item/update/:id`}
                  component={UpdateMenuItem}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </Router>
          </MenuProvider>
        </MenuItemsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
