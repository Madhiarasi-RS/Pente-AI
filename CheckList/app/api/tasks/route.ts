import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { Task, TaskFilters } from '@/lib/types';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions); // ✅ pass authOptions
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'Open' | 'In Progress' | 'Done' | null;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db('checklist-app');
    const tasksCollection = db.collection<Task>('tasks');

    const filter: any = { userId: session.user.id };
    if (status) {
      filter.status = status;
    }

    const [tasks, totalCount] = await Promise.all([
      tasksCollection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      tasksCollection.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      tasks,
      totalCount,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, status = 'Open' } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('checklist-app');
    const tasksCollection = db.collection<Task>('tasks');

    const newTask: Omit<Task, '_id'> = {
      title,
      description: description || '',
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: session.user.id,
    };

    const result = await tasksCollection.insertOne(newTask);
    const createdTask = await tasksCollection.findOne({ _id: result.insertedId });

    return NextResponse.json(createdTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

