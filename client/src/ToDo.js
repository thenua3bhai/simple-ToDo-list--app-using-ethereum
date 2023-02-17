import { Button, Checkbox, ListItemSecondaryAction } from "@mui/material";
import React, { useEffect } from "react";
import EditToDoForm from "./EditToDoForm";
import useToggle from "./hooks/useToggle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { flexbox } from "@mui/system";
import createToDoAppInstance from "./toDoContract";
import web3 from "./web3";

function ToDo(props) {
  const [state, toggle] = useToggle(false);
  const removeToDo = async () => {
    const instance = await createToDoAppInstance();
    const accounts = await web3.eth.getAccounts();

    await instance.methods
      .deleteToDo(props.todo.id)
      .send({ from: accounts[0] });
    props.toggleRun();
  };

  return (
    <div>
      {state ? (
        <EditToDoForm
          todo={props.todo}
          editToDo={props.editToDo}
          toggleEditForm={toggle}
          toggleRun={props.toggleRun}
        />
      ) : (
        <>
          <Checkbox
            tabIndex={-1}
            checked={props.todo.completed}
            onChange={async () => {
              const instance = await createToDoAppInstance();
              const accounts = await web3.eth.getAccounts();
              await instance.methods
                .updateCompletion(props.todo.id)
                .send({ from: accounts[0] });

              props.toggleRun();
            }}
          />
          <span
            style={{
              textDecoration: props.todo.completed ? "line-through" : "none",
              display: flexbox,
            }}
          >
            {props.todo.task}
          </span>
          <ListItemSecondaryAction>
            <Button onClick={toggle}>
              <EditIcon />
            </Button>
            <Button onClick={removeToDo} color="warning">
              <DeleteIcon />
            </Button>
          </ListItemSecondaryAction>
        </>
      )}
    </div>
  );
}

export default ToDo;
