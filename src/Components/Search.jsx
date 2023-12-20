import React,{useState} from 'react'
import '../styles/Search.css'
import SearchIcon from '@mui/icons-material/Search';
import Card from './Card';
import Navbar from './Navbar';
import axios from 'axios';
import html2canvas from 'html2canvas';
import config from './Config'


export default function Search() {
  const [searchQuery, setSearchQuery] = useState(null)
  const [typeOfPlayer, setTypeOfPlayer] = useState(null)
  const [players,setPlayers] = useState()

  const submit = async(e) =>{
      e.preventDefault()
      let url = `${config.serverUrl}/players?`
      if(searchQuery && !typeOfPlayer)
        url = url + `playerName=${searchQuery}`
      else if(!searchQuery && typeOfPlayer)
        url = url + `type=${typeOfPlayer}`
      else if(typeOfPlayer && searchQuery)
        url = url + `playerName=${searchQuery}&type=${typeOfPlayer}`
      axios.get(url)
      .then(({data})=>{
        setPlayers(data.players)
      })
  }

  return (
    <>
    <Navbar />
    <div className='search'>
      <div className='searchBar'>
        <form onSubmit={submit}>
          <div>          <label htmlFor="query"><SearchIcon/></label>
          <input type="text" name='query' value={searchQuery} placeholder="Search" onChange={ (e)=>{setSearchQuery(e.target.value)}} autoComplete="off"/></div>
          
          <select className='menu-item' name="type" onChange={(e)=>setTypeOfPlayer((e.target.value).toLowerCase())}>
            <option className='menu-item' value="Batsman">Batsman</option>
            <option className='menu-item' value="Bowler">Bowler</option>
            <option className='menu-item' value="All Rounder">All Rounder</option>
            <option className='menu-item' value="Women Player">Women Player</option>
            <option className='menu-item' value="Associate Player">Associate Player</option>
          </select>
          <button type='submit'><SearchIcon/></button>
        </form>
      </div>
      <div className="searchResults">
        {
          players && players.map((player,i)=>{
            return <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(1.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
          })
        }
      </div>
    </div>
    </>
  )
}
