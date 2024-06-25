import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Home } from "../components/Home";
import SearchPlaylist from "../components/SearchPlaylist";
import { DisplayPlayList } from "../components/DisplayPlayList";
import { Album } from "../components/Album";
import Cookies from 'js-cookie'
import ProtectedRoute from "./ProtectedRoute";
import { reducerCases } from "./Constants";

const getAccessToken =()=>{
    const hash=window.location.hash;
    if(hash){
      const token=hash.substring(1).split("&")[0].split("=")[1]
      const expiresTime = hash.substring(1).split("&")[2].split("=")[1]
      console.log(token)
      Cookies.set(reducerCases.SET_TOKEN,token,{expires: new Date(new Date().getTime()+expiresTime)})
      }
    return Cookies.get(reducerCases.SET_TOKEN)
}

export const getToken = ()=>{
    const localToken = Cookies.get(reducerCases.SET_TOKEN)

    return localToken
}

const isAuthenticated = ()=> {return !!getAccessToken()};

const router = createBrowserRouter(
[
    {
        path:"/",
        element:<Login/>,
        index:true
    },
    {
        element:<ProtectedRoute isAuthenticated={isAuthenticated()}/>,
        children:[
            {
                path:"/home",
                element:<Home/>
            },
            {
                path:"/search",
                element:<SearchPlaylist/>
            },
            {
                path:"/playlist/:id",
                element:<DisplayPlayList/>
            },
            {
                path:"/album/:id",
                element:<Album/>
            },   

        ]
    },
    {
        path:"*",
        element:<p>404 Error.. Nothing here</p>
    }
]

)

export default router