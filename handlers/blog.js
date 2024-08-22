// let blogs = [];
const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URL } = require("../env");
const { BLOG_DB, AUTHORS_COL, BLOGS_COL } = require("../constant");



const resdAllBlog = async (req, res) => {
    const client = new MongoClient(MONGO_URL);

    try {
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
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
const getblog = async (req, res) => {
    let { blogId } = req.params;
    console.log(blogId);
    const client = new MongoClient(MONGO_URL);

    try {
        // await client.connect();
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
        const result = await Blog.findOne({ _id: blogId })
        res.status(200).json(result).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

};


const postblog = async (req, res) => {

    const { body } = req;
    const { author, content } = body;
    if (!(author && content)) {
        res.status(400).send('!OK');
    }
    const client = new MongoClient(MONGO_URL);
    try {
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
        const result = await Blog.insertOne({ author, content });
        console.log(`inserted ${{ author, content }} inot blogs , with _id ${result.insertedId}`);
        res.status(201).json({ _id: result.insertedId }).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

}


const updateBlog = async (req, res) => {
    const { author, content } = req.body;
    let { blogId } = req.params;
    const client = new MongoClient(MONGO_URL);
    // if (!(author && content)) {
        // res.status(400).send('!OK');
    // }

    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
        const result = await Blog.findOneAndUpdate({ _id: blogId }, { $set: { author, content } }, { returnDocument: "after" });
        res.status(200).json({ result, msg: "success" }).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

}

const patchBlog = async (req, res) => {
    const { author, content } = req.body;
    let { blogId } = req.params;
    const client = new MongoClient(MONGO_URL);
    // if (!(author && content)) {
        // res.status(400).send('!OK');

    // }
    const updateDoc = {};
    if (author) updateDoc.author = author;
    if (content) updateDoc.content = content;
    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
        const result = await Blog.findOneAndUpdate({ _id: blogId }, { $set: updateDoc }, { returnDocument: "after" });
        res.status(200).json({ result, msg: "success" }).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }

}


const deletblog = async (req, res) => {
    let { blogId } = req.params;
    console.log(blogId);
    const client = new MongoClient(MONGO_URL);

    try {
        blogId = new ObjectId(blogId)  
        const blogDb = client.db(BLOG_DB);
        const Blog = blogDb.collection(BLOGS_COL);
        const result = await Blog.deleteOne({ _id: blogId })
        res.status(200).json({ result, msg: "success" }).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
    return res.status(404).send();
};


module.exports = {
    resdAllBlog,
    getblog,
    postblog,
    updateBlog,
    patchBlog,
    deletblog
}