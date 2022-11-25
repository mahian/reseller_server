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

        app.post("/users", async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result);
        })
    }
    finally { }
}
run().catch(err => console.log(err))

app.listen(port, () => console.log(`your app is running at ${port}`));