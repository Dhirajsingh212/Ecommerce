import './Singleproduct.css'
import React from 'react'
import Homeproduct from '../../Homeproduct/Homeproduct'
import { useParams } from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../../Context/Context'
import { useNavigate } from 'react-router-dom'

const Singleproduct = () => {
  let navigate=useNavigate();
  let params=useParams().id;
  const {token,isFetching,error,dispatch}=useContext(Context);
  const [image,setImage]=useState('');
  const [title,setTitle]=useState('');
  const [descrip,setDescrip]=useState('');
  const [rating,setRating]=useState('');
  const [price,setPrice]=useState('');


  useEffect(()=>{
    axios.get('https://ecommerce-k4se.onrender.com/getprodone/',{headers:{token,params}})
    .then((res)=>{
      setImage(res.data.data.image);
      setTitle(res.data.data.title);
      setDescrip(res.data.data.descrip);
      setRating(res.data.data.rating);
      setPrice(res.data.data.price);
    })
    .catch((err)=>{
      console.log(err);
    }) 
  },[])

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
    dispatch({type:"PRODUCT_UPDATE_START"});
    try{
      await axios.put('https://ecommerce-k4se.onrender.com/updateprod',{
        image,title,descrip,rating,price
      },{headers:{token,params}});
      dispatch({type:"PRODUCT_UPDATE_SUCCESS"});
      navigate('/admin/home');
    }catch(err){
      console.log(err);
      dispatch({type:"PRODUCT_UPDATE_FAIL"});
    }
  }
  
  if(isFetching){
    return <div className='loading'></div>
  }

  if(error){
      return <div>
        there is an unexpected error.. 
      </div>
  }

  return (
    <div>
      <Homeproduct/>
      <form className='add_form' onSubmit={submitHandler}>
          <input type="url" value={image} onChange={imageHandler}  placeholder='Image' required/>
          <input type="text" value={title} onChange={titleHandler} placeholder='Name' required/>
          <input type="text" value={descrip} onChange={descripHandler} placeholder='Description' required/>
          <input type="number" value={rating} onChange={ratingHandler} placeholder='Rating' required/>
          <input type="number" value={price} onChange={priceHandler} placeholder='Price' required/>
      <button type='submit'>Update</button>
    </form>
    </div>
  )
}

export default Singleproduct