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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
    handleClose();
  };

  return (
    <div className="container"  style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }} >
      <Grid container spacing={2}>
        {todos.map((todo, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>{todo}</CardContent>
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
            label="New Todo"
            type="text"
            fullWidth
            variant="standard"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button onClick={handleAddTodo} color="primary">
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default index;
