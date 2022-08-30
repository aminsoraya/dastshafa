import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://admin:0izndCAkQc7254tD@cluster0.i2pejum.mongodb.net/dastshafa"
    );

    let { term } = req.body;

    const db = client.db();
    const products = await db
      .collection("Plants")
      .find({ title: { $regex: `${term}` } })
      .toArray();

    client.close();

    res.json({ products, notFound: products.length == 0 });
  }
}

export default handler;
