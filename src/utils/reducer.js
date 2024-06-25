import { reducerCases } from "./Constants";

export const initialState = {
    playlists:[],
    userInfo:null,
    trackId:null,
    playingTrack:null,
    playerState:false,
    darkMode:true,
    repeat:false,
    shuffle:false,
    songChanged:null,
    
};

export const reducer = (state,action)=>{
    switch (action.type){
        case reducerCases.SET_PLAYLISTS:{
            return {
                ...state,playlists:action.playlists
            }
        }
        case reducerCases.SET_USER:{
            return { ...state,userInfo:action.userInfo}
        }

        case reducerCases.SET_PLAYING:{
            return {...state,playingTrack:action.playingTrack}
        }
        case reducerCases.SET_PLAYER_STATE:{
            return {...state,playerState:action.playerState}
        }
 
        case reducerCases.SET_DARK_MODE:{
            return{...state,darkMode:action.darkMode}
        }
         case reducerCases.SET_REPEAT:{
            return {...state,repeat:action.repeat}
        }
        case reducerCases.SET_SONG_CHANGED:{
            return {...state,songChanged:action.songChanged}
        }
        case reducerCases.SET_TRACK_NUMBER:{
            return {...state,trackId:action.trackId}
        }
        case reducerCases.SET_SHUFFLE:{
            return {...state,shuffle:action.shuffle}
        }
        
        default: return state
    }
}

export default reducer