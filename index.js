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

app.get('/phones',async(req,res)=>{
  const query = {}
  const cursor =mobileCollection.find(query);
  const phones = await cursor.toArray();
  res.send(phones);
  
})

app.get('/phones/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:ObjectId(id)}
  const phone = await mobileCollection.findOne(query);
  
  res.send(phone);
  console.log(phone)
  
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