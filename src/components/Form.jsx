import React, { useState } from "react";
import "./Form.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { addUser } from "../services/userService";
const regions = [
  {
    value: "southAmerica",
    label: "South America",
  },
];

const countries = [
  {
    value: "Argentina",
    label: "Argentina",
  },
];

const Form = () => {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  const handleRegion = (event) => {
    console.log(event.target.value);
    setRegion(event.target.value);
  };
  const handleCountry = (event) => {
    console.log(event.target.value);
    setCountry(event.target.value);
  };

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const [lastName, setLastName] = useState("");

  const handleLastName = (event) => {
    console.log(event.target.value);
    setLastName(event.target.value);
  };

  const [password, setPassword] = useState("");

  const handlePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // addUser(userFormData).then(onAddUserSuccess).catch(onAddUserError);
  };

  const onAddUserSuccess = (response) => {
    console.log(response);
  };

  const onAddUserError = (err) => {
    console.log(err);
  };

  return (
    <div className="ctnForm">
      <Card variant="outlined" className="cardCtn">
        <h1 className="formHeader">Formulario</h1>
        <form onSubmit={submitHandler} className="form-data">
          <Stack spacing={3} direction="column">
            <TextField
              required
              id="outlined-required"
              label="Nombre"
              value={name}
              onChange={handleName}
            />
            <TextField
              required
              id="outlined-required"
              label="Apellido"
              value={lastName}
              onChange={handleLastName}
            />
            <TextField
              type="password"
              required
              id="outlined-required"
              label="Contraseña"
              value={password}
              onChange={handlePassword}
            />
          </Stack>
          <div className="ctnSelect">
            <Stack spacing={3} direction="row">
              <TextField
                id="outlined-select-region"
                select
                label="Region"
                value={region}
                onChange={handleRegion}
              >
                {regions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-country"
                select
                label="Country"
                value={country}
                onChange={handleCountry}
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </div>

          <Stack spacing={3} direction="row" className="ctnBtn">
            <Button type="submit" variant="contained">
              GUARDAR
            </Button>
            <Button variant="text">CANCELAR</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default Form;
