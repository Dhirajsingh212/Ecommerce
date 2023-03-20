import React from 'react'
import './UserProfile.css'
import Navbar from '../../components/Navbar/Navbar'
import {useContext} from 'react';
import {Context} from '../../Context/Context';
import {useEffect} from 'react';
import {useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const UserProfile = () => {
  const {token,isFetching,error,dispatch}=useContext(Context);
  const [arr,setArr]=useState('');
  const [email,setEmail]=useState('');
  const [profilePhoto,setProfilePhoto]=useState('');

  useEffect(()=>{
      dispatch({type:"FETCH_USER_START"})
      axios.get('https://ecommerce-k4se.onrender.com/user/getdata',{headers:{token}})
      .then((res)=>{
        setArr(res.data.data);
        setEmail(res.data.data.email);
        setProfilePhoto(res.data.data.profilePhoto)
        dispatch({type:"FETCH_USER_SUCCESS"});
      })
      .catch((err)=>{
        console.log(err);
        dispatch({type:"FETCH_USER_FAIL"});
      })
  },[])

  const emailHandler=(e)=>{
    setEmail(e.target.value);
  }

  const profilePhotoHandler=(e)=>{
    setProfilePhoto(e.target.value);
  }

  if(isFetching){
    return (<div className='loading'></div>)
  }

  if(error){
    return(<div>error</div>)
  }

  if(!token){
    return (<div>please login <Link to="/">Login</Link></div>)
  }

  return (
    <div className='userprofile'>
        <Navbar/>
        <div className='userprofile_info'>
          <form className='userprofile_info_input'>
            <input type="email" value={email} placeholder="Email" required onChange={emailHandler}/>
            <input type="url" value={profilePhoto} placeholder="ProfilePhoto" required onChange={profilePhotoHandler}/>
            <div className='userprofile_info_input_button'>
              <button onClick={async(e)=>{
                e.preventDefault();
                dispatch({type:"UPDATE_USER_START"});
                try{
                   await axios.put('https://ecommerce-k4se.onrender.com/user/update',{
                    email,profilePhoto
                   },{headers:{token}})
                   dispatch({type:"UPDATE_USER_SUCCESS"});
                   window.location.reload(true);
                }catch(err){
                  console.log(err);
                  dispatch({type:"UPDATE_USER_FAIL"});
                }
              }}>Update</button>
              <button onClick={async(e)=>{
                e.preventDefault();
                try{
                  let temp=window.confirm("are you sure?");
                  if(!temp){
                    return;
                  }
                  await axios.delete('https://ecommerce-k4se.onrender.com/user/delete',{headers:{token}})
                  dispatch({type:"LOGOUT"});
                }catch(err){
                  console.log(err);
                }
              }}>Remove</button>
            </div>
          </form>
          <div style={{"width":"15em","height":"15em"}}>
            <img src={arr.profilePhoto}/>
          </div>
        </div>
    </div>
  )
}

export default UserProfile