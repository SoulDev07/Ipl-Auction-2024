import React from 'react'
import '../styles/Powercard.css'
import { Tooltip } from '@mui/material'
export default function Powercard({name,isUsed}) {
    let powercards = [
        {
            'name':'juzzbuzz',
            'desc':'Player can kick any team out of a particular bid.'
        },
        {
            'name':'nxt3',
            'desc':'Player will be shown the names of the next 3 upcoming players.'
        },
        {
            'name':'focusfire',
            'desc':'User can place any player that they have bought back for auction.'
        },
        {
            'name':'unoreverse',
            'desc':"Player with this card can change their any player (his value must be greater than 1/3rd of other player's values) with any player of other team"
        }
    ]
    
    const p = powercards.find( pc => pc.name.toLowerCase() === name.toLowerCase())
    if (!p) {
        return <div className="powercard">Invalid Powercard</div>;
      }
  return (
    <div className='powercard' >
        <Tooltip title={<h1>{p.name.charAt(0).toUpperCase()+p.name.slice(1)}:<br />{ p.desc}</h1>} followCursor>
            <img src={`/media/powercards/${p.name}.jpg`} style={!isUsed?{}:{'filter':'grayscale(100%)'}} alt="" />
        </Tooltip>       
    </div>    
  )
}
