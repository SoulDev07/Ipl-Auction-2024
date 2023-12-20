import React,{useState} from 'react'
import '../styles/Card.css'
import FlightIcon from '@mui/icons-material/Flight';
export default function CardFront({playerName, playerImg, btnRequired, flagImg, basePrice,color_primary,color_secondary,flip , scale,type,overall}) {
    const b = {
        'borderRadius': "30px 30px 0px 0px"
    }
    const gradient = {
        'background':`linear-gradient(to bottom right  , ${color_primary},${color_secondary} )`,
    };
    const imageOnError = (event) => {
        event.target.src = "/media/player/no.png"
      };
    
    function convert(number) {
        const sign = Math.sign(Number(number));
        return Math.abs(Number(number)) >= 1.0e7
          ? sign * (Math.abs(Number(number)) / 1.0e7) + " Cr"
          : 
          Math.abs(Number(number)) >= 1.0e5
          ? sign * (Math.abs(Number(number)) / 1.0e5) + " L"
          : 
          Math.abs(Number(number)) >= 1.0e3
          ? sign * (Math.abs(Number(number)) / 1.0e3) + " K"
          : Math.abs(Number(number));
      }
    return (
    
        <div className='cardFront' style={{...{...gradient,...scale},...(btnRequired?b:{})}} onClick = {flip} >
        <div className='player-name'>{playerName.toUpperCase()}</div>
        <div className='player-img'><div className='frontPlayerImg'><img src={playerImg} onError={imageOnError}  alt="" /></div><div className='player-front-stats'><div>{ type==="batsman"?`BAT`:type==="bowler"?`BOW`:type==="all rounder"?`ALL`:type.includes("women player")?`WPL`:type.includes("associate player")?`ASC`:type==="wicket keeper"?`WK`:""}</div><div>{overall}</div><div className='flag'><img src={flagImg}  alt="" /></div></div></div>
            
                
                <div className='card-footer' style={{...(btnRequired?{'borderRadius':'0px'}:{})}}>
                    
                    <div className='price'>Price: {convert(basePrice)} {flagImg!=="/media/flag/India.png"
?<FlightIcon fontSize='inherit'/>:""}</div>
                </div>      
                
    </div>
  )
}
