const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));


const authRouter = require("./routes/auth.routes");
app.use('/auth', authRouter)

const userRouter = require("./routes/user.routes");
app.use('/user', userRouter)

const messRouter = require("./routes/messages.routes");
app.use('/message', messRouter);

const adsRouter = require("./routes/ads.routes");
app.use('/ads', adsRouter);



app.listen(process.env.PORT || 3001, (err) => {
  if (err) console.error(err)
  console.log("Server is running on port", process.env.PORT);
  require("./configs/db.config");
});