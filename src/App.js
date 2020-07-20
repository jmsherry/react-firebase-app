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
import { MenuItemsProvider } from "./contexts/menu-items.context";
import { MenuProvider as NavProvider } from "./contexts/menu.context";

import Menu from "./pages/menu/menu";
import NotFound from "./pages/404/404";
import Login from "./pages/login/login";
import AddMenuItem from "./pages/add-menu-item/add-menu-item";
import UpdateMenuItem from "./pages/update-menu-item/update-menu-item";

import ProtectedRoute from './components/protected-route/ProtectedRoute';

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <AuthProvider>
          <MenuItemsProvider>
            <NavProvider>
              <Switch>
                <Route exact path="/" component={Menu} />
                <Route exact path="/login" component={Login} />
                <ProtectedRoute
                  exact
                  path={`/menu-item/add`}
                  component={AddMenuItem}
                />
                <ProtectedRoute
                  exact
                  path={`/menu-item/update/:id`}
                  component={UpdateMenuItem}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </NavProvider>
          </MenuItemsProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
