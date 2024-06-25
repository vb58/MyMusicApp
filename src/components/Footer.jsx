import CurrentTrack from "./CurrentTrack"
import PlayerControls from './PlayerControls'
import { useStateProvider } from '../utils/StateProvider'
import { FooterContainer } from '../utils/styledComponents'
import Volume from "./Volume"
export const Footer=()=>{
    const [{darkMode}]=useStateProvider()
    return <FooterContainer darkmode={darkMode}>
        <CurrentTrack/>
        <PlayerControls/>
        <Volume/>
           </FooterContainer>
}
