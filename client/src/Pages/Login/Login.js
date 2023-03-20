import React from 'react'
import './Login.css'
import {useState} from 'react';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate=useNavigate();
    const {error,isFetching,dispatch}=useContext(Context);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value);
    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            dispatch({type:'LOGIN_START'});
            const res=await axios.post('https://ecommerce-k4se.onrender.com/Login',{
                email,
                password
            });
            dispatch({type:"LOGIN_SUCCESS",payload:{token:res.data.token,admin:res.data.admin}});
            navigate('/home');
        }catch(err){
            dispatch({type:"LOGIN_FAIL"});
            alert(err);
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
                    <button className='signup_left_form_button' type='submit'>Login</button>
                    <p className='signup_left_from_login'>Don't have an account?
                        <a href="/Signup">Signup for free</a>
                    </p>
                </form>
            </div>
            <img className='signup_right' src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt=""/>
        </div>
    )
}

export default Login
