import React from "react";
import useInputState from "./hooks/useInputState";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, TextField } from "@mui/material";

import createToDoAppInstance from "./toDoContract";
import web3 from "./web3";

function ToDoForm(props) {
  const [valuee, updateValuee, reset] = useInputState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const instance = await createToDoAppInstance();
    const accounts = await web3.eth.getAccounts();

    await instance.methods
      .addToDo(uuidv4(), valuee)
      .send({ from: accounts[0] });
    props.toggleRun();
    reset();
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{ padding: "0 1rem", margin: "1rem 0" }}
      >
        {" "}
        <TextField
          fullWidth
          variant="standard"
          label="Add To Do"
          value={valuee}
          onChange={updateValuee}
          style={{ marginLeft: "20px", marginRight: "20px" }}
          margin="normal"
        ></TextField>
        <Button
          varient="outlined"
          onClick={handleSubmit}
          style={{
            color: "white",
            backgroundColor: "green",
            marginLeft: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default ToDoForm;
