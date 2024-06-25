import { useEffect } from 'react'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'
import { Link, useNavigate } from "react-router-dom"
import { getToken } from '../utils/router'
import { CurrentTrackContainer } from '../utils/styledComponents'
export default function CurrentTrack() {
    const [{ trackId,playingTrack, darkMode}, dispatch] = useStateProvider()
    const navigate = useNavigate()
    const getCurrentTrack = async () => {
        let localToken = getToken()
        if (!localToken) navigate("/")
        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json' }
        }
        
         await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options).then((response) => {
            if (response.data !== "") {
                const output = {
                    id: response.data.item.id,
                    albumId: response.data.item.album.id,
                    name: response.data.item.name,
                    artists: response.data.item.artists.map((artist) => artist.name),
                    image: response.data.item.album.images[2].url,
                    playlistUri:response.data.uri,
                    playerState: response.data.is_playing,
                };
                dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: output.playerState })
                dispatch({type:reducerCases.SET_PLAYING,playingTrack:output})
            }else{
                dispatch({type:reducerCases.SET_PLAYING,playingTrack:null})
            }
          })
          .catch(function (error) {
            if (error.response.status===403) {
                alert("Refresh the token in developer spotify before using new client id.")
                console.log("in current track error")
             return navigate("/")
            }
          })
      
    }

    useEffect(() => {
        getCurrentTrack()
    },[dispatch,trackId,playingTrack])

    return (
        <CurrentTrackContainer darkmode={darkMode}>
            {   playingTrack && (
                    <Link to={`/album/${playingTrack.albumId}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                        <div className="track">
                            <div className="track__image">
                                <img src={playingTrack.image} alt="currently playing" />
                            </div>
                            <div className="track-info">
                                <h4>{playingTrack.name}</h4>
                                <h6>{playingTrack.artists.join(",")}</h6>
                            </div>
                        </div>
                    </Link>
                )
            }
           
        </CurrentTrackContainer>
    )
}
