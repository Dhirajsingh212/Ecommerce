import React from 'react'
import './Signup.css'
import {useState} from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  let navigate=useNavigate();
  const {error,isFetching,dispatch}=useContext(Context);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [cnfpassword,setCnfpassword]=useState('');

  const emailHandler=(e)=>{
    setEmail(e.target.value);
  }

  const passwordHandler=(e)=>{
    setPassword(e.target.value);
  }

  const cnfpasswordHandler=(e)=>{
    setCnfpassword(e.target.value);
  }

  const submitHandler=async (e)=>{
    e.preventDefault();
    dispatch({type:"SIGNUP_START"});
    if(password!==cnfpassword){
      alert('password does not match');
      window.location.reload(true);
      return;
    }

    try{
      const res=await axios.post('https://ecommerce-k4se.onrender.com/Signup',{
        email,
        password,
      });
      console.log(res.data);
      dispatch({type:"SIGNUP_SUCCESS",payload:{token:res.data.token,admin:res.data.admin}});
      navigate('/home');
    }catch(err){
      dispatch({type:"SIGNUP_FAIL"});
      alert("wrong credentials")
      window.location.reload(true);
    }
  }

  if (isFetching) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className='signup'>
        <div className='signup_left'>
            <p className='signup_left_logo'>SHopify</p>
            <form className='signup_left_form' onSubmit={submitHandler}>
                    <p className='signup_left_form_p'>Purchase any thing you want.</p>
                    <input type="email" value={email} onChange={emailHandler} placeholder='Email' required/>
                    <input type="password" value={password} onChange={passwordHandler} placeholder='Password' required/>
                    <input type="password" value={cnfpassword} onChange={cnfpasswordHandler} placeholder='Confirm Password' required/>
                    <button className='signup_left_form_button' type='submit'>Signup</button>
                    <p className='signup_left_from_login'>Have an account? <a href='/'>Login</a></p>
            </form>
        </div>
        <img className='signup_right' src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="" />
    </div>
  )
}

export default Signup