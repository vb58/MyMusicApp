import React,{useRef,useState} from 'react'
import { useStateProvider } from '../utils/StateProvider';
import { Sidebar } from './Sidebar';
import { NavBar } from './NavBar';
import {Outlet} from 'react-router-dom'
import { Footer } from './Footer';
import { SpotifyContainer } from '../utils/styledComponents';

export default function Spotify() {
    const [{darkMode}] = useStateProvider()
    const bodyRef = useRef();
    const [navbackground,setNavBackground] = useState(false)
    
    const bodyScrolled=()=>{
            bodyRef.current.scrollTop>=30? setNavBackground(true) : setNavBackground(false)
    }
    return  (
        <div className="App">
        <SpotifyContainer darkmode={darkMode}>
            <div className="spotify-body">
            <Sidebar/>
            <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                <NavBar navbackground={navbackground}/>
                <div> 
                  <Outlet />
                </div>
            </div>
            </div>
            <div>
                <Footer/>
            </div>
        </SpotifyContainer>
        </div>)
}
