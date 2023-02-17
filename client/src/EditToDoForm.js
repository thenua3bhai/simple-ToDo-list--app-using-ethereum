import { Box, Button, TextField } from "@mui/material";
import React from "react";
import useInputState from "./hooks/useInputState";
import createToDoAppInstance from "./toDoContract";
import web3 from "./web3";

function EditToDoForm(props) {
  const [valuee, updateValuee] = useInputState(props.todo.task);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const instance = await createToDoAppInstance();
    const accounts = await web3.eth.getAccounts();

    await instance.methods
      .editToDo(props.todo.id, valuee)
      .send({ from: accounts[0] });

    props.toggleRun();

    props.toggleEditForm();
  };
  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{ marginLeft: "1rem", width: "80%" }}
      >
        <TextField
          autoFocus
          type="text"
          variant="standard"
          placeholder="Edit now"
          value={valuee}
          onChange={updateValuee}
        ></TextField>
        <Button onClick={handleSubmit}>Change</Button>
      </Box>
    </div>
  );
}

export default EditToDoForm;
