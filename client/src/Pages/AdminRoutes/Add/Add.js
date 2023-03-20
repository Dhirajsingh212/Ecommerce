import React from 'react'
import './Add.css'
import {useState} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../../Context/Context';
import {useNavigate} from 'react-router-dom';

const Add = () => {
  let navigate=useNavigate();
  const {token,isFetching,error,dispatch}=useContext(Context);
  const [image,setImage]=useState('');
  const [title,setTitle]=useState('');
  const [descrip,setDescrip]=useState('');
  const [rating,setRating]=useState('');
  const [price,setPrice]=useState('');

  const imageHandler=(e)=>{
    setImage(e.target.value);
  }

  const titleHandler=(e)=>{
    setTitle(e.target.value);
  }

  const descripHandler=(e)=>{
    setDescrip(e.target.value);
  }

  const ratingHandler=(e)=>{
    setRating(e.target.value);
  }

  const priceHandler=(e)=>{
    setPrice(e.target.value);
  }

  const submitHandler=async (e)=>{
      e.preventDefault();
      
      try{
      
        dispatch({type:"PRODUCT_ADD_START"});
        await axios.post('https://ecommerce-k4se.onrender.com/addprod',{
          image,title,descrip,rating,price
        },{headers:{token}});
        dispatch({type:"PRODUCT_ADD_SUCCESS"});
        navigate('/admin/home');
      }catch(err){
      
        console.log(err);
        dispatch({type:"PRODUCT_ADD_FAIL"});
      
      }
  }

  if(isFetching){
    return <div className='loading'></div>
  }

  if(error){
    return <div>oops, something went wrong.</div>
  }

  return (
    <form className='add_form' onSubmit={submitHandler}>
      <input type="url" value={image} onChange={imageHandler}  placeholder='Image' required/>
      <input type="text" value={title} onChange={titleHandler} placeholder='Name'required/>
      <input type="text" value={descrip} onChange={descripHandler} placeholder='Description'required/>
      <input type="number" value={rating} onChange={ratingHandler} placeholder='Rating'required/>
      <input type="number" value={price} onChange={priceHandler} placeholder='Price'required/>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Add