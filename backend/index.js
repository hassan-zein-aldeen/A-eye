const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const authRouter = require("./routes/auth.routes");
app.use('/auth', authRouter)

app.listen(process.env.PORT || 3001 , (err)=>{
  if(err) console.error(err)
  console.log("Server is running on port", process.env.PORT);
  require("./configs/db.config");
});