const dotenv=require("dotenv")
const express = require("express");
const postRoutes=require("./routes/post")
const authRoutes=require("./routes/auth")
const cors=require("cors")
const app = express();
dotenv.config();
const PORT =process.env.PORT || 5001;
app.use(cors())
const mongoose = require("mongoose");
app.use(express.json())
app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.listen(PORT, () => {
  mongoose
    .connect(
      process.env.MONGO_URI
    )
    .then(() =>
      console.log(`Server is running at port ${PORT} and DB is connected`)
    )
    .catch((err) => console.error(err));
});
app.get("/",(req,res)=>{
    res.send("KibraTimes API")
})