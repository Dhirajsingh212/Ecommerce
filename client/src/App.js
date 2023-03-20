import React from 'react'
import './App.css'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import {BrowserRouter as Router, Link, Routes, Route} from 'react-router-dom'
import Home from './Pages/AdminRoutes/Home/Home'
import Add from './Pages/AdminRoutes/Add/Add'
import Homeproduct from './Pages/Homeproduct/Homeproduct'
import Singleproduct from './Pages/AdminRoutes/Singleproduct/Singleproduct'
import {useContext} from 'react'
import {Context} from './Context/Context'
import Main from './Pages/Main/Main'
import Cart from './Pages/Cart/Cart'
import UserProfile from './Pages/UserProfile/UserProfile'
import ComingSoon from './Pages/Comingsoon/ComingSoon'

const App = () => {
    const {isadmin} = useContext(Context);

    return (<Routes>
        <Route path="/"
            element={<Login/>}/>
        <Route path="Signup"
            element={<Signup/>}/>
        <Route path='/home'
            element={<Main/>}/>
        <Route path="/comingsoon"
            element={<ComingSoon/>}/>
        <Route path="/user"
            element={<UserProfile/>}/>
        <Route path="/cart"
            element={<Cart/>}/>
        <Route path="/admin"
            element={
                isadmin ? <Homeproduct/>: (<div>
                    <h1>you are not authorized to visit this page</h1>
                    <Link to='/'>Login</Link>
                </div>)
        }>
            <Route path="home"
                element={<Home/>}/>
            <Route path="add"
                element={<Add/>}/>
        </Route>
        <Route path="/:id"
            element={<Singleproduct/>}/>
    </Routes>)
}

export default App
