import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import {Context} from '../../Context/Context'
import { useEffect } from 'react'
import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate=useNavigate();
  const {token,dispatch}=useContext(Context);
  const [data,setData]=useState('');
  const [flag,setFlag]=useState(false);
  
  useEffect(()=>{
    axios.get('https://ecommerce-k4se.onrender.com/user/getdata',{headers:{token}})
    .then((res)=>{
      setData(res.data.data);
    }).catch((err)=>{
      console.log(err);
    });
  },[])

  useEffect(() => {
    if (flag === true) {
      document.getElementsByClassName("navbar_ul_responsive")[0].style.display =
        "block";
    }
    if (flag === false) {
      document.getElementsByClassName("navbar_ul_responsive")[0].style.display =
        "none";
    }
  }, [flag]);

  
  return (
    <>
    <nav className='navbar'>
      <h3 className='navbar_heding'>SHopify</h3>
      <div>
        <div className='navbar_link'>
          <Link to='/home'>Home</Link>
          {token?(<button onClick={()=>{dispatch({type:"LOGOUT"})}}>Logout</button>):(<Link to='/'>Login</Link>)}
          {token?(<Link to='/cart'><i class="fa-solid fa-cart-shopping"></i></Link>):undefined}
          {token?<div className='navbar_user'>
              <img src={data.profilePhoto} onClick={()=>{navigate('/user')}}/>
          </div>:undefined}
        </div>
      </div>

      <div className="navbar_ul_responsive_button">
          <button onClick={()=>{setFlag(!flag)}}>
            <i class="fa-solid fa-bars"></i>
          </button>
          <div className="profile_photo">
            <img
              src={data.profilePhoto}
              alt=""
              onClick={() => {
                navigate("/user")
              }}
            />
          </div>
      </div>    
    </nav>
    <div className='navbar_ul_responsive'>
      <p>
      <Link to="/home">Home</Link>
      </p>
      <p>
        {token?(<Link to='/cart'>Cart</Link>):(undefined)}
      </p>
      {token?(<button onClick={()=>{dispatch({type:"LOGOUT"});window.location.reload(true)}}>Logout</button>
    ):(<Link to='/'>Login</Link>)}
    </div>
    </>
  )
}

export default Navbar