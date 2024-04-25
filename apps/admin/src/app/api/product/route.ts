import clientPromise from "@next/lib/mongodb";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { category, price, ...rest } = body;
  try {
    const client = await clientPromise;
    const db = client.db("fake-store");
    const productCollection = db.collection("products");
    const res = await productCollection.insertOne({
      category: JSON.parse(category),
      creationAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      price: parseInt(price),
      ...rest,
    });
    return Response.json({ success: true, data: res });
  } catch (ex) {
    return Response.json({ message: "Something went wrong" });
  }
}
