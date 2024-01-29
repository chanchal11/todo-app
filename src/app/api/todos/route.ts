import { connect } from '@/config/db';
import Todo from '@/models/todo';
import { NextRequest, NextResponse } from 'next/server';

connect();


export async function GET(req: NextRequest) {
    try {
        const todos = await Todo.find({});
        return NextResponse.json({ success: true, data: todos }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
      }  
}



export async function POST(req: NextRequest) {
    try {
        const { title, description = '' } = await req.json(); 
        const todo = new Todo({title, description});
        await todo.save();
        return NextResponse.json({ success: true, data: todo }, { status: 201 });
      } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
      }  
}

export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const todo = await Todo.findByIdAndUpdate(reqBody._id, reqBody, {
          new: true,
          runValidators: true,
        });
        if (!todo) {
          return NextResponse.json({ success: false }, {status: 404});
        }
        return NextResponse.json({ success: true, data: todo }, { status: 202 });
      } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
      }
}

export async function DELETE(req: NextRequest) {
    try {
        const { _id} = await req.json();
        const deletedTodo = await Todo.deleteOne({ _id });
        if (!deletedTodo) {
          return NextResponse.json({ success: false }, {status: 404});
        }
        return NextResponse.json({ success: true, data: {} }, { status: 202 });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 400 });
      }
}

