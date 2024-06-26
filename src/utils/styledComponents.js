import styled from 'styled-components'

export const SpotifyContainer = styled.div`
    max-width:100vw;
    max-height:100vh;
    overflow:hidden;
    display:grid;
    grid-template-rows:85vh 15vh;
    .spotify-body{
        display:grid;
        grid-template-columns:15vw 85vw;
        height:100%;
        width:100%;
        background-color:${props => props.darkmode ? '#2C3E50' : '#e3e3e3'} ;
        @media (max-width:767px){
            grid-template-columns: 25vw 75vw;
        }
    }
    .body{
    height:100%;
    width:100%;
    overflow:auto;
    }

`

export const SideBarContainer = styled.div`
    background-color:${(props) => props.darkmode ? 'black' : '#1c8658'};
    color:${(props) => props.darkmode ? '#b3b3b3;' : 'white'};
    display:flex;
    flex-direction:column;
    height:100%;
    box-shadow: border-box;
    .top-links{
        display:flex;
        flex-direction:column;
    .logo{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-family: "Lucida Handwriting";
        font-size:20px;
        margin:10px 0;
        svg{
            margin:0 5px;
            height: 3em;
            width: 3em;
        }
        @media (max-width:767px){
        font-size:18px;
        svg{
            height:1em;
            width:1em;
        }
        }
    }
    }
    img{
        max-inline-size:80%;
        block-size:auto;
    }
    ul{
        list-style-type:none;
        display:flex;
        flex-direction:column;
        gap:10px;
        padding:10px;
    Link{
        color:inherit;
        text-decoration: inherit;
    }
    li{
        gap:10px;
        display:flex;
        cursor:pointer;
        text-decoration:none;
        transition:0.3s ease-in-out;
        &:hover
        {
            color:${(props) => props.darkmode ? 'white' : '#1c8658'};
        }
    }
    }
    .tabs{
        background-color:${(props) => props.darkmode ? '#2e2d2d' : '#44c18b'};
        margin:10px;
        border-radius:10px;
    }
`

export const AlbumContainer = styled.div`
.playlist{
    margin:0 20px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .image{
        img{
        height: 50vh;
        box-shadow:rgba(0,0,0,0.1) 0px 25px 50 12px;
        }  
    }
    .details{
        display:flex;
        flex-direction: column;
        align-items:center;
        gap:10px;
        color:${props => props.darkmode ? '#e0dede' : 'black'} ;
        .title{
            color:${props => props.darkmode ? 'white' : 'black'} ;
            font-size:40px;
        }
    }
    .list{
        .header-row{
            display:grid;
            grid-template-columns: 0.2fr 3fr  0.1fr;
            color:${props => props.darkmode ? '#dddcdc' : 'black'} ;
            margin:10px 0 0 0;
           // position: sticky;
            padding: 20px;
            transition: 0.3s ease-in-out ;
            width:80vw;
            
        }
        .tracks{
            margin:0 20px;
            display:flex;
            flex-direction: column;
            margin-bottom: 20px;
            cursor:pointer;
            list-style-type: none;
            .row{
                padding: 5px;
                margin:10px 0 0 0;
                display:grid;
                color:rgb(171, 159, 159);
                grid-template-columns: 0.2fr 3fr  0.1fr;     
                &:hover{
                    background-color: rgba(0,0,0,0.7);
                    color:white;
                    .info{
                        .name{
                            color:white;
                        }
                    }  
                }
                .detail{
                    display:flex;
                    gap:1rem;
                }
                .image{
                    img{
                        height:50px;
                        //width:40px;
                    }
                }
                .col{
                    display:flex;    
                }
                
                .info{
                    display: flex;
                    flex-direction: column;
                    gap:10px;
                    margin:0 10px ;
                    .name{
                        color:${props => props.darkmode ? '#dddcdc' : 'black'} ;
                    }
                }
            }
        }
    }
    @media (max-width:767px){
        font-size:15px;
        .image{
            img{
                height:30vh;
            }
        }
        .details{
            .title{
                font-size:20px;
            }
        }
        .list{
            .header-row{
                width:70vw;
            }.tracks{
                font-size:15px;
            .row{
            .image{
                img{
                    height:40px;
                }
            }
        }
        }
        }
    }
}
`
export const BodyContainer = styled.div`
.playlist{
    margin:0 20px;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    .image{
        img{
        height: 50vh;
        box-shadow:rgba(0,0,0,0.1) 0px 25px 50 12px;
        }
        
    }
    .details{
        display:flex;
        flex-direction: column;
        align-items:center;
        gap:10px;
        color:${props => props.darkmode ? '#e0dede' : 'black'} ;
        .title{
            color:${props => props.darkmode ? 'white' : 'black'} ;
            font-size:40px;
        }
    }
    .list{
        .header-row{
            display:grid;
            grid-template-columns: 0.2fr 3fr 2fr 0.1fr;
            color:${props => props.darkmode ? '#dddcdc' : 'black'} ;
            margin:10px 0 0 0;
            padding: 20px;
            transition: 0.3s ease-in-out ;
            width:80vw;  
        }
        .tracks{
            margin:0 20px;
            display:flex;
            flex-direction: column;
            margin-bottom: 20px;
            cursor:pointer;
            list-style-type: none;
            .row{
                padding: 5px;
                margin:10px 0 0 0;
                display:grid;
                color:rgb(171, 159, 159);
                grid-template-columns: 0.2fr 3fr 2fr 0.1fr;    
               
                &:hover{
                    background-color: rgba(0,0,0,0.7);
                    color:white;
                    .info{
                        .name{
                            color:white;
                        }
                    }
                    
                }
                .detail{
                    display:flex;
                    gap:1rem;
                }
                .image{
                    img{
                        height:50px;
                        //width:40px;
                    }
                }
                .col{
                    display:flex;    
                }
                
                .info{
                    display: flex;
                    flex-direction: column;
                    gap:10px;
                    margin:0 10px ;
                    .name{
                        color:${props => props.darkmode ? '#dddcdc' : 'black'} ;
                    }
                }
            }
        }
    }
    @media (max-width:767px){
        font-size:15px;
        .image{
            img{
                height:30vh;
            }
        }
        .details{
            .title{
                font-size:20px;
            }
        }
        .list{
            .header-row{
                width:70vw;
            }.tracks{
                font-size:15px;
            .row{
            .image{
                img{
                    height:40px;
                }
            }
        }
        }
        }
    }
}
`

