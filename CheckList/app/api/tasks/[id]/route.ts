import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { Task } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taskId = params.id;

    if (!ObjectId.isValid(taskId)) {
      return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, status } = body;

    if (!title && !description && !status) {
      return NextResponse.json({ error: 'No update fields provided' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('checklist-app');
    const tasksCollection = db.collection('tasks');

    const updateResult = await tasksCollection.updateOne(
      {
        _id: new ObjectId(taskId),
        userId: session.user.id
      },
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(status && { status }),
          updatedAt: new Date(),
        }
      }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: 'Task not found or not authorized' }, { status: 404 });
    }

    const updatedTask = await tasksCollection.findOne({
      _id: new ObjectId(taskId)
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('checklist-app');
    const tasksCollection = db.collection('tasks');

    const result = await tasksCollection.deleteOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Task not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
