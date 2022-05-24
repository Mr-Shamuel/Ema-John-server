const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9v7jf.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 4000;

// pass = emajohnuser121;
app.get('/', (req, res) =>
{
    res.send("connected!!!")
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const ProductsCollection = client.db("emaJohn").collection("products");
  const OrderCollection = client.db("emaJohn").collection("order");
 
 

  app.post('/addOrder',(req, res)=>{
      const orders = req.body;
      OrderCollection.insertOne(orders)
      .then(result=>{
          res.send(result.insertedCount>0)
      })
  })




 

    app.post('/addproducts',(req,res) => {
      const product = req.body;

 
    ProductsCollection.insertOne(product)
    .then(result => {
       
        // res.send(result.insertedCount);
        res.send(result.insertedCount);
       console.log("done");
        
    })
  })

//all products
  app.get('/addproducts',(req, res)=>{
      ProductsCollection.find({})
    .toArray((err,document)=>{
        res.send(document)
    })

  })

  //single products

  app.get('/addproduct/:key',(req, res)=>{
    ProductsCollection.find({key:req.params.key})
  .toArray((err,document)=>{
      res.send(document[0])
  })

})
//multiple products

app.post('/productsByKeys',(req, res)=>{
    const productKeys = req.body;
    ProductsCollection.find({key: {$in:productKeys}})
    .toArray((err,document)=>{
        res.send(document)
    })
})





});


app.listen(port)