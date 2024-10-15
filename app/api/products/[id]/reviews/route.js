import { NextResponse } from 'next/server';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../lib/firebase'; // Firebase config

/**
 * POST handler to add a new review to a product.
 * @param {Request} request - Incoming request with review data.
 * @param {Object} params - URL parameters.
 * @param {string} params.id - The product ID.
 */
export async function POST(request, { params }) {
  const { id: productId } = params;

  try {
    const body = await request.json();
    const { rating, comment, date, reviewerEmail, reviewerName } = body;

    if (!rating || !comment || !reviewerEmail || !reviewerName) {
      return NextResponse.json(
        { error: 'All review fields are required.' },
        { status: 400 }
      );
    }

    const productDocRef = doc(db, 'products', productId);

    // Update product with the new review (using Firestore's arrayUnion)
    await updateDoc(productDocRef, {
      reviews: arrayUnion({
        rating,
        comment,
        date: new Date(date).toISOString(),
        reviewerEmail,
        reviewerName,
      }),
    });

    return NextResponse.json({ message: 'Review added successfully.' });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
