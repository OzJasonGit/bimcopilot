import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongodb';
import { getCurrentUser } from '@/app/utils/auth';

const CART_COLLECTION = 'user_carts';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const items = await db.collection(CART_COLLECTION)
      .find({ userId: user.id.toString() })
      .toArray();
    
    console.log('Retrieved cart items for user:', user.id.toString(), 'Items:', items);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const item = await request.json();
    
    // Add userId to the item
    const cartItem = {
      ...item,
      userId: user.id.toString(),
      quantity: item.quantity || 1
    };

    const existing = await db.collection(CART_COLLECTION).findOne({ 
      id: item.id, 
      userId: user.id.toString() 
    });

    if (existing) {
      await db.collection(CART_COLLECTION).updateOne(
        { id: item.id, userId: user.id.toString() },
        { $inc: { quantity: item.quantity || 1 } }
      );
    } else {
      await db.collection(CART_COLLECTION).insertOne(cartItem);
    }

    const items = await db.collection(CART_COLLECTION)
      .find({ userId: user.id.toString() })
      .toArray();
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const { id, quantity } = await request.json();
    
    await db.collection(CART_COLLECTION).updateOne(
      { id, userId: user.id.toString() },
      { $set: { quantity: Math.max(1, quantity) } }
    );
    
    const items = await db.collection(CART_COLLECTION)
      .find({ userId: user.id.toString() })
      .toArray();
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const { id } = await request.json();
    
    console.log('Attempting to delete item with id:', id, 'for user:', user.id.toString());
    
    // Delete the item using the id field
    const deleteResult = await db.collection(CART_COLLECTION).deleteOne({ 
      id: id, 
      userId: user.id.toString() 
    });
    
    console.log('Delete result:', deleteResult);
    
    if (deleteResult.deletedCount === 0) {
      console.log('Item not found with id field, trying _id field...');
      // Try with _id field as fallback
      const alternativeDelete = await db.collection(CART_COLLECTION).deleteOne({ 
        _id: id, 
        userId: user.id.toString() 
      });
      
      if (alternativeDelete.deletedCount === 0) {
        return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
      }
    }
    
    const items = await db.collection(CART_COLLECTION)
      .find({ userId: user.id.toString() })
      .toArray();
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 