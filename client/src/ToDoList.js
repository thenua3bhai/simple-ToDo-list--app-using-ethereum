import React from "react";
import { List, Paper, Divider, ListItem } from "@mui/material";
import ToDo from "./ToDo";

function ToDoList(props) {
  if (props.todos.length) {
    return (
      <Paper>
        <List>
          {props.todos.map((todo, index) => {
            return (
              <div key={todo.id}>
                <ListItem>
                  <ToDo todo={todo} toggleRun={props.toggleRun} />
                </ListItem>
                {index < props.todos.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : null}
              </div>
            );
          })}
        </List>
      </Paper>
    );
  }
  return null;
}

export default ToDoList;
