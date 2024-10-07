// pages/api/products/categories.js
import { db } from '../../lib/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
    const categoriesRef = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesRef);
    const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(categories);
}
