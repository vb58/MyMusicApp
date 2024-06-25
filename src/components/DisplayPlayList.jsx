import { useEffect, useState } from 'react'
import {AiFillClockCircle} from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import { useParams, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/router'
import { BodyContainer } from '../utils/styledComponents'
import axios from 'axios'
export const DisplayPlayList = ()=>{
    const [{darkMode},dispatch] = useStateProvider()
    const [selectedPlaylist,setSelectedPlaylist] = useState([])
    const[errorMsg,setErrorMsg] = useState('')
   const id = useParams().id
   const navigate = useNavigate()
   
    useEffect(()=>{
        try{
        let localToken = getToken()
        if(!localToken)  navigate("/")
        const options = {
            method:'GET',
            headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'}
        }
        const getInitialPlaylist = async ()=>{
            const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`,options)
            const output = await response.json()
            const outputPlayList = {
                id:output.id,
                name:output.name,
                playlistUri:output.uri,       
                description:output.description.startsWith("<a")?"":output.description,
                image:output.images[0].url,
                tracks:output.tracks.items.map(({track})=>({
                    id:track.id,
                    name:track.name,
                    artists:track.artists.map(artist=>artist.name),
                    image:track.album.images[2].url,
                    duration:track.duration_ms,
                    album:track.album.name,
                })) 
            }
            setSelectedPlaylist(outputPlayList)
        }
        getInitialPlaylist()
    }catch(error)
    {
          console.log("Too Many requests")
       
    }
    },[id])

    const PlaySong = async (id,name,artists,image,playlistUri)=>{
        try 
        {
        let localToken = getToken()
        
        if(!localToken)  navigate("/")
        const options =  {
            method:'PUT',
            headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'},
            
        }
        const response = await axios.put('https://api.spotify.com/v1/me/player/play',{
            context_uri:playlistUri,
            offset: {
                "uri":`spotify:track:${id}`
              },
            position_ms: 0,
            
    },options)
    const currentlyPlaying = {id,name,artists,image}
   if (response.status === 403) throw new Error('* Only Prime Members have access to play the audio');
        dispatch({type:reducerCases.SET_TRACK_NUMBER,trackId:id})
        dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying})
        dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})
        setErrorMsg('')

    }catch(error)
    {
        if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.")
        else if(error.response.status ===403) alert('* Only Prime Members have access to play the audio')
    }
    }
    const getMinutes = duration =>{
            const date = new Date(duration)
            return date.getMinutes()+":"+(date.getSeconds()<10 ? "0":"")+date.getSeconds();  
    }

    return <BodyContainer darkmode={darkMode}>
    {
    selectedPlaylist.length!==0 && (
        <>
        
        <div className="playlist">
        <div className="image">
            <img src={selectedPlaylist.image} alt="selected playlist"/>
        </div>  
      
        <div className="details">
            <span className='type'>PLAYLIST</span>
            <h1 className='title'>{selectedPlaylist.name}</h1>
            <p className='description'>{selectedPlaylist.description}</p>
        </div>
        <div>
           <p style={{color:"red"}}> {errorMsg}</p>
        </div>
        
        <div className="list">
        <div className="header-row">
            <div className="col">
            <span>#</span>
        </div>
        <div className="col">
            <span>TITLE</span>
        </div>
        <div className="col">
            <span>ALBUM</span>
        </div>
        <div className="col">
            <span><AiFillClockCircle/></span>
        </div>
        </div>
       
        <ul className="tracks">
        {
        selectedPlaylist.tracks.map(({id,name,artists,image,duration,album},index)=>{
           
            return (
                <li key={id} onClick={()=>PlaySong(id,name,artists,image,selectedPlaylist.playlistUri)}>
                <div className="row" key={id}>
                    <div className="col">
                        <span>{index+1}</span>
                    </div>
                <div className="col detail">
                    <div className='image'>
                        <img src={image} alt="track"/>
                    </div>
                
                <div className='info'>
                    <span className='name'>{name}</span>
                    <span>{artists}</span>
                </div>
                </div>
                <div className="col">
                    <span>{album}</span>
                </div>
                    <div className="col">
                        <span>{getMinutes(duration)}</span>
                    </div>
                
                </div>   
                </li>             
            )
        })
    }
        </ul>
    </div>
</div>

        </>
    )
}

    </BodyContainer>
}
