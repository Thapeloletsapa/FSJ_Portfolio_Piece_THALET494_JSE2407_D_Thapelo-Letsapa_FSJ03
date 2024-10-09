// pages/api/products/[page].js
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, limit, startAfter, where } from 'firebase/firestore';
import Fuse from 'fuse.js';

const productsPerPage = 10;

export default async function handler(req, res) {
    const { page = 0, title, category, sort } = req.query;

    const productsRef = collection(db, 'products');
    let productsQuery = query(productsRef, limit(productsPerPage));

    if (category) {
        productsQuery = query(productsRef, where('category', '==', category), limit(productsPerPage));
    }

    const productsSnapshot = await getDocs(productsQuery);
    let products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Searching functionality
    if (title) {
        const fuse = new Fuse(products, {
            keys: ['title'],
            threshold: 0.3
        });
        products = fuse.search(title).map(result => result.item);
    }

    // Sorting functionality
    if (sort) {
        products.sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
    }

    // Pagination handling
    const startAtIndex = page * productsPerPage;
    const paginatedProducts = products.slice(startAtIndex, startAtIndex + productsPerPage);

    res.status(200).json(paginatedProducts);
}
