
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState({ isEditing: false,  text: "" });

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditing({ isEditing: true, id: todo.id, text: todo.text });
  };

  const updateTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editing.id ? { ...todo, text: editing.text } : todo
      )
    );
    setEditing({ isEditing: false,  text: "" });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My Todo Lists</Typography>
        </Toolbar>
      </AppBar>

      <div className="container">
        <TextField
          label="Add Todos"
          fullWidth //width of the box 
          value={newTodo} // on box add todos text
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          variant="contained" // (add todo box)
          color="primary" // colour of add todobox
          className="add-button"
          onClick={addTodo}
        >
          Add todos
        </Button>

        <List className="todo-list">
          {todos.map((todo) => (
            <ListItem key={todo.id} divider>
              <ListItemText primary={todo.text} />
              <IconButton color="primary" onClick={() => startEditing(todo)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => deleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Dialog
          open={editing.isEditing}
          onClose={() => setEditing({ isEditing: false, id: null, text: "" })}
        >
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <TextField
              value={editing.text}
              onChange={(e) => setEditing({ ...editing, text: e.target.value })}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEditing({ isEditing: false,  text: "" })}
              color="error"
            >
              Cancel❌
            </Button>
            <Button onClick={updateTodo} color="success">
              Save✔
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default App;
