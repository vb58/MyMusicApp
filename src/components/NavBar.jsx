import { MdLightMode,MdOutlineLightMode } from "react-icons/md";
import {CgProfile} from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'
import { FaArrowAltCircleLeft,FaArrowCircleRight } from "react-icons/fa";
import { reducerCases } from '../utils/Constants'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { LogoutButton, NavBarContainer, UserProfile } from '../utils/styledComponents';
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/router";

export const NavBar = props=>{
    const {navbackground} = props
    const [ displayLogout,toggleDisplayLogout] = useState(false)
    const [{userInfo,darkMode},dispatch] = useStateProvider()
    const navigate = useNavigate()
    useEffect(()=>{
        try 
        {
        let localToken = getToken() 
        if(!localToken)  navigate("/")
        const options = {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+localToken,
                'Content-type':'application/json'}
            }
        const getUserInfo =async ()=>{
            const response = await fetch('https://api.spotify.com/v1/me',options)
            const output = await response.json()
        const userInfo = {
            userId:output.id,
            userName:output.display_name
        }
        dispatch({type:reducerCases.SET_USER,userInfo})  
        }  
    getUserInfo()
}catch(error)
{
        console.log(error)
}},[dispatch,darkMode])

    const onLogout=()=>{
        Cookies.remove(reducerCases.SET_TOKEN)
        //window.location.href='https://music-player-app-cecfb.web.app/'
        window.location.href='http://localhost:3000/'
    }
    const changeMode = ()=>dispatch({type:reducerCases.SET_DARK_MODE,darkMode:!darkMode})
    
    return <NavBarContainer navbackground={navbackground} darkmode={darkMode}>
        <div className='arrows'>
        <FaArrowAltCircleLeft onClick={()=>navigate(-1)}/> <FaArrowCircleRight onClick={()=>navigate(1)}/>
        </div> 
       
    <div className="change-mode">
            {darkMode? <MdOutlineLightMode fill="white" onClick={changeMode}/>
            : <MdLightMode onClick={changeMode}/>}
    </div>
    
    
    <ul className="avatar">
        <li>
        <UserProfile darkmode={darkMode} href="#" onClick={()=>{ displayLogout? toggleDisplayLogout(false) : toggleDisplayLogout(true)}}>
            <CgProfile color={`${ darkMode? 'black':'green' }`}/>
            <span>{userInfo?.userName[0].toUpperCase()}</span>
        </UserProfile>
        </li><li>
            {displayLogout? <LogoutButton onClick={onLogout}>Logout</LogoutButton>:""}
        </li>
    </ul>
    </NavBarContainer>
}