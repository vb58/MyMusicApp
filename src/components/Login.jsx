import React,{useState} from 'react'
import { ConnectButton, LoginContainer, SpotifyImage } from '../utils/styledComponents'
import { GiMusicSpell } from 'react-icons/gi'

export const Login =()=>{
    const [userClientId,setUserClientId] = useState('')
    const [userLogin,setUserLogin] = useState(false)
   
    const onGoBack = ()=>{
        setUserLogin(false)
        setUserClientId('')
    }
    const onLogin = ()=>{
        if(userClientId==="") alert("Enter Client Id")
        else  onConnect()
    }

    const onConnect=async ()=>{
        const clientId = userLogin ? userClientId : "3f5f0dfd2a9f487790b4a2cfe57b4d5e"
        const url = "http://localhost:3000/home"
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope=['user-library-read',
            'user-read-email',
            'user-read-private',
            'user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read']
    
      window.location.href=`${apiUrl}?client_id=${clientId}&redirect_uri=${url}&scope=${scope.join(' ')}&response_type=token&show_daialog=true`
      
}
    return <LoginContainer>
        <div className='sub-container'>
        <SpotifyImage>
        <GiMusicSpell/> My Music
        </SpotifyImage>
        <div>
        { userLogin && <div className="buttons-container">
             <input type="text" placeholder="Enter your client Id" value={userClientId} onChange={(e)=>setUserClientId(e.target.value)}/>
             <div>
            <ConnectButton onClick={onLogin}>Login</ConnectButton>
            <ConnectButton onClick={onGoBack}>Go Back</ConnectButton>
            </div>
            </div>
        }
        {
            !userLogin && <>
            <ConnectButton onClick={()=>setUserLogin(!userLogin)}>Login With Client Id</ConnectButton>
            <ConnectButton onClick={onConnect}>Connect Spotify</ConnectButton>
            </>
        }
        </div>
      </div> 
    </LoginContainer>
}


