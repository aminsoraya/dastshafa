import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://admin:0izndCAkQc7254tD@cluster0.i2pejum.mongodb.net/dastshafa"
    );

    const db = client.db();
    const productsCollection = await db.collection("Plants").find().toArray();

    client.close();

    res.json(productsCollection);
  }
}

export default handler;
