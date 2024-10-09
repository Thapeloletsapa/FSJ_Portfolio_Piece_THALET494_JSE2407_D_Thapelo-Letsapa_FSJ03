// pages/api/products/[id].js
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
    const { id } = req.query;
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ id: productSnap.id, ...productSnap.data() });
}
