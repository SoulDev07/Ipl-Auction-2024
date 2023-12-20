import axios from 'axios'
import React,{useState,useEffect} from 'react'
import '../styles/Dashboard.css'
import Card from './Card'
import Navbar from './Navbar'
import config from './Config'

import Powercard from './Powercard'
export default function Dashboard() {
  const [teamLogo, setTeamLogo] = useState('')
  const [budget, setBudget] = useState()
  const [powercards, setPowercards] = useState([])
  const [players, setPlayers] = useState([])

  useEffect(()=>{
    const name = localStorage.getItem("name")
    const slot = localStorage.getItem("slot")
    axios.get(`${config.serverUrl}/team/${name}?slot=${slot}`)
    .then(({data})=>{
      setTeamLogo(data.teamDetails.teamImg)
      setBudget(data.teamDetails.budget)
      setPlayers(data.teamDetails.players)
      setPowercards(data.teamDetails.powercards)  
    })
  },[])

  function convert(number) {
    const sign = Math.sign(Number(number));
    return Math.abs(Number(number)) >= 1.0e7
      ? sign * (Math.abs(Number(number)) / 1.0e7) + " Cr"
      : 
      Math.abs(Number(number)) >= 1.0e5
      ? sign * (Math.abs(Number(number)) / 1.0e5) + " Lakh"
      : 
      Math.abs(Number(number)) >= 1.0e3
      ? sign * (Math.abs(Number(number)) / 1.0e3) + " K"
      : Math.abs(Number(number));
  }

  return (
    <>
    <Navbar/>
    <div className='dashboard'>
        <div className='team-container'>
          <div className='team-details'>
            <div className='team-logo'><img src={teamLogo} alt="" /></div>
            <span className='budget'>Current budget:<br/> {convert(budget)} </span>
          </div>
          
          <div className='powercards'>
            <span>Powercards Available</span>
            <div className='powercard-container'>
              {
                powercards.map((pc,i)=>{
                  return <Powercard name={pc.name}  key={i} isUsed={pc.isUsed} />
                })
              }
            </div>
          </div>
        </div>
        <div className='team-player-container'>
              <p>Your Team Players:</p>
              <div className='player-container'>
                <div className='batsman-container'>
                  <span className='player-type-heading'>Batsman:</span>
                  <div className="individual-player-type-container">
                  {
                    players && players.map((player,i)=>{
                      console.log(player)
                      return player.type?.toLowerCase() === "batsman"?
                      <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}/>
                      : ""
                    })
                  }</div>
                </div>
                <div className='bowler-container'>
                  <span className='player-type-heading'>Bowler:</span>
                  <div className='individual-player-type-container'>
                  {
                    players && players.map((player,i)=>{
                      return player.type?.toLowerCase() === "bowler"?
                         <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}/>
                         : ""
                    })
                  }</div>
                </div>
                <div className='allrounder-container'>
                <span className='player-type-heading'>All rounder:</span>
                <div className="individual-player-type-container">
                {
                  players && players.map((player,i)=>{
                    return player.type?.toLowerCase() === "all rounder"?
                    <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                        : ""
                  })
                  
                }</div>
                </div>
                <div className='wicketkeeper-container'>
                <span className='player-type-heading'>Wicket Keeper:</span>
                <div className="individual-player-type-container">
                {
                  players && players.map((player,i)=>{
                    return player.type?.toLowerCase() === "wicket keeper"?
                    <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                        : ""
                  })
                  
                }</div>
                </div>
                <div className='womenassociate-container'>
                <span className='player-type-heading'>Women/Associate Player:</span>
                <div className="individual-player-type-container">
                {
                  players && players.map((player,i)=>{
                    return player.type?.includes("women player")||player.type?.includes("associate player")?
                    <Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={false} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                        : ""
                  })
                  
                }</div>
                </div>
              </div>
        </div>  
    </div>
    </>
  )
}
