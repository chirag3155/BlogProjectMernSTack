import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './dashboard.css'
const SignInForm = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const[err,setErr]=useState("");
const[ok,setOk]=useState("");
const handleChange = (e) => {
  setErr("");
  setOk("");
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
  const url = "http://localhost:5000/signin";
  
  const onSignInSubmit=async()=>{
    await   axios.post(url,formData).then((response) => {
           console.log(response.status);
           if(response.status === 200){
             console.log(response.data);
               setErr("");
               setOk("Successfully Login");
               onSignIn(response.data);
           }else{
             // console.log("Failed! unable to edit try again.");
             setErr("Invalid User!!");
           }
         }).catch((err)=>{});
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignInSubmit();
    // Perform form validation and sign-in logic here.
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className='row'>
      <h2>Sign In</h2>
      <div className='text-danger'>
            {err}
          </div>
          <div className='text-success'>
            {ok}
          </div>
      <form onSubmit={handleSubmit}>
        <div className='mt3'>
          <label className='label-m'>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mt3'>
          <label className='label-m'>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='mt3'>Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
