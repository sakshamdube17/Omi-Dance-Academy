const express = require("express");
const path = require("path");
const fs =require("fs");
const app = express();
const mongoose = require ("mongoose");
const bodyparser =require("body-parser");
const port = 8000;

//DB connection & creating schema
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    address: String,
    more: String
  });

  var Contact = mongoose.model('Contact',contactSchema);

// EXPRESS SPECIFY STUFF
app.use('/static', express.static('static')); // For serfing the static files
app.use(express.urlencoded());


app.set('view engine', 'pug'); //Set the template engine pug
app.set('views',path.join(__dirname,'views')); //Set the view directory

// ENDPOINTS
app.get('/' , (req,res)=>{
const params = { };
res.status(200).render('home.pug',params);
});

app.get('/contact' , (req,res)=>{
    const params = { };
    res.status(200).render('contact.pug',params);
    });

    app.post('/contact' , (req,res)=>{
        myData =new Contact(req.body);
        myData.save().then(() =>{
        res.send("This item is saved to database");
        }).catch(()=>{
          res.status(400).send("Items is not saved to database");
        });
    });      

//START THE SERVER
app.listen(port, () => {
   console.log(`This application is running successfully on ${port}`);
});