import { useState } from "react";
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

function index() {
  const [todos, setTodos] = useState<string[]>(["Hiii", "Hello"]);
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditIndex(-1);
    setNewTodo("");
  };

  const handleAddOrEditTodo = () => {
    if(editIndex !== -1) {
      const todosCopy = [...todos];
      todosCopy[editIndex] = newTodo;
      setTodos(todosCopy);
    }else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo("");
    handleClose();
  };

  return (
    <div className="container"  style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }} >
      <Grid container spacing={2}>
        {todos.map((todo, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} >
            <Card>
              <CardContent onClick={() => {
                setEditIndex(index);
                setOpen(true);
                setNewTodo(todo);
              }} >{todo}</CardContent>
              <Button onClick={() => setTodos(todos.filter((_, i) => i !== index))}>Delete</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
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
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
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
