import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:0izndCAkQc7254tD@cluster0.i2pejum.mongodb.net/dastshafa"
  );

  const db = client.db();
  const articles = await db.collection("Article").find().toArray();

  client.close();

  res.json(articles);
}

export default handler;
