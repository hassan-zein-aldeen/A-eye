const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT || 30001 , (err)=>{
  if(err) console.error(err)
  console.log("Server is running on port", process.env.PORT);
  require("./configs/db.config");
});