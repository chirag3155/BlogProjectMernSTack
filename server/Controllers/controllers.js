const { request } = require('express');
const { use } = require('../Routes/blogRoutes.js');
const userdata = require('../dbsModel/dbsmodel.js');
const userPost=require('../dbsModel/dbsPostModel.js');
const md5=require('md5');

const loginUser = async (req, res) => {
    const enPassword=md5(req.body.password);
    let getEmail = await userdata.find({ email: req.body.email });
    console.log(getEmail.length!=0);
    if(getEmail.length==0){
        getEmail=[{email:""}];
    }
    let getPassword = await userdata.find({ password:enPassword });
    console.log(getPassword.length!=0);
    if(getPassword.length==0){
        getPassword=[{password:""}];
    }
    if(getEmail.length>0 && getEmail[0].email!=req.body.email){
        res.status(201).json({ message: "Wrong Email "});
       }
       if(getPassword.length>0 && getPassword[0].password!=enPassword){
        res.status(201).json({ message: "Wrong Password "});
       }
       if((getEmail.length>0 && getEmail[0].email==req.body.email) && (getPassword.length>0 && getPassword[0].password==enPassword)){
        try {
            res.status(200).json(getEmail[0]);
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: error.message });
        }
       }
       if(getEmail.length==0 && getPassword.length==0){
        res.status(200).json({ message: "Invalid User" });

}
}
const signupUser = async (req, res) => {
    const userDetail = req.body;
    console.log(userDetail);
    const enPassword=md5(userDetail.password);
    // console.log(enPassword);
    const d={...userDetail,password:enPassword};
    const detail = new userdata(d);
    console.log(d);
    let getEmail = await userdata.find({ email: req.body.email });
    // console.log(getEmail.length!=0);
    if(getEmail.length==0){
        getEmail=[{email:""}];
    }
   if(getEmail.length>0 && getEmail[0].email==req.body.email){
    res.status(201).json({ message: "Email already exists"});
   }
   else{
    try {
        detail.save();
        // console.log(getEmail[0].email);
        // console.log(typeof(getEmail.email));
        // console.log("Todo successfully saved $");
        res.status(200).json(detail);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
   }
    
}
const addBlog = async (req, res) => {

    const newPost = req.body;
    const post = new userPost(newPost);

    try {
        await post.save();
        console.log(newPost);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(406).json({ message: error.message });
    }
}
const findBlogs = async (req, res) => {
    // const newPost = {
    //     // id: Date.now(),
    //     id:0,
    //     content:'',
    //     likes: 0,
    //     dislikes: 0,
    //   };
    //   const  post=new userPost();
    const blogs = {};
    const blog=await userPost.find(blogs);
    console.log(blog);
    // const addNewTodo = new todo(newtodo);
    try {
        // await addNewTodo.save();
        // console.log("Todo successfully saved $" + newtodo.todo);
        res.status(200).json(blog);
    } catch (error) {
        console.log(error);
        res.status(406).json({ message: error.message });
    }
}
const deleteBlog = async (req, res) => {
  console.log(req.body);
        // const todotodel = await user.find({ _id: req.body });
        userPost.findByIdAndRemove(req.body.id)
            .then(() => {
                res.status(200).json({ msg: "del" });
                console.log("Todo successfully deleted  $" );
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error}`);
                res.status(200).json({ msg: " not del" });
            });
        //  console.log(todotodel[0].todo);
    
}

const editBlog = async (req, res) => {
    const id = req.body.id  ;
    const updatedTodo =req.body.todo;
    try {
        await todo.findByIdAndUpdate(id, {todo:updatedTodo}).then(()=>{
        res.status(200).json({message : "Successfully Updated"});
        console.log("Successfully Updated!"+updatedTodo);
        });
    }catch(err){
        console.log(err.message);
     res.status(406).json({message : err.message});
    }
    const signupUser = async (req, res) => {

    const newtodo = req.body;
    const addNewTodo = new todo(newtodo);

    try {
        await addNewTodo.save();
        console.log("Todo successfully saved $" + newtodo.todo);
        res.status(201).json(newtodo);
    } catch (error) {
        console.log(error);
        res.status(406).json({ message: error.message });
    }
}

}




module.exports = { loginUser, signupUser, addBlog, deleteBlog,editBlog,findBlogs};