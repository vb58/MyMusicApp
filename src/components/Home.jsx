import { useEffect, useState} from "react";
import { useStateProvider } from "../utils/StateProvider";
import { getToken } from "../utils/router";
import { HomeContainer } from "../utils/styledComponents";
import { Link,useNavigate } from 'react-router-dom'

export const Home = ()=>{
    const [{darkMode},dispatch] = useStateProvider()
    const [popList,setPopList] = useState([])
    const navigate = useNavigate()
    
  useEffect(()=>{
    try
    {
    const getPopularPlayListData = async ()=>{  
      let localToken = getToken() 
      if(!localToken)  navigate("/")

      const options = {
          method:'GET',
          headers:{'Authorization':'Bearer '+localToken,'Content-type':'application/json'}
      }
      const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists',options)
      const outputData = await response.json()
      const popularPlaylist = {
        next:outputData.playlists.next,
        items:outputData.playlists.items.map(eachitem=>({
          id:eachitem.id,
          images:eachitem.images,
          name:eachitem.name
        }))
      }
      setPopList(popularPlaylist)
    }
    getPopularPlayListData()
  }catch(error)
  {
        console.log("Too Many requests")
      
  }
  },[dispatch])

    return (
        <HomeContainer darkmode={darkMode}>
            <h1>Popular Playlists</h1>
      <ul>
        { popList.length!==0 &&
          popList.items.map(eachPlaylist=>{
            const linkPath = `/playlist/${eachPlaylist.id}`
          return (
          <Link to={linkPath} key={eachPlaylist.id} style={{color:"inherit",textDecoration:"inherit"}}>
          <li key={eachPlaylist.id}>
            <img src={eachPlaylist.images[0].url} alt="popular playlist thumbnail"/>
            <p>{eachPlaylist.name}</p>
            </li>
            </Link>
          )
          })
        }
      </ul>
        </HomeContainer>
    )
}
