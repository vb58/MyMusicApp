import React, { useState } from 'react'
import { VolumeContainer } from '../utils/styledComponents';
import { getToken } from '../utils/router'
import { useNavigate } from 'react-router-dom'
import { FaVolumeDown,FaVolumeUp,FaVolumeMute } from "react-icons/fa";
import { useStateProvider } from '../utils/StateProvider';

export default function Volume() {
    const [{darkMode}] = useStateProvider()
    const navigate = useNavigate()
    const [updatedVolume,setUpdatedVolume] = useState(75)

    const setVolume = async (e)=>{
        const url=`https://api.spotify.com/v1/me/player/volume?volume_percent=${e.target.value}`
        try 
        {
        let localToken = getToken() 
        if(!localToken)  navigate("/")
        const options = {
            method:'PUT',
            headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'},
           
        }
         await fetch(url,options)
        setUpdatedVolume(e.target.value)
    }catch(error)
    {
      if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.") 
      if(error.response.status ===403) alert('* Only Prime Members have access to play the audio')
      
    }
    }
    
  return (
    <VolumeContainer darkmode={darkMode}>
        {updatedVolume==0? <FaVolumeMute/> : <FaVolumeDown/>}
      <input type="range" min={0} max={100} onMouseUp={(e)=>setVolume(e)}/>
      <FaVolumeUp/>
    </VolumeContainer>
  )
}