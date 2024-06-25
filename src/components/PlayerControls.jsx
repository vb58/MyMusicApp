import React from 'react'
import { RiRepeatLine,RiRepeatOneFill } from "react-icons/ri";
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import axios from 'axios'
import { getToken } from '../utils/router'
import { PlayerControlsContainer } from '../utils/styledComponents'
import { useNavigate } from 'react-router-dom'

export default function PlayerControls() {
  const [{ repeat,shuffle, playerState, darkMode }, dispatch] = useStateProvider()

  const navigate = useNavigate()
  
  const changeTrack = async (type) => {
    let localToken = getToken()
    if (!localToken) navigate("/")
    try {
      const url = `https://api.spotify.com/v1/me/player/${type}`;
      let options = { headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json', 
      } };
      const response = await axios.post(url,{}, options)
      if (response.status === 403) throw new Error('* Only Prime Members have access for play controls');
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const getCurrentTrack = async () => {
            let localToken = getToken()
            if (!localToken) navigate("/")
            const options = {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json' }
            }

            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', options)
            if (response.data !== "") {
                const currentlyPlaying = {
                  id: response.data.item.id,
                  name: response.data.item.name,
                  artists: response.data.item.artists.map((artist) => artist.name),
                  image: response.data.item.album.images[2].url,
                };
                dispatch({type:reducerCases.SET_PLAYING,playingTrack:currentlyPlaying})
                dispatch({type:reducerCases.SET_TRACK_NUMBER,trackId:currentlyPlaying.id})
            }
        }

        getCurrentTrack()
   

    } catch (error) {
      if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.")
        else if(error.response.status ===403) alert('* Only Prime Members have access to change the track')
      else      alert(error.message)
    }

  }

  const ResumeSong = async (resume) => {

    let localToken = getToken()
    if (!localToken) navigate("/")
    try {
      const url = resume ? 'https://api.spotify.com/v1/me/player/pause' : 'https://api.spotify.com/v1/me/player/play'

      let options = {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json', }
      };
      const response = await fetch(url, options)
      if (response.status === 403) throw new Error('* Only Prime Members have access for play controls');
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !resume })
    } catch (error) {
      alert(error.message)
    }

  }

  const toggleShuffle = async () => {

    let localToken = getToken()

    if (!localToken) navigate("/")
    try {
      const url = `https://api.spotify.com/v1/me/player/shuffle?state=${!shuffle}`

      let options = {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json', }
      };
      await fetch(url, options)
      dispatch({type:reducerCases.SET_SHUFFLE,shuffle:!shuffle})
    } catch (error) {
      if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.")
        else if(error.response.status ===403) alert('* Only Prime Members have access to change the track')
      else      alert(error.response.message)
    }

  }


  const RepeatMode = async (repeat) => {

    let localToken = getToken()

    if (!localToken) navigate("/")
    try {
      const stateValue = repeat ? 'track' : 'off'
      const url = `https://api.spotify.com/v1/me/player/repeat?state=${stateValue}`
      const options = {
        method: 'PUT',
        headers: { 'Authorization': 'Bearer ' + localToken, 'Content-type': 'application/json', }
      };
      await fetch(url, options)
      
      dispatch({ type: reducerCases.SET_REPEAT, repeat: repeat })
    } catch (error) {
      if(error.response.status===404) alert("No active device found. Please open Spotify and play a song.")
        else if(error.response.status ===403) alert('* Only Prime Members have access to change the track')
      else      alert(error.response.message)
    }
  }

  return (
    <PlayerControlsContainer darkmode={darkMode}>
     <div className="controls">
      <div className='shuffle'>
        <BsShuffle color={shuffle? 'red': ''} onClick={toggleShuffle}/>
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? <BsFillPauseCircleFill onClick={() => ResumeSong(true)} /> : <BsFillPlayCircleFill onClick={() => ResumeSong(false)} />}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        {repeat ? <RiRepeatOneFill color="red" onClick={() => RepeatMode(false)} /> : <RiRepeatLine  onClick={() => RepeatMode(true)} />}

      </div>
      </div>
     
    </PlayerControlsContainer>
  )
}
