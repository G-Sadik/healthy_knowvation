import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Database connected successfully!' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}
