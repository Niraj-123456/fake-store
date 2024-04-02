import clientPromise from "@next/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const collection = client.db("fake-store").collection("categories");
    const categories = await collection.find().toArray();
    return Response.json({ data: categories });
  } catch (err) {
    return Response.json({ error: "Something went wrong" });
  }
}
