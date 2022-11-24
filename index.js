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

async function run() {
    try {
        // app.get("/products", (req, res) => {
        //     res.send(product);
        // });
        app.post("/products", async(req, res)=> {
            const product = req.body;
            const result = await productCollection.insertOne(product)
            res.send(result);
        })
    }
    finally { }
}
run().catch(err => console.log(err))

app.listen(port, () => console.log(`your app is running at ${port}`));