import React from 'react'
import './Body.css';
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Context } from '../../Context/Context'
import {useNavigate} from 'react-router-dom';

const Body = () => {
  let navigate=useNavigate();
  const {token,dispatch,isFetching,error}=useContext(Context);
  const [loading,setLoading]=useState(false);
  const [arr,setArr]=useState([]);

  useEffect(()=>{
    setLoading(true);
    axios.get('https://ecommerce-k4se.onrender.com/getprod').then((res)=>{
      setArr(res.data.data);
      setLoading(false);
    }).catch((err)=>{
      alert("there is an unexpected error");
      console.log(err);
    });
  },[]);

  if(loading || isFetching){
    return <div className='loading'></div>
  }

  if(error){
    return <div>
      there is an enexpected error
      {window.location.reload(true)}
    </div>
  }

  return (
    <div className='home'>
      {arr.map((e)=>(
        <div key={e._id} className='home_card'>
          <img src={e.image} alt="" style={{"height":"100%","object-fit":"cover","width":"100%"}} />
          <div className='home_card_info'>
              <h3>{e.title.slice(0,20)}</h3>
              <p>{e.descrip.slice(0,20)}</p>
              <div className='body_rating'>
              {e.rate.map((t)=>(<p>⭐</p>))}
              </div>
              <span>Rs-{e.price}</span>
          </div>
          <div className='home_card_button'>
            <button onClick={async()=>{
              dispatch({type:"ADD_CART_START"});
              try{
                const data=await axios.post('https://ecommerce-k4se.onrender.com/cart/addprod',{productid:e._id},{headers:{token}})
                console.log(data);
                dispatch({type:"ADD_CART_SUCCESS"});
              }catch(err){
                console.log(err);
                dispatch({type:"ADD_CART_FAIL"})
              }
            }}
            disabled={token?false:true}
            >
                addTocart
            </button>
          </div>  
        </div>
      ))}
    </div>
  )
}

export default Body