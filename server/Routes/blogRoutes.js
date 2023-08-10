const express =require('express');
const { loginUser, signupUser, addBlog, deleteBlog,editBlog,findBlogs}=require('../Controllers/controllers.js');
const router=express.Router();



router.get("/blog",findBlogs);
router.post("/blog",addBlog);
router.post("/signin",loginUser);
router.post("/signup",signupUser);
router.post("/delete-blog",deleteBlog);
router.post("/edit-blog",editBlog);

module.exports=router;