export const CurrentTrackContainer = styled.div`
display:flex;
flex-direction: row;
.track{
    display:flex;
    flex-direction: row;
    align-items:center;
    gap:10px;
    margin:0 10px;
    .track-info{
        color:${(props) => props.darkmode ? 'white;' : '#181818'};
        padding:0 10px;
        h6{
            color:${(props) => props.darkmode ? '#baabab;' : '#181818'};
        }
    }
}
    
`
export const FooterContainer = styled.div`
background-color:${(props) => props.darkmode ? '#181818;' : '#f2f4f6'};
height:100%;
width:100%;
border-top:1px solid ${(props) => props.darkmode ? '#282828;' : '#49d699'};
display:grid;
grid-template-columns: 1fr 1fr 1fr;
justify-content:center;
align-items:center;
padding:0 10px;
`
export const HomeContainer = styled.div`
display:flex;
flex-direction: column;
//align-items: center;
color:${(props) => props.darkmode ? 'white' : '#38b27d'};
gap:30px;

h1{
  color:${props => props.darkmode ? 'white' : 'black'} ;
  margin:20px;
}
ul{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    list-style-type: none;
    li{
      margin:10px;
        img{
            height:150px;
            width:150px;
            margin:10px;
            
        }
    }
    @media (max-width:767px){
        text-align:center;
        flex-direction:column;
        
        }
}
@media (max-width:767px){
        font-size:12px;
        align-items:center;
        }
`


export const LoginContainer = styled.div`
background:url('LoginBackground.jpg');
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
height:100vh;
width:100vw;
.sub-container{
box-sizing: border-box;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:50vw;
background-color:rgba(28,27,59,0.4);
border:1px solid white;
border-radius: 20px;;
height:50vh;
box-shadow: 1px 5px 5px 5px #413c3c; 

}
gap:5rem;
.buttons-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
        input{
            margin:0 5px;
            margin-bottom:10px;
            height: 3em;
            width:30vw;
            border:none;
            border-radius: 10px;
            outline:none;
            padding:10px;
        }
}


`
export const SpotifyImage = styled.div`
display:flex;
flex-direction: row;
justify-content: center;
align-items:center;
font-family: "Roboto";
color:white;
font-size:3em;
margin:10px 0;
        svg{
            margin:0 5px;
            height: 2em;
            width: 3em;
        }
@media (max-width:767px){
font-size:20px;
}
`

