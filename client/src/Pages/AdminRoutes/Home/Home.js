import React from 'react'
import './Home.css'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Context } from '../../../Context/Context'
import {useNavigate} from 'react-router-dom';

const Home = () => {
  let navigate=useNavigate();
  const {token,isFetching,error,dispatch}=useContext(Context);
  const [loading,setLoading]=useState(false);
  const [arr,setArr]=useState([]);

  useEffect(()=>{
    setLoading(true);
    axios.get('https://ecommerce-k4se.onrender.com/getprod',{
      headers:{token}
    }).then((res)=>{
      setArr(res.data.data);
      setLoading(false);
    }).catch((err)=>{
      alert("there is an unexpected error");
      console.log(err);
    });
  },[]);

  if(loading){
    return <div className='loading'></div>
  }

  if(error){
    return <div>there is an unexpected error</div>
  }

  return (
    <div className='home'>
      {arr.map((e)=>(
        <div key={e._id} className='home_card'>
          <img src={e.image} alt="" style={{"height":"100%","object-fit":"cover"}} />
          <div className='home_card_info'>
              <h3>{e.title.slice(0,20)}</h3>
              <p>{e.descrip.slice(0,20)}...</p>
              <p></p>
              <span>Rs-{e.price}</span>
          </div>
          <div className='home_card_button'>
            <button onClick={()=>{navigate(`/${e._id}`)}}>edit</button>
            <button onClick={async()=>{
              dispatch({type:"PRODUCT_DELETE_START"});
              try{
                await axios.delete(`https://ecommerce-k4se.onrender.com/${e._id}`,{headers:{token}});
                dispatch({type:"PRODUCT_DELETE_SUCCESS"});
                window.location.reload(true);
              }catch(err){
                console.log(err);
                dispatch({type:"PRODUCT_DELETE_FAIL"});
              }
            }}>delete</button>
          </div>  
        </div>
      ))}
    </div>
  )
}

export default Home