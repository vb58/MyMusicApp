import {MdHomeFilled,MdSearch} from 'react-icons/md'
import { GiMusicSpell } from "react-icons/gi";
import { PlayLists } from './PlayLists'
import { useStateProvider } from '../utils/StateProvider'
import {Link} from 'react-router-dom'
import { SideBarContainer } from '../utils/styledComponents'
export const Sidebar=()=>{
    const [{darkMode}] = useStateProvider()
   
    return <SideBarContainer darkmode={darkMode}>
<div className='top-links'>
    <div className='logo'>
    <GiMusicSpell/> My Music
    </div>
    <ul className="tabs">
        <Link to="/home" style={{color:'inherit',textDecoration:'inherit'}}>
        <li key="home" ><MdHomeFilled/>
            Home</li></Link>
        <Link to="/search" style={{color:'inherit',textDecoration:'inherit'}}>
        <li key="search"><MdSearch/>
            Search</li> </Link>
    </ul>
     <PlayLists/>
    
</div>

    </SideBarContainer>
}
