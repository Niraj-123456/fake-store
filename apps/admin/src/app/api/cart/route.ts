import clientPromise from "@next/lib/mongodb";

export async function POST(req: Request, res: Response) {
  try {
    const client = await clientPromise;
    const db = client.db("fake-store");
    const collection = db.collection("cart");
    const body = await req.json();
    const res = await collection.insertOne({
      userId: "123456789",
      creationAt: new Date().toISOString(),
      ...body,
    });
    return Response.json({ data: res });
  } catch (err) {
    return Response.json({ error: "Something went wrong" });
  }
}
