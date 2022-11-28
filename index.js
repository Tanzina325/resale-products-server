const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.awzu7rd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
const mobileCollection = client.db('reusedMobile').collection('mobilePhones');
const userCollection = client.db('reusedMobile').collection('users');
const addProductCollection = client.db('reusedMobile').collection('addProducts');
app.get('/phones',async(req,res)=>{
  const query = {}
  const cursor =mobileCollection.find(query);
  const phones = await cursor.toArray();
  res.send(phones);
  console.log(phones)
  
})
app.get('/users',async(req,res)=>{
  const query = {}
  const cursor =userCollection.find(query);
  const users = await cursor.toArray();
  res.send(users);
  
})

app.get('/phones/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const phone = await mobileCollection.findOne(query);
  console.log(phone)
  res.send(phone)
  
})
app.get('/users',async(req,res)=>{
  const role = req.query.role;
  console.log(role)
  const query = {role:role}
  const user = await userCollection.find(query).toArray();
  console.log(user);
  res.send(user);
  
})
app.post('/users',async(req,res)=>{
  const user = req.body;
  const result =await userCollection.insertOne(user);
  res.send(result)
})
app.post('/addProducts',async(req,res)=>{
  const product = req.body;
  const result =await addProductCollection.insertOne(product);
  res.send(result)
})
app.get('/addProducts',async(req,res)=>{
  const query = {}
  const cursor =addProductCollection.find(query);
  const products = await cursor.toArray();
  res.send(products);
  
})
app.get('/addProducts',async(req,res)=>{
  const email = req.query.email;
  
  const query = {email:email}
  const product = await addProductCollection.find(query).toArray();
  
  res.send(product);
  
})



  
  }


finally{

}
}
run().catch(err=>console.error(err));





app.get('/',(req,res)=>{
    res.send('reused mobile phones is here')
})

app.listen(port,()=>{
    console.log(`reused sale is here on ${port}`)
})