import clientPromise from "@next/lib/mongodb";
import { ObjectId } from "mongodb";

const categoryIdMap = {
  1: "660aa089151bd181f32539fa",
  2: "660aa089151bd181f32539fb",
  3: "660aa089151bd181f32539fc",
  4: "660aa089151bd181f32539fd",
  5: "660aa089151bd181f32539fe",
};

const products = [
  {
    id: 6,
    title: "new Title",
    price: 25,
    description:
      "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.",
    images: [
      "https://i.imgur.com/ZKGofuB.jpeg",
      "https://i.imgur.com/GJi73H0.jpeg",
      "https://i.imgur.com/633Fqrz.jpeg",
    ],
    creationAt: "2024-04-01T10:58:37.000Z",
    updatedAt: "2024-04-01T21:47:34.000Z",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://i.imgur.com/QkIa5tT.jpeg",
      creationAt: "2024-04-01T10:58:37.000Z",
      updatedAt: "2024-04-01T10:58:37.000Z",
    },
  },
];

// const modifiedProducts = products.map((product) => {
//   //@ts-ignore
//   const categoryId = categoryIdMap[product.category.id];
//   return {
//     ...product,
//     category: {
//       ...product.category,
//       id: categoryId || product.category.id,
//     },
//   };
// });

// console.log("modified products: ", modifiedProducts);

export function GET() {
  return Response.json({ message: "Ok!" });
}

// export async function POST() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("fake-store");
//     const productCollection = db.collection("products");
//     const res = await productCollection.insertMany(modifiedProducts);
//     return Response.json({ data: res });
//   } catch (ex) {
//     console.log("ex", ex);
//     return Response.json({ error: "Something went wrong" });
//   }
// }
