// src/app/api/products/[id]/route.js
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(productSnap.data()), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error fetching product", { status: 500 });
  }
}
