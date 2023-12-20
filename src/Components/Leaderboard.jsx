import React from 'react'
import '../styles/Leaderboard.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Navbar from './Navbar';
import config from './Config'

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import axios from 'axios';
export default function Leaderboard() {
  const styles = [
    {
      'backgroundColor':'#FFD700'
    },
    {
      'backgroundColor':'#C0C0C0'
    },
    {
      'backgroundColor':'#574327'
    }
  ]
  const [Team,setTeam] = useState([]);

  useEffect(() => {
    const slot = localStorage.getItem("slot")
    axios.get(`${config.serverUrl}/team/all?slot=${slot}`)
    .then(({data})=>{
        data.teams.sort((a,b)=>b.score-a.score)
        setTeam(data.teams)      
    })

  },[])
  return (
    <>
    <Navbar/>
    <div className='leaderboard' >
      <div className='Leaderboard-span'>
          <span>Leaderboard</span>
      </div>
      <div className='leaderboard-body'>

        
         
          {
            
            Team.map((team,id)=>{
             return <div className='leaderboard-team-container' key={id} style={(id===0||id===1||id===2)?styles[id]:{}}> 
                  <WorkspacePremiumIcon style={{fontSize:40}} />
                <div  className='leaderboard-team-details'>
                <div>{team.name}</div>
                <div>{team.score}</div></div>
              </div>
            })
            
          }
      </div>
    </div>
    </>
  )
}
