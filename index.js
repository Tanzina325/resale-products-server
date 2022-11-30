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

const categoryCollection = client.db('reusedMobile').collection('categories');
const productCollection = client.db('reusedMobile').collection('products');
const userCollection = client.db('reusedMobile').collection('users');
const bookingCollection = client.db('reusedMobile').collection('bookings');


app.get('/category',async(req,res)=>{
  const query = {}
  const cursor =categoryCollection.find(query);
  const category = await cursor.toArray();
  res.send(category);
  
})

app.get('/category/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const phone = await categoryCollection.findOne(query);
  console.log(phone)
  res.send(phone)
  
})
app.get('/products',async(req,res)=>{
  const category = req.query.category;
  
  const query = {category:category}
  const product = await productCollection.find(query).toArray();
  
  res.send(product);
  
})
app.post('/products',async(req,res)=>{
  const product = req.body;
  const result =await productCollection.insertOne(product);
  res.send(result)
})

app.get('/product',async(req,res)=>{
  const email = req.query.email;
  
  const query = {email:email}
  const product = await productCollection.find(query).toArray();
  
  res.send(product);
  
})
app.get('/produc',async(req,res)=>{
  const query = {}
  const cursor =productCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
  
})
app.delete('/products/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)};
  const product = await productCollection.deleteOne(query);
  
  res.send(product);
})

app.put('/products/:id',async(req,res)=>{
  const id =req.params.id;
  const filter={_id:ObjectId(id)};
  const options ={upsert:true};
  const updatedDoc ={
    $set: {
      status:'advertised'
    }
  }
  const result = await productCollection.updateOne(filter,updatedDoc,options);
  res.send(result)
})
app.post('/bookings',async(req,res)=>{
  const booking = req.body;
  const query ={
    email:booking.email,
    product:booking.product
  }
  const alreadyBooked = await bookingCollection.find(query).toArray();
  if(alreadyBooked.length){
    const message =`you already have a booking on ${booking.product}`;
    return res.send({acknowledged:false,message})
  }
  const result =await bookingCollection.insertOne(booking);
  res.send(result)
})
app.get('/bookings',async(req,res)=>{
  const email = req.query.email;
  
  const query = {email:email}
  const booking = await bookingCollection.find(query).toArray();
  
  res.send(booking);
  
})

app.post('/users',async(req,res)=>{
  const user = req.body;
  
  
  const result =await userCollection.insertOne(user);
  res.send(result)
})

app.get('/users',async(req,res)=>{
  const query = {}
  const cursor =userCollection.find(query);
  const users = await cursor.toArray();
  res.send(users);
  
})
app.delete('/users/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)};
  const result = await userCollection.deleteOne(query);
  
  res.send(result);})


app.get('/users/:email',async(req,res)=>{
  const email = req.params.email;
  
  const query = {email:email}
  const user = await userCollection.findOne(query);
  console.log(user);
  res.send(user);
})
app.put('/users/:id',async(req,res)=>{
  const id =req.params.id;
  const filter={_id:ObjectId(id)};
  const options ={upsert:true};
  const updatedDoc ={
    $set: {
      status:'verified'
    }
  }
  const result = await userCollection.updateOne(filter,updatedDoc,options);
  res.send(result)
})


app.get('/users/admin/:email',async(req,res)=>{
  const email = req.params.email;
  
  const query = {email:email}
  const user = await userCollection.findOne(query);
  
  res.send({isAdmin:user.role==='admin'});
})

app.get('/users/seller/:email',async(req,res)=>{
  const email = req.params.email;
  
  const query = {email:email}
  const user = await userCollection.findOne(query);
  
  res.send({isSeller:user.role==='seller'});
})

app.get('/users/buyer/:email',async(req,res)=>{
  const email = req.params.email;
  
  const query = {email:email}
  const user = await userCollection.findOne(query);
  
  res.send({isBuyer:user.role==='buyer'});
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