const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const product = require('./product.json');

app.get("/", (req, res)=> {
    res.send(product);
});

app.listen(port, ()=> console.log(`your app is running at ${port}`));