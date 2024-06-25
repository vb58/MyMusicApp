import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider"
import { reducerCases } from "../utils/Constants"
import {Link, useNavigate} from 'react-router-dom'
import { getToken } from "../utils/router"
import { PlaylistsContainer } from "../utils/styledComponents"
import { IoLibrary } from "react-icons/io5"
export const PlayLists =()=>{
    const [{playlists,darkMode},dispatch]=useStateProvider()
    const navigate = useNavigate()
    useEffect(()=>{
        try {
        let localToken = getToken()
        
        if(!localToken)  navigate("/")
        const getPlayListData = async ()=>{
            const options = {
                method:'GET',
                headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'}
            }
            const response = await fetch('https://api.spotify.com/v1/me/playlists',options)
            const outputData = await response.json()
            const {items} = outputData
            const playlists = items.map(({name,id,images})=>{
              return {name,id,images}
             })
            dispatch({type:reducerCases.SET_PLAYLISTS,playlists})
        }
        getPlayListData()
    }catch(error)
    {
        if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.") 
            if(error.response.status ===403) alert('* Only Prime Members have access to play the audio')
            
        
    }
    },[dispatch])

return <PlaylistsContainer darkmode={darkMode}>
    
    <ul>
        
    <li key="library"><IoLibrary/>Spotify Library</li>
    {
        
        playlists.map(({name,id})=>{
            const linkPath = `/playlist/${id}`
            return (
            <Link to={linkPath} key={id} style={{color:'inherit',textDecoration:'inherit'}}>
            <li key={id} >
                {name}
                </li>
                </Link>
            )
        })
        
    }

    </ul> 
</PlaylistsContainer>
}
