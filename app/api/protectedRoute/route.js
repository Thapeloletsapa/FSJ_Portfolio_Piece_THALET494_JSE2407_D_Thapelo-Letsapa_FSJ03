// app/api/protectedRoute/route.js
import { NextResponse } from 'next/server';
import { verifyIdToken } from '../../lib/firebaseAdmin';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader ? authHeader.split('Bearer ')[1] : null;

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Authorization header is missing or invalid' }, { status: 400 });
  }
  
  try {
    const decodedToken = await verifyIdToken(token);
    return NextResponse.json({ message: 'Authorized', uid: decodedToken.uid });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
