import React, { useState } from 'react';
import './dashboard.css'
import axios from 'axios';
const SignUpForm = ({ handleSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
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
  const url = "http://localhost:5000/signup";
  function isValidMobileNumber(number) {
    // Define a regular expression pattern for a common mobile number format
    const regex = /^[0-9]{10}$/;
  
    // Test the input number against the regex pattern
    return regex.test(number);
  }
  
  // Example usage
  // const phoneNumber = "1234567890";
  
  const onSignUpSubmit=async()=>{
   await   axios.post(url,formData).then((response) => {
          console.log(response.status);
          if(response.status === 200){
            console.log([response.data]);
              setErr("");
              setOk("Successfully Registered");
              handleSignUp(formData);
          }else{
            // console.log("Failed! unable to edit try again.");
            setErr("Email already exists");
          }
        }).catch((err)=>{});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
if(formData.password===formData.confirmPassword){

  if (isValidMobileNumber(formData.phoneNumber)) {
    onSignUpSubmit();

  // Perform form validation and sign-up logic here.
  // onSignUp(formData);
  setFormData({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
    console.log("Valid mobile number.");
  } else {
    setErr("Invalid mobile number.");
  }

  
}
else{
  setErr("Confirm Password is not matching!!");
}
   
  };

  return (
    <div className='row'>
      <h2 className='mt3'>Sign Up</h2>
      <div className='text-danger'>
            {err}
          </div>
          <div className='text-success'>
            {ok}
          </div>
      <form onSubmit={handleSubmit}>
        <div className='mt3'>
          <label className='label-m'>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label className='label-m'>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
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
        <div className='mt3'>
          <label className='label-m'>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='mt3'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
