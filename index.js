const dotenv=require("dotenv")
const express = require("express");
const app = express();
dotenv.config
const PORT =process.env.PORT || 8000;
const mongoose = require("mongoose");
app.listen(PORT, () => {
  mongoose
    .connect(
      "process.env.MONGO_URI"
    )
    .then(() =>
      console.log(`Server is running at port ${PORT} and DB is connected`)
    )
    .catch((err) => console.error(err));
});
app.get("/",(req,res)=>{
    res.send("KibraTimes API")
})