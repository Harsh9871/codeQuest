import React, {useEffect} from 'react'
import Navbar from '../components/Navbar'
import { getCookiesAsJson } from '../utils/cookieHelper.js';
import {NavLink} from 'react-router-dom'
const Home = () => {
  useEffect(() => {
    document.title = 'Code Quest';
  }, []);
  const getLoginDetails = ()=>{
    const cookies = getCookiesAsJson();
    return cookies.loggedIn;
  }
  return (
    <div>
        {getLoginDetails() ? <Navbar message={{loggedIn:true}} />:<Navbar message={{loggedIn:false}} />}
        <NavLink to="/login">Login</NavLink>
    </div>
  )
}

export default Home
