import React, { useContext /* useState,  useEffect */ } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  // Select,
  // MenuItem,
  // InputLabel,
  LinearProgress,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { AuthContext } from "../../../contexts/auth.context";

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

function LoginForm() {
  const classes = useStyles();
  const { login, loading, error } = useContext(AuthContext);
  const resetValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().required().min(2).max(20),
  });

  const { handleSubmit, errors, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // console.log("errors", errors);
  const onSubmit = async (creds) => {
    console.log("creds", creds);
    login(creds);
    reset(resetValues);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="error">error.message || error.status</p>}
      {loading && <LinearProgress />}
      <div className={classes.formRow}>
        <Controller
          as={<TextField helperText={errors.email && errors.email.message} />}
          error={!!errors.email}
          id="email"
          name="email"
          label="Email"
          fullWidth
          control={control}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          as={
            <TextField
              helperText={errors.password && errors.password.message}
            />
          }
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          id="password"
          type="password"
          name="password"
          label="Password"
          fullWidth
          control={control}
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
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
