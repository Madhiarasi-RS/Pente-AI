import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
  }

  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email });

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
