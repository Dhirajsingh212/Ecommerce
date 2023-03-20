import React from 'react'
import './Homeproduct.css'
import { Link,Outlet } from 'react-router-dom'
import {useState,useEffect} from 'react';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
  let navigate=useNavigate();
  const {token,dispatch}=useContext(Context);

  const [flag,setFlag]=useState(false);

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
      <nav className='addp_navbar'>
        <h3>SHopify</h3>
        <div className='addp_navbar_links'>
            <Link to="/">Login</Link>
            <Link to="/admin/home">Home</Link>
            <Link to="/admin/add">Add</Link>
        </div>

        <div className="navbar_ul_responsive_button">
          <button onClick={()=>{setFlag(!flag)}}>
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>

      </nav> 
      <div className='navbar_ul_responsive'>
          <p>
          <Link to="/admin/home">Home</Link>
          </p>
          <p>
            <Link to="/admin/add">Add</Link>  
          </p>
          {token?(<button onClick={()=>{dispatch({type:"LOGOUT"});window.location.reload(true)}}>Logout</button>
        ):(<Link to='/'>Login</Link>)}
    </div>
      <Outlet/>
    </>
  )
}

export default Addproduct