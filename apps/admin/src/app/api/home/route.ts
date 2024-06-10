import clientPromise from "@next/lib/mongodb";

const banners = [
  { src: "/images/banner/banner-1.jpg", alt: "banner1" },
  { src: "/images/banner/banner-2.jpg", alt: "banner2" },
  { src: "/images/banner/banner-3.jpg", alt: "banner3" },
  { src: "/images/banner/banner-4.jpg", alt: "banner4" },
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("fake-store");
    const collection = db.collection("products");
    const collection2 = db.collection("categories");
    const cursor = collection.find().limit(5);
    const cursor2 = collection2.find().limit(5);
    const products = await cursor.toArray();
    const categories = await cursor2.toArray();
    console.log("products", products);
    return Response.json(
      {
        banners: banners,
        recommended: products,
        categories: categories,
        newArrivals: products,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
