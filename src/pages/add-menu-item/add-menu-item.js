import React from "react";
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@material-ui/core";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header/header";
import PageFrame from "../../components/page-frame/page-frame";
import MenuItemForm from '../../components/forms/menu-item-form/menu-item-form';


// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     display: 'flex',
//   },
//   controls: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

function AddMenuItem() {
  // const classes = useStyles();


  return (
    <div className="App">
      <Header />
      <main>
        <PageFrame>
          <h1>Add Menu Item</h1>
          <MenuItemForm />
        </PageFrame>
      </main>
    </div>
  );
}

export default AddMenuItem;
