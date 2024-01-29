"use client";
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Fab,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import '../globals.css';
import axios from "axios";

interface ITodo {
  _id?: string;
  title?: string;
}

function index() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({title: ''} as ITodo);
  const [editIndex, setEditIndex] = useState(-1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(-1);
    setNewTodo({title: ''});
  };

  useEffect(()=>{
    axios.get('/api/todos').then((response) => {
      setTodos(response.data.data);
      console.log(response.data.data);
    })
  }, []);

  const handleAddOrEditTodo = () => {
    if (editIndex !== -1) {
      const todosCopy = [...todos];
      axios.put('/api/todos', newTodo).then((response) => {
        todosCopy[editIndex] = {...newTodo};
        setTodos(todosCopy);
      });
    } else {
      axios.post('/api/todos', newTodo).then((response) => {
        setTodos([...todos, newTodo]);   
      })
    }
    setNewTodo({title: ''});
    handleClose();
  };

  return (
    <div className="container" style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }} >
      <Grid container spacing={2}>
        {todos.map((todo, index) => (
          <Grid item key={todo._id} xs={12} sm={6} md={4} >
            <Card>
              <CardContent onClick={() => {
                setEditIndex(index);
                setOpen(true);
                setNewTodo(todo);
              }} ><h2>{todo.title}</h2></CardContent>
              <Button onClick={() => {
                axios.delete('/api/todos', {data: {_id: todo._id}}).then((response) => {
                  setTodos(todos.filter((_, i) => i !== index));
                })
              }}>Delete</Button>
            </Card>
          </Grid>
        ))}
        {todos.length == 0 && <Card style={{ padding: "20px", marginLeft: 'auto', marginRight: 'auto', marginTop: '30vh' }} ><h1>No todos. Please click on the add button to add a todo</h1></Card>}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose} >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="new-todo"
            label={editIndex !== -1 ? "Edit Todo" : "Add Todo"}
            type="text"
            fullWidth
            variant="standard"
            value={newTodo.title}
            onChange={(e) => setNewTodo(((prevData) => ({...prevData, title: e.target.value})))}
          />
          <Button onClick={handleAddOrEditTodo} color="primary">
            {editIndex !== -1 ? "Save" : "Add"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default index;
