import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongodb';
import { getCurrentUser } from '@/app/utils/auth';

const ORDERS_COLLECTION = 'orders';

export async function GET(req) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Only admins can view all orders
    if (user.role !== 1) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const db = await connectToDatabase();
    const orders = await db.collection(ORDERS_COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const orderData = await req.json();
    
    const order = {
      ...orderData,
      userId: user.id.toString(),
      userEmail: user.email,
      userName: user.name,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection(ORDERS_COLLECTION).insertOne(order);
    
    return NextResponse.json({ 
      success: true, 
      orderId: result.insertedId,
      order: { ...order, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 