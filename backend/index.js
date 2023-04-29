const express = require("express");
const app = express();
require("dotenv").config();

app.listen(process.env.PORT || 30001 , ()=>{
  console.log("Server is running on port", process.env.PORT);
});