const {addposts,getposts, singleposts, updateposts, deletedposts }=require("../contollers/post")
const express = require("express")
const router = express.Router()
//Adding posts
router.post("/new",addposts)
//Getting all posts
router.get("/",getposts)
//Getting single Posts
router.get("/:id",singleposts)
//Updating posts
router.patch("/update/:id",updateposts)
//Delete post
router.delete("/delete/:id",deletedposts)
module.exports=router

