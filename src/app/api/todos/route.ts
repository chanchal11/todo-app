import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/config/db';
import Todo from '@/models/todo';

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await Todo.find({});
        res.status(200).json({ success: true, data: todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const todo = await Todo.findByIdAndUpdate(req.body._id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!todo) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedTodo = await Todo.deleteOne({ _id: req.body._id });
        if (!deletedTodo) {
          return res.status(404).json({ success: false });
        }
        res.status(204).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
