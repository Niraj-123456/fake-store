import clientPromise from "@next/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  try {
    const db = client.db("fake-store");
    const collection = db.collection("products");
    const cursor = collection.find().limit(5);
    const products = await cursor.toArray();
    return Response.json({ data: products });
  } catch (ex) {
    return Response.json({ error: "Something went wrong" });
  }
}
