import clientPromise from "@next/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("fake-store");
    const collection = db.collection("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    return Response.json({
      success: true,
      data: product,
    });
  } catch (ex) {
    return Response.json({ error: "Something went wrong" });
  }
}
