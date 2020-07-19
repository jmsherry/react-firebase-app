import React, { useContext, useState, /* useEffect */ } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  // Select,
  // MenuItem,
  // InputLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import { MenuItemsContext } from "../../../contexts/menu-items.context";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formRow: {
    // padding: theme.spacing(1),
    margin: `0 auto ${theme.spacing(1)}px`,
    maxWidth: "50%",
  },
  errorMessage: {
    color: "red",
  },
}));

function MenuItemForm({ initialValues }) {
  const classes = useStyles();
  let { id } = useParams();
  const [populated, setPopulated] = useState(false);
  const { addItem, updateItem } = useContext(MenuItemsContext);
  const resetValues = {
    name: "",
    description: "",
  };

  // useEffect(() => {
  //   console.log("in useEffect", people, peopleLoaded);
  //   if (!peopleLoaded) {
  //     fetchPeople();
  //   }
  // }, [peopleLoaded, fetchPeople, people]);

  // const ids = people.map((person) => person._id); // tags checked here
  const schema = yup.object().shape({
    name: yup.string().required().min(2).max(20),
    description: yup.string().required().min(2).max(50),
    // price: yup.number().required(), // could do better for amounts
    // stock: yup.number().required(),
    // tags: yup.mixed().oneOf(tags),
    // owner: yup.mixed().oneOf(ids),
  });

  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  if (initialValues && !populated) {
    const formValues = { ...initialValues };
    console.log("formValues", formValues);
    reset(formValues);
    setPopulated(true);
  }

  // console.log("errors", errors);
  const onSubmit = async (formValues) => {
    console.log("formValues", formValues);
    // formValues._id = id; // pulled from the URL using router 'useParams' hook

    if (populated) {
      const updates = {};
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          if (initialValues[key] !== formValues[key] && key[0] !== '_') {
            updates[key] = formValues[key];
          }
        }
      }

      console.log("updates", updates);
      const args = [id, updates];

      
      updateItem(...args);
    } else {
      addItem(formValues);
    }
    reset(resetValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formRow}>
        <Controller
          as={<TextField helperText={errors.name && errors.name.message} />}
          error={!!errors.name}
          id="name"
          name="name"
          label="Name"
          fullWidth
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          as={
            <TextField
              helperText={errors.description && errors.description.message}
            />
          }
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          id="description"
          name="description"
          label="Description"
          multiline
          fullWidth
          control={control}
          rules={{ required: true }}
        />
      </div>
      <div className={classes.formRow}>
        <Button onClick={() => reset(resetValues)}>Reset</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!formState.isValid}
        >
          {populated ? "Update" : "Add"} Item
        </Button>
      </div>
    </form>
  );
}

export default MenuItemForm;
