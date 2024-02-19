import { connect } from '@/config/db';
import Todo from '@/models/todo';
import { getUserId } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

connect();


export async function GET(req: NextRequest) {
    try {
        const todos = await Todo.find({createdBy: await getUserId(req)});
        return NextResponse.json({ success: true, data: todos }, { status: 200 });
      } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
      }  
}



export async function POST(req: NextRequest) {
    try {
        const { title, description = '' } = await req.json(); 
        const userId = await getUserId(req);
        console.log({userId});
        const todo = new Todo({title, description, createdBy: userId});
        await todo.save();
        return NextResponse.json({ success: true, data: todo }, { status: 201 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 400 });
      }  
}

export async function PUT(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { createdBy } =  await Todo.findById(reqBody._id);
        if (createdBy.toString() !== await getUserId(req)) {
          throw new Error('Unauthorized');
        }
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
        const userId = await getUserId(req);
        const deletedTodo = await Todo.deleteOne({ _id, createdBy: userId });
        if (!deletedTodo) {
          return NextResponse.json({ success: false }, {status: 404});
        }
        return NextResponse.json({ success: true, data: {} }, { status: 202 });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 400 });
      }
}
