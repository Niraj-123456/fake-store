import clientPromise from "@next/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") || 1;
  const limit = searchParams.get("limit") || 20;
  try {
    const client = await clientPromise;
    const db = client.db("fake-store");
    const collection = db.collection("products");
    const cursor = collection.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [
            { $skip: (Number(offset) - 1) * Number(limit) },
            { $limit: Number(limit) },
          ],
        },
      },
    ]);
    const products = await cursor.toArray();
    return Response.json({
      success: true,
      data: {
        metadata: {
          totalCount: products[0].metadata[0].totalCount,
          offset,
          limit,
        },
        data: products[0].data,
      },
    });
  } catch (ex) {
    console.log("ex", ex);
    return Response.json({ error: "Something went wrong" });
  }
}
