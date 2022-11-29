const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://mahian:${process.env.MONGODB_PASS}@cluster0.zft8w2s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const productCollection = client.db('reseller').collection('products');
const usersCollection = client.db('reseller').collection('users');
const categoriesCollection = client.db('reseller').collection('categories');
const orderedCollection = client.db('reseller').collection('orders');

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

        // get specific product
        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const product = await productCollection.findOne(query);
            res.send(product);
        })

        // get sellers product
        app.get("/myProducts", async (req, res) => {
            const email = req.query.email;
            const query = {email: email}
            const product = await productCollection.find(query).toArray();
            res.send(product);
        })

        // get category wise product
        app.get("/category/:id", async (req, res) => {
            const id = req.params.id;
            const query = {category: id};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })

        // delete product
        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const product = await productCollection.deleteOne(query);
            res.send(product);
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

        // get all user
        app.get("/users", async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })

        // get one specific user
        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await usersCollection.findOne(query);
            res.send(user);
        })

        // delete one user
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        });
    
        // get user
        app.get("/buyers", async (req, res) => {
            const query = {role: "user"};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })

        // get seller
        app.get("/sellers", async (req, res) => {
            const query = {role: "seller"};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        })

        // get admin
        app.get("/admin/:email", async (req, res) => {
            const email = req.params.email;
            const query = {email};
            const user = await usersCollection.findOne(query);
            res.send({isAdmin: user?.role === "admin"});
        })

        // get specific seller
        app.get("/sellers/:email", async (req, res) => {
            const email = req.params.email;
            const query = {email};
            const user = await usersCollection.findOne(query);
            res.send({isSeller: user?.role === "seller"});
        })

        // get categories
        app.get("/categories", async(req, res)=>{
            const query = {}
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })

        // post order
        app.post("/order", async (req, res) => {
            const order = req.body;
            const result = await orderedCollection.insertOne(order);
            res.send(result);
        })

        // get order
        app.get("/orders", async (req, res) => {
            const query = {};
            const orders = await orderedCollection.find(query).toArray();
            res.send(orders);
        })

        // get booked order
        app.get("/bookedOrders", async (req, res) => {
            const email = req.query.email;
            const query = {email: email};
            const orders = await orderedCollection.find(query).toArray();
            res.send(orders);
        })
    }
    finally {}
}
run().catch(err => console.log(err))

app.get('/', (req, res)=> {
    res.send('hellow world');
})

app.listen(port, () => console.log(`your app is running at ${port}`));