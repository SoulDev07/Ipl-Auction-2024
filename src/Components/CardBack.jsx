import React from 'react'
import '../styles/Card.css'
export default function CardBack({batStat,bowlStat,color_primary,color_secondary,flip,scale,btnRequired}) {
    let gradient = {
        'background':`linear-gradient(to bottom right  , ${color_primary},${color_secondary} )`
    };
    const b = {
        'borderRadius': "30px 30px 0px 0px"
    }
    return (
    
    <div className='cardBack' style={{...{...gradient,...scale},...(btnRequired?b:{})}} onClick={flip}>
                <div className='batStat'>
                    <span>BAT</span>
                    <span>{batStat.ppl} PPL</span>
                    <span>{batStat.mo} MO</span>
                    <span>{batStat.dth} DTH</span>
                </div>
                <div className='bowlStat'>
                    <span>BOWL</span>
                    <span>{bowlStat.ppl} PPL</span>
                    <span>{bowlStat.mo} MO</span>
                    <span>{bowlStat.dth} DTH</span>
                </div>
            </div>
  )
}
