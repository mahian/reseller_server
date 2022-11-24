const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const product = require('./product.json');
const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://mahian:ExiP934rnJVB4VIe@cluster0.zft8w2s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});


app.get("/products", (req, res)=> {
    res.send(product);
});

app.listen(port, ()=> console.log(`your app is running at ${port}`));