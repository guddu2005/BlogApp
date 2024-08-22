const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URL } = require("../env");
const { BLOG_DB, AUTHORS_COL, BLOGS_COL } = require("../constant");



const readAllAuthor = async (req, res) => {
    const client = new MongoClient(MONGO_URL);

    try {
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(AUTHORS_COL);
        const cursor = Blog.find({});
        const result = await cursor.toArray();
        res.status(200).json(result).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
}


const postauthor = async (req, res) => {

    const { body } = req;
    const { name } = body;
    if (!(author)) {
        res.status(400).send('!OK');
    }
    const client = new MongoClient(MONGO_URL);
    try {
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(AUTHORS_COL);
        const result = await Blog.insertOne({ name});
        console.log(`inserted ${{ author}} inot blogs , with _id ${result.insertedId}`);
        res.status(201).json({ _id: result.insertedId }).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

}
module.exports = {
    postauthor,
    readAllAuthor
}
