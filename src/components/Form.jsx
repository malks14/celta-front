import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Form = () => {
  const [region, setRegion] = useState([]);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([]);
  const [name, setName] = useState("");
  const [lName, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      const {
        data: { data },
      } = await axios.get("http://localhost:3000/api/regions");
      let arr = [];
      let arrCountries = []
      for (let name in data) {
        let value = data[name];
        arrCountries.push(value)
        let getKey = value["region"];
        arr.push(getKey);
        let arrKey = [...new Set(arr)];
        setRegions(arrKey);
        setCountries(arrCountries)
      }
    };
    fetchRegions();
  }, []);
  const handleRegion = (event) => {
    setRegion(event.target.value);
    localStorage.setItem("region", JSON.stringify(event.target.value))
  };
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleLastName = (event) => {
    setLname(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const postData = await axios.post(
      "http://localhost:3000/users/add-user",
      { name, lName, password, region, country },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setMessage(postData);
    cleanForm();
  };
  const cleanForm = () => {
    setName("");
    setLname("");
    setPassword("");
    setRegion("");
    setCountry("");
  };
  return (
    <div className="ctnForm">
      <Card variant="outlined" className="cardCtn">
        <h1 className="formHeader">Formulario</h1>
        <form onSubmit={submitHandler} className="form-data">
          <Stack spacing={3} direction="column">
            <TextField
              required
              id="outlined-required-name"
              label="Nombre"
              name="name"
              value={name}
              onChange={handleName}
            />
            <TextField
              required
              id="outlined-required-lName"
              name="lName"
              label="Apellido"
              value={lName}
              onChange={handleLastName}
            />
            <TextField
              type="password"
              required
              name="password"
              id="outlined-required-password"
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
                name="region"
                label="Region"
                value={region}
                className="select-btn"
                onChange={handleRegion}
              >
                {regions.map((option) => (
                  <MenuItem key={option} value={option} defaultValue={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-country"
                select
                label="Country"
                name="country"
                className="select-btn"
                value={country}
                onChange={handleCountry}
              >
                {countries.map((option) => {
                  if (option.region === region) {
                    return (
                      <MenuItem
                        key={option.country}
                        value={option.country}
                        defaultValue={option.country}
                      >
                        {option.country}
                      </MenuItem>
                    );
                  }
                })}
              </TextField>
            </Stack>
          </div>
          {message && <p>{message.data.msg}</p>}
          <Stack spacing={3} direction="row" className="ctnBtn">
            <Button type="submit" variant="contained">
              GUARDAR
            </Button>
            <Button onClick={cleanForm} variant="text">
              CANCELAR
            </Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default Form;
