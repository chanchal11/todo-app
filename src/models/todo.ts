import mongoose from "mongoose";

interface ITodo {
  title: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
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
    default: false,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
}, {
  timestamps: true
});

const Todo = mongoose.models.todos || mongoose.model<ITodo>('todos', todoSchema);

export default Todo;