export const ConnectButton = styled.button`
padding:10px 20px;
border-radius:5rem;
border:none;
background-color:white;
color:#000066;
font-size:18px;
font-family:"Roboto";
cursor:pointer;
margin:10px;
    @media (max-width:767px){
        font-size:12px;
}
`


export const NavBarContainer = styled.div`
display:grid;
grid-template-columns: 2fr 0.1fr 0.1fr;
padding:30px;
position:sticky;
height:20vh;
top:0;
transition:0.3s ease-in-out;
background-color:${(props) => props.navbackground ? 'rgba(0,0,0,0.5)' : 'none'};
.arrows{
    color:${(props) => props.darkmode ? 'white' : 'black'};
    svg{
    cursor: pointer;
    }
}

.change-mode{
    cursor:pointer;
    margin-right:20px;
}
.avatar{
    position: relative;
    list-style-type:none;
    svg{
    font-size:1.3rem;
    background-color:#282828;
    border-radius:1rem;
    color:#c7c5c5;
    padding:0.1em;
    }

}
ul{
    list-style-type: none;
}
`

export const UserProfile = styled.a`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    text-decoration:none;
    background-color: ${props=>props.darkmode? 'rgb(0,0,0)':'#1c8658'};
    cursor:pointer;
    color:white;
    font-weight:bold;
    padding:10px;
    width:100px;
    
`

export const LogoutButton = styled(UserProfile)`
    background-color:rgba(0, 0, 0, 0.2);
    align-items:center;
    text-align: center;

`
export const PlayerControlsContainer = styled.div`
display:flex;
flex-direction: column;
align-items:center;
justify-content: center;
.controls{
display:flex;
flex-direction:row;
align-items:center;
justify-content: center;
gap:20px;

    svg{
        color:${props => props.darkmode ? '#b3b3b3' : '#49d699'};
        transition:0.2s ease-in-out;
        &:hover{
            color:${props => props.darkmode ? 'white' : 'black'};
        }
        cursor:pointer;
    }
    .state{
        color:white;
    }
    .state,.previous,.next{
        font-size:30px;
    }
    @media (max-width:767px){
        gap:10px;
         .state,.previous,.next{
            font-size:25px;
            
         }
        }
    
}

`

export const PlaylistsContainer = styled.div`
height:100%;
overflow:hidden;
background-color:${(props) => props.darkmode ? '#2e2d2d' : '#44c18b'};
margin:10px;
border-radius:10px;
ul{
    list-style-type:none;
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding:1rem;
    height:58vh;
    max-height:100%;
    overflow:auto;
    &::-webkit-scrollbar{
    width:0.7rem;
    &-thumb{
    background-color:rgba(255,255,255,0.6)}}
    li{
        transition:0.3s ease-in-out;
        color:${(props) => props.darkmode ? '#b3b3b3;' : 'white'};
        &:hover{
            color:${(props) => props.darkmode ? 'white' : '#1c8658'};
        }
    }
}
`

export const SearchPlaylistContainer = styled.div`
display:flex;
flex-direction: column;
color:${props => props.darkmode ? 'white' : 'black'} ;
.search-bar{
    background-color:white;
    width:30vw;
    padding:10px 20px;
    border-radius:2rem;
    border:1px solid black;
    display:flex;
    align-items:center;
    gap:10px;
}
input{
    border:none;
    height:30px;
    width:100%;
    background-color:white;
    color:black;
    &:focus{
        outline:none
    }
}
h1{
  color:${props => props.darkmode ? 'white' : 'black'} ;
  margin:20px;
}
ul{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    list-style-type: none;
    cursor:pointer;
    li{
      margin:10px;
      width:150px;
      box-sizing:content-box;
      text-align:center;
        img{
            height:150px;
            width:150px;
            margin:10px;
           
        }
    }
}

`


export const VolumeContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    input{
        width:20vw;
        border-radius: 2rem;
        height:20px;
        background-color:blue;
        cursor: pointer;
    }
    svg{
        color:${props=>props.darkmode?'#b3b3b3':'#49d699'};
        margin:0 10px;
        font-size:20px;
    }
    @media (max-width:767px)
    {
        svg{
            font-size:15px;
        }
    }
`
