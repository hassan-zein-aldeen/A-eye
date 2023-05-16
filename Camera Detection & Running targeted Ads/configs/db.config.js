const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", (err)=>{
  console.error(err);
})

db.once("open", ()=>{
  console.log("mongo db connected successfully");
})