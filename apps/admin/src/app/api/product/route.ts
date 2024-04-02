import clientPromise from "@next/lib/mongodb";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("fake-store");
    const productCollection = db.collection("products");
    const res = await productCollection.insertOne({ ...body });
    return Response.json({ success: true, data: res });
  } catch (ex) {
    return Response.json({ message: "Something went wrong" });
  }
}
