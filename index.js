const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const product = require('./product.json');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors())


const uri = "mongodb+srv://mahian:ExiP934rnJVB4VIe@cluster0.zft8w2s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const productCollection = client.db('reseller').collection('products');
const usersCollection = client.db('reseller').collection('users');
const categoriesCollection = client.db('reseller').collection('categories');

async function run() {
    try {
        // post product
        app.post("/products", async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product)
            res.send(result);
        })
        // get products
        app.get("/products", async (req, res) => {
            const query = {}
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })
        // get limited products
        app.get("/limitedProducts", async (req, res) => {
            const query = {}
            const products = await productCollection.find(query).limit(3).toArray();
            res.send(products);
        })
        // post user
        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result);
        })
        // get user
        app.get("/users", async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })
        // get categories
        app.get("/categories", async(req, res)=>{
            const query = {}
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })
    }
    finally { }
}
run().catch(err => console.log(err))

app.listen(port, () => console.log(`your app is running at ${port}`));