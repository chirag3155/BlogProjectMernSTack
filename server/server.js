const express =require('express');
const mongoose =require('mongoose');
const blogRoutes =require('./Routes/blogRoutes');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
const port=5000;
const url='mongodb://127.0.0.1:27017/blogDB';

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());
app.use('/',blogRoutes);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  app.get("/",(req,res)=>{
res.send("hello");

});
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => app.listen(port, () => {
      console.log("Success!! connection stablish and running on PORT " + port);
  })).catch((error) => console.log("Fail!! connection not stablished :"+error));