import React from 'react'
import '../styles/Card.css';
import {useState} from 'react';
import ReactCardFlip from 'react-card-flip'
import CardFront from './CardFront';
import CardBack from './CardBack';
export default function Card ({playerName, playerImg, btnRequired, flagImg, basePrice,color_primary,color_secondary,batStat,bowlStat,scale,type,overall}) {
    const [isFlipped, setIsFlipped] = useState(false);
        const flip = () => {
        setIsFlipped(!isFlipped)
    }
    
  return (
    <ReactCardFlip containerClassName="card" isFlipped={isFlipped} flipDirection='horizontal' cardStyles={scale}>
            <CardFront playerName={playerName} playerImg={playerImg} flip={flip} btnRequired={btnRequired} flagImg={flagImg} overall={overall} type={type} basePrice = {basePrice} color_primary = {color_primary} color_secondary = {color_secondary}  />
            <CardBack flip= {flip}batStat = {batStat} bowlStat={bowlStat} color_primary = {color_primary} color_secondary={color_secondary} btnRequired={btnRequired}  />
    </ReactCardFlip>
    
  )
}
