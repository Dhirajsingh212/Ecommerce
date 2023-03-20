import React from 'react'
import './Cart.css'
import {useEffect} from 'react';
import axios from 'axios';
import {useContext} from 'react';
import {Context} from '../../Context/Context';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
        let navigate=useNavigate();
        const {token,dispatch,isFetching,error} = useContext(Context);
        const [count,setCount]=useState([{num:''}]);
        const [arr, setArr] = useState([]);
        const [loader,setLoader]=useState(false);
        var amount=0;

        useEffect(() => {
            setLoader(true);
            axios.get('https://ecommerce-k4se.onrender.com/cart/getprod', {headers: {
                    token
                }}).then((res) => {
                setArr(res.data.data);
                setLoader(false);
            }).catch((err) => {
                console.log(err)
            });
        }, []);

        const handleroom = (event,id) => {
            let data=[...count];
            data[id]=event.target.value;
            setCount(data);
          };
        
        if(loader || isFetching){
            return(<div className='loading'></div>)
        }

        return (
        <div className='cart'>
            <nav className='cart_nav'>
                <h3>SHopify</h3>
                <div className='cart_nav_link'>
                    <Link to="/home">Home</Link>
                </div>
            </nav>
            {arr.length>0? <div className='cart_product'>
            {
            arr.map((e) => (
                <>
                <p style={{"display":"none"}}>
                    {amount+=(e.price*e.quantity)}
                </p>
                <div className='cart_product_card'>
                    <div className='cart_product_card_info'>
                        <h4>{e.title.slice(0,20)}</h4>
                        <p>{e.descrip.slice(0,50)}...</p>
                        <div className='cart_product_card_info_rating'>
                            <p>Rs-{e.price*e.quantity}</p>
                        </div>
                        <div className='cart_product_card_input'>
                                <label>quantity</label>
                                <input type="number" value={count[e._id]} placeholder={e.quantity} onChange={(event)=>handleroom(event,e._id)}></input>
                        </div>
                        <div className='cart_product_card_button'>
                            <button onClick={async()=>{
                                try{
                                    dispatch({type:"UPDATE_QUANTITY_START"});
                                    await axios.put('https://ecommerce-k4se.onrender.com/cart/quantity',{productid:e.productId,quantity:count[e._id]},{headers:{token}});
                                    dispatch({type:"UPDATE_QUANTITY_SUCCESS"});
                                    window.location.reload(true);
                                }catch(err){
                                    console.log(err);
                                    dispatch({type:"UPDATE_QUANTITY_FAIL"});
                                }
                            }}>Submit</button>
                            <button onClick={async()=>{
                                try{
                                    var data={
                                        headers:{
                                            token,
                                        },
                                        productid:e.productId
                                    }
                                    await axios.delete('https://ecommerce-k4se.onrender.com/cart/delete',{data:data})
                                    window.location.reload(true);
                                }catch(err){
                                    console.log(err);
                                }
                            }}>Remove</button>
                        </div>
                    </div>
                    <div className='cart_product_card_image'>
                        <img src={e.image}/>
                    </div>
                </div>
            </>
            ))
            }
            </div>:<div>cart is empty</div>}
            <p style={{"text-align":"center","font-family":"Tilt Neon, cursive","font-size":"1.2em"}}>Total amount to be paid-Rs{amount}</p>
            <button className='cart_checkout_button' disabled={arr.length===0?true:false} onClick={(e)=>{navigate('/comingsoon')}}>checkout</button>
         </div>
    )
}

export default Cart
