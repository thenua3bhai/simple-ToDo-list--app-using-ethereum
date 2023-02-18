import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import NavBar from "./NavBar";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { Grid } from "@mui/material";

import createToDoAppInstance from "./toDoContract";
import { useState } from "react";

function ToDoApp() {
  const [toDos, setToDos] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(false);
  useEffect(() => {
    async function getToDo() {
      const instance = await createToDoAppInstance();
      const toDoId = await instance.methods.getToDoIds().call();
      let t = [];
      for (let i = 0; i < toDoId.length; i++) {
        const toDoTask = await instance.methods.toDoList(toDoId[i]).call();
        t = [...t, { id: toDoId[i], ...toDoTask }];
      }
      setToDos(t);
    }
    getToDo();
  }, [runUseEffect]);
  const toggleRun = () => {
    setRunUseEffect(!runUseEffect);
  };

  return (
    <Paper style={{ margin: "0", padding: "1rem", height: "100vh" }}>
      {" "}
      <NavBar />
      <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
        <Grid item xs={12} md={7} lg={7}>
          <ToDoForm toggleRun={toggleRun} />{" "}
          <ToDoList todos={toDos} toggleRun={toggleRun} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ToDoApp;
