import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
import SignUpForm from './SignUp';
import SignInForm from './SignInForm';
import './dashboard.css'
import axios from 'axios';
// import { use } from '../../../server/Routes/blogRoutes';
const Post = ({ post, onLike, onDislike, onDelete, onEdit,user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(post.id, editedContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="username">{user}</span>
        <span className="icons" onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </span>
        <span className="icons" onClick={() => onDelete(post._id)}>
          Delete
        </span>
      </div>
      <div className="post-content">
        {isEditing ? (
          <textarea
            className="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          post.content
        )}
      </div>
      <div className="post-footer">
        <button className="btn btn-primary" onClick={() => onLike(post.id)}>Like {post.likes}</button>
        <button className="btn btn-primary" onClick={() => onDislike(post.id)}>Dislike {post.dislikes}</button>
      </div>
    </div>
  );
};

const PostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit(content);
    // postDataHandle();
    setContent('');
  };

  
  return (
    <div className="post-form">
      <div >
        <textarea
          className="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your post here..."
        />
        <button className="btn btn-primary" onClick={(e)=>{handleSubmit(e);}}>Share</button>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("dashboard");
  
  const getAllPosts=async()=>{
    await   axios.get("http://localhost:5000/blog").then((response) => {
      console.log(response.status);
      if(response.status === 200){
        setPosts(response.data);
        console.log(response.data);
          // setErr("");
          // setOk("Successfully Login");
          // onSignIn(response.data);
      }else{
        
        // console.log("Failed! unable to edit try again.");
        // setErr("Invalid User!!");
      }
    }).catch((err)=>{});
  }
  useEffect(()=>{getAllPosts()},[]);
  useEffect(()=>{console.log(posts)},[posts]);
  const handlePostSubmit = (content) => {
    const newPost = {
      // id: Date.now(),
      id:user._id,
      name:user.name,
      content:content,
      likes: 0,
      dislikes: 0,
    };
    // setPosts((prevPosts) => [...prevPosts, newPost]);
    postDataHandle(newPost);
    displayAlert('Post created successfully.');
  };
  const postDataHandle=async(content)=>{
    await   axios.post("http://localhost:5000/blog",content).then((response) => {
      console.log(response.status);
      if(response.status === 200){
        console.log(response.data);
        getAllPosts();
          // setErr("");
          // setOk("Successfully Login");
          // onSignIn(response.data);
      }else{
        // console.log("Failed! unable to edit try again.");
        // setErr("Invalid User!!");
      }
    }).catch((err)=>{});
  }
  const handlePostLike = (postId) => {
    console.log(posts);
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handlePostDislike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
      )
    );
  };
const handleDelete=async(id)=>{
   await   axios.post("http://localhost:5000/delete-blog",{id:id}).then((response) => {
  console.log(response.status);
  if(response.status === 200){
    console.log(response.data);
    getAllPosts();
      // setErr("");
      // setOk("Successfully Login");
      // onSignIn(response.data);
  }else{
    // console.log("Failed! unable to edit try again.");
    // setErr("Invalid User!!");
  }
}).catch((err)=>{});}
  const handlePostDelete = (postId) => {
    handleDelete(postId);

    // setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    // displayAlert('Post deleted successfully.');
  };

  const handlePostEdit = (postId, editedContent) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: editedContent } : post
      )
    );
    displayAlert('Post edited successfully.');
  };

  const displayAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };
  const handleSignUp = (formData) => {
    // ... Perform Sign Up logic ...
    
    setTab("dashboard");
    setUser( formData );
    setAlertMessage('Sign Up successful.');
    console.log(tab);
  };

  const handleSignIn = (formData) => {
    // ... Perform Sign In logic ...
    setTab("dashboard");
    console.log(formData);
    setUser(formData);
    setAlertMessage('Sign In successful.');
  };

  // // const handleAlertClose = () => {
  //   setAlertMessage('');
  // };
console.log(posts);
  return (
    <div>
      <div>
        <nav className='ls'>
          
              <div onClick={() => { setTab("dashboard") }}>Dashboard</div>
           
              <div onClick={() => { setTab("signin") }}>Sign In</div>
           
              <div onClick={() => {setTab("signup" ) }}>Sign Up</div>
           
        </nav>
      </div>
<div className='post'>
{tab === "dashboard" ?
        <div>
          {alertMessage && <div className="alert">{alertMessage}</div>}
          {user ?
            <div>
              <h2>Welcome, {user.name || user.email}!</h2>
              <PostForm onSubmit={handlePostSubmit} />
              {console.log(posts)}
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handlePostLike}
                  onDislike={handlePostDislike}
                  onDelete={handlePostDelete}
                  onEdit={handlePostEdit}
                  user={post?.name || "Random User"}
                />
              ))}
            </div> :
            <div>
              <h2>Welcome, Random User!</h2>
              <h2>Please SignUp to Post!!</h2>
              {/* <PostForm onSubmit={handlePostSubmit} /> */}
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onLike={handlePostLike}
                  onDislike={handlePostDislike}
                  onDelete={handlePostDelete}
                  onEdit={handlePostEdit}
                  user={post?.name || "Random User"}
                />
              ))}
            </div>
          }

        </div>
        : null
      }


      {tab === "signin" ? <SignInForm onSignIn={handleSignIn} /> : null}
      {tab === "signup" ? <SignUpForm handleSignUp={handleSignUp} /> : null}


      </div>
    </div>
  );
};



export default Dashboard;
