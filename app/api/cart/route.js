import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongodb';

// For now, use a single cart for demonstration (no user/session logic)
const CART_COLLECTION = 'cart';

export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection(CART_COLLECTION).find({}).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const db = await connectToDatabase();
  const item = await request.json();
  const existing = await db.collection(CART_COLLECTION).findOne({ id: item.id });
  if (existing) {
    await db.collection(CART_COLLECTION).updateOne(
      { id: item.id },
      { $inc: { quantity: item.quantity || 1 } }
    );
  } else {
    await db.collection(CART_COLLECTION).insertOne({ ...item, quantity: item.quantity || 1 });
  }
  const items = await db.collection(CART_COLLECTION).find({}).toArray();
  return NextResponse.json(items);
}

export async function PATCH(request) {
  const db = await connectToDatabase();
  const { id, quantity } = await request.json();
  await db.collection(CART_COLLECTION).updateOne(
    { id },
    { $set: { quantity: Math.max(1, quantity) } }
  );
  const items = await db.collection(CART_COLLECTION).find({}).toArray();
  return NextResponse.json(items);
}

export async function DELETE(request) {
  const db = await connectToDatabase();
  const { id } = await request.json();
  await db.collection(CART_COLLECTION).deleteOne({ id });
  const items = await db.collection(CART_COLLECTION).find({}).toArray();
  return NextResponse.json(items);
} 