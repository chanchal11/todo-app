import mongoose from "mongoose";

interface ITodo {
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    required: false,
    default: false
  },
  dueDate: {
    type: Date
  },
}, {
  timestamps: true
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
