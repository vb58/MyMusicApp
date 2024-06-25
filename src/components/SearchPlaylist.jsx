import React,{useState} from 'react'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import {FaSearch} from 'react-icons/fa'
import { useNavigate} from 'react-router-dom'
import { getToken } from '../utils/router'
import { SearchPlaylistContainer } from '../utils/styledComponents'
export default function SearchPlaylist() {
  const [keyword,setKeyword] = useState("")
  const [ tracks,setTracks] = useState([])

    const [{darkMode},dispatch]=useStateProvider()
    const navigate= useNavigate()

  const PlaySong = async (id)=>{
    let localToken = getToken()
    if(!localToken)  navigate("/")
    try 
    {
        const options = {
        method:'PUT',
        headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'},
        body:JSON.stringify({
            "uris":[`spotify:track:${id}`]
        })
    }
    
    await fetch('https://api.spotify.com/v1/me/player/play',options)
    
    dispatch({type:reducerCases.SET_TRACK_NUMBER,trackId:id})
  }catch(error)
  {
    if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.") 
    if(error.response.status ===403) alert('* Only Prime Members have access to play the audio')
  }
}

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMusicData(keyword);
    }
  };

  const fetchMusicData = async (keyword) => {
    
    let localToken = getToken()
      
    if(!localToken)  navigate("/")
    try {
        const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=0`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const output = await response.json();
      setTracks(output.tracks)

    } catch (error) {
     
    } finally {
     
    }
  };
  return (
    <SearchPlaylistContainer darkmode={darkMode}>
      
      <div className="search-bar" darkmode={darkMode}>
        <FaSearch color='black'/>
        <input type="text" placeholder="Search Songs"  value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress} /> 
        </div>
     
      <div className="row">
        <ul>
          {tracks.length!==0 && (tracks.items.map((element) => {
              return (
                <li key={element.id} onClick={()=>PlaySong(element.id)}>
                  <img  src={element.album.images[0].url} alt="Search playlist thumbnail"/>
                  <p>{element.name}</p>
                  </li>
                )
                }))

          }
          </ul>
        </div>

      
    </SearchPlaylistContainer>
  )
}
