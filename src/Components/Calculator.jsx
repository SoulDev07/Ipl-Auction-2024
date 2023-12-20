import React,{useState,useEffect} from 'react'
import '../styles/Calculator.css'
import Card from './Card'
import FunctionsIcon from '@mui/icons-material/Functions';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import config from './Config'

export default function Calculator() {
  const [isBat, setIsBat] = useState(true);
  const [score, setScore] = useState(0)
  const [teamPlayers, setTeamPlayers] = useState([])
  const [batppl, setbatppl] = useState([])
  const [batmo, setbatmo] = useState([])
  const [batdth, setbatdth] = useState([])
  const [bowlppl, setbowlppl] = useState([])
  const [bowlmo, setbowlmo] = useState([])
  const [bowldth, setbowldth] = useState([])
  const navigate = useNavigate()

  /* eslint-disable eqeqeq */
  const calculate = () => {
    let sc = 0,btppl=0,btmo=0,btdth=0,boppl=0,bomo=0,bodth=0;
    if (!(batppl.length==4&&batmo.length==4&&batdth.length==2&&bowlppl.length==3&&bowlmo.length==3&&bowldth.length==2)) {
      alert("Cannot Calculate. Enter valid team composition");
      return false;
    }
    
    batppl.forEach((p)=>{
      btppl+=Number(p.batStat.ppl);
    })
    batmo.forEach((p)=>{
      btmo+=Number(p.batStat.mo);
    })
    batdth.forEach((p)=>{
      btdth+=Number(p.batStat.dth);
    })
    
    bowlppl.forEach((p)=>{
      boppl+=Number(p.bowlStat.ppl);
    })
    bowlmo.forEach((p)=>{
      bomo+=Number(p.bowlStat.mo);
    })
    bowldth.forEach((p)=>{
      bodth+=Number(p.bowlStat.dth);
    })

    teamPlayers.forEach((p)=>{
      sc+=p.overall+p.iccRanking;

    })
    let pc = []
    let flag = false;
    for (let index = 0; index < pc.length; index++) {

      for (let j = index; j < pc.length; j++) {
        if (pc[index].playerChemistry===pc[j].playerChemistry) {
          sc+=5;
          flag = true;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    
    if (btppl>36) {
      sc+=5;
    }
    else if(btppl>32&&btppl<=36){
      sc+=3;
    }
    else if(btppl>28&&btppl<=32){
      sc+=1;
    }

    if (btmo>36) {
      sc+=5;
    }
    else if(btmo>32&&btmo<=36){
      sc+=3;
    }
    else if(btmo>28&&btmo<=32){
      sc+=1;
    }

    if (btdth>18) {
      sc+=5;
    }
    else if(btdth>16&&btdth<=18){
      sc+=3;
    }
    else if(btdth>14&&btdth<=16){
      sc+=1;
    }
    
    
    if (boppl>27) {
      sc+=5;
    }
    else if(boppl>24&&boppl<=27){
      sc+=3;
    }
    else if(boppl>21&&boppl<=24){
      sc+=1;
    }

    if (bomo>27) {
      sc+=5;
    }
    else if(bomo>24&&bomo<=27){
      sc+=3;
    }
    else if(bomo>21&&bomo<=24){
      sc+=1;
    }

    if (bodth>18) {
      sc+=5;
    }
    else if(bodth>16&&bodth<=18){
      sc+=3;
    }
    else if(bodth>14&&bodth<=16){
      sc+=1;
    }
    
  setScore(sc);
  localStorage.setItem('batppl',JSON.stringify(batppl));
  localStorage.setItem('batmo',JSON.stringify(batmo));
  localStorage.setItem('batdth',JSON.stringify(batdth));
  localStorage.setItem('bowlppl',JSON.stringify(bowlppl));
  localStorage.setItem('bowlmo',JSON.stringify(bowlmo));
  localStorage.setItem('bowldth',JSON.stringify(bowldth));
    return true;

  }
  
  const remove = (player,type) =>{
    
    if (isBat) {
      let index,arr;
      if (type==="ppl") {
        index = batppl.indexOf(player);
        arr = [...batppl];
        arr.splice(index,1);
        setbatppl(arr);
      }
      else if(type==="mo"){
        index = batmo.indexOf(player);
        arr = [...batmo];
        arr.splice(index,1);
        setbatmo(arr);
      }
      else{
        index = batdth.indexOf(player);
        arr = [...batdth];
        arr.splice(index,1);
        setbatdth(arr);
      }
    }
    else{
      let index,arr;
      if (type==="ppl") {
        index = bowlppl.indexOf(player);
        arr = [...bowlppl];
        arr.splice(index,1);
        setbowlppl(arr);
      }
      else if(type==="mo"){
        index = bowlmo.indexOf(player);
        arr = [...bowlmo];
        arr.splice(index,1);
        setbowlmo(arr);  
      }
      else{
        index = bowldth.indexOf(player);
        arr = [...bowldth];
        arr.splice(index,1);
        setbowldth(arr);
      }
    }
  }
  const set = (player,type) => {  




    let count = 0;
    if (isBat) {
      batppl.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
      batmo.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
      batdth.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
    }
    else{
      bowlppl.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
      bowlmo.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
      bowldth.forEach((p)=>{
        if (p.playerName===player.playerName) {
          count++;
        }
      })
    }
    if (count==2) {
      // let arr = [...teamPlayers];
      alert("You cannot add in more than two categories");
      // let index = teamPlayers.indexOf(player);
      // arr.splice(index,1);
      // setTeamPlayers(arr);
      return;
    }
    if (isBat) {
      let arr =[];
      if (type==="ppl") {
        if (batppl.length==4) {
          alert("Max size reached");
          return;
        }
        arr = [...batppl,player].filter((value,index,self)=>{
          return self.indexOf(value) === index;
        });
        arr = arr.slice(0,4);
        setbatppl(arr);
      }
      else if(type==="mo"){
        if (batmo.length==4) {
          alert("Max size reached");
          return;
        }
        arr = [...batmo,player].filter((value,index,self)=>{
         return self.indexOf(value) === index;
        });
        arr = arr.slice(0,4);
        setbatmo(arr);
      }
      else{
        if (batdth.length==2) {
          alert("Max size reached");
          return;
        }
        arr = [...batdth,player].filter((value,index,self)=>{
          return self.indexOf(value) === index;
        });
        arr = arr.slice(0,2);
        setbatdth(arr);
      }
    }
    else{
      let arr = [];
      if (type==="ppl") {
        if (bowlppl.length==3) {
          alert("Max size reached");
          return;
        }
        arr = [...bowlppl,player].filter((value,index,self)=>{
          return self.indexOf(value) === index;
        });
        arr = arr.slice(0,3);
        setbowlppl(arr);
      }
      else if(type==="mo"){
        if (bowlmo.length==3) {
          alert("Max size reached");
          return;
        }
        arr = [...bowlmo,player].filter((value,index,self)=>{
          return self.indexOf(value) === index;
        });
        arr = arr.slice(0,3);
        setbowlmo(arr);
        
      }
      else{
        if (bowldth.length==2) {
          alert("Max size reached");
          return;
        }
        arr = [...bowldth,player].filter((value,index,self)=>{
          return self.indexOf(value) === index;
        });
        arr = arr.slice(0,2);
        setbowldth(arr);
        
      }
    }
    
    
    // teamPlayers.splice(index,1);
  }
  const submit = ()=>{
    if(calculate()){
     
      const name = localStorage.getItem("name")
      const slot = localStorage.getItem("slot")
      axios.put(`${config.serverUrl}/score/${name}?slot=${slot}`,{score:score},{headers:{"Content-Type":"application/json"}})
      .then(({data})=>{
        alert(data.message)
        navigate("/dashboard")
      })
      .catch(({data})=>{
        alert(data.message)
      })
    }
  }
  const leftScroll = () => {
    const left = document.getElementById('scrollable-div')
    left.scrollBy(-400,0)
  }
  const rightScroll = () => {
    const right = document.getElementById('scrollable-div')
    right.scrollBy(400,0)
  }
  
  useEffect(()=>{
    const name = localStorage.getItem("name")
    const slot = localStorage.getItem("slot")
    axios.get(`${config.serverUrl}/team/${name}?slot=${slot}`)
    .then(({data})=>{
      setTeamPlayers(data.teamDetails.players)
    })
    setbatppl(JSON.parse(localStorage.getItem("batppl"))||[])
    setbatmo(JSON.parse(localStorage.getItem("batmo"))||[])
    setbatdth(JSON.parse(localStorage.getItem("batdth"))||[])
    setbowldth(JSON.parse(localStorage.getItem("bowldth"))||[])
    setbowlmo(JSON.parse(localStorage.getItem("bowlmo"))||[])
    setbowlppl(JSON.parse(localStorage.getItem("bowlppl"))||[])

  },[])
  
  /* eslint-enable eqeqeq */
  return (
    <>
    <Navbar/>
    <div className='calculator'>
        <div className='calculator-container'>
          <div className='calculate'>
            <span>Total Points:</span>
            <div className="points-container"><FunctionsIcon fontSize='inherit' style={{'transform':'scale(1.8)'}} />{score}</div>
            <button onClick={calculate}>Calculate</button>
            <button onClick={submit}>Submit</button>
            <button onClick={()=>{setIsBat(true)}} className="isbatButton">Bat</button>
            <button onClick={()=>{setIsBat(false)}} className="isbatButton">Bowl</button>
          </div>
        </div>
        <div className='calculator-player-container'>
          {
            isBat?
            <>
            <h1 className='container-title'>Batting:</h1>
              <div className='calculator-type-player-container'>
                <p>PPL:</p>
                {
                  batppl.map((player,i)=>{
                    return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <button className='remove-button' onClick={()=>{remove(player,'ppl')}}>Remove</button>
                    </div>
                  })
                }
              </div>
              <div className='calculator-type-player-container'>
                <p>MO:</p>
                {
                  batmo.map((player,i)=>{
                    return<div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                    <button className='remove-button' onClick={()=>{remove(player,'mo')}}>Remove</button>
                    </div>
                  })
                }
              </div>
              <div className='calculator-type-player-container'>
                <p>DTH:</p>
                {
                  batdth.map((player,i)=>{
                    return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <button className='remove-button' onClick={()=>{remove(player,'dth')}}>Remove</button>
                    </div>
                  })
                }
                </div>
            </>
            :<>
            <h1 className='container-title'>Bowling:</h1>
            <div className='calculator-type-player-container'>
              <p>PPL:</p>
              {
                bowlppl.map((player,i)=>{
                  return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                  <button className='remove-button' onClick={()=>{remove(player,'ppl')}}>Remove</button>
                  </div>
                })
              }
            </div>
            <div className='calculator-type-player-container'>
              <p>MO:</p>
              {
                bowlmo.map((player,i)=>{
                  return<div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0} />
                  <button className='remove-button' onClick={()=>{remove(player,'mo')}}>Remove</button>
                  </div>
                })
              }
            </div>
            <div className='calculator-type-player-container'>
              <p>DTH:</p>
              {
                bowldth.map((player,i)=>{
                  return <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                  <button className='remove-button' onClick={()=>{remove(player,'dth')}}>Remove</button>
                  </div>
                })
              }
              </div>
          </>
            
          }
          <div className="calculator-team-players-container">
              <div className='scroll-buttons-container'><p>Team Players:</p><div className='scroll-buttons'><button onClick={leftScroll}>{"<"}</button><button onClick={rightScroll}>{">"}</button></div></div>
              <div className="calculator-individual-team-player-container" id="scrollable-div">
                {
                  teamPlayers.map((player,i)=>{
                   return isBat?(player.type==="batsman"||player.type==="all rounder"||player.type==="wicket keeper"||player.type.includes("bat")||player.type.includes("all")?
                   <div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <div className='calculator-card-buttons-container'>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'ppl')}} style={{borderRadius:'0px 0px 0px 20px'}}>PPL</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'mo')}}>MO</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'dth')}} style={{borderRadius:'0px 0px 20px 0px'}}>DTH</button>
                      </div>
                   </div>:""):(player.type==="bowler"||player.type==="all rounder"||player.type.includes("bowl")||player.type.includes("all")?<div className='modifiedCard'><Card key={i} playerName={player?.playerName?player.playerName:""} playerImg ={player?.playerImg?player.playerImg:"no.png"} btnRequired={true} flagImg = {player?.flagImg?player.flagImg:"no.png"} basePrice = {player?.basePrice?player.basePrice:0} color_primary={player?.color.primary?player.color.primary:'#1A00FF'} scale={{'transform':'scale(0.5)'}} batStat={player?.batStat?player.batStat:{'ppl':0,'mo':0,'dth':0}} bowlStat={player?.bowlStat?player.bowlStat:{'ppl':0,'mo':0,'dth':0}}  color_secondary={player?.color.secondary?player.color.secondary:'#1A00FF'} type={player?.type?player.type:""} overall={player?.overall?player.overall:0}  />
                    <div className='calculator-card-buttons-container'>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'ppl')}} style={{borderRadius:'0px 0px 0px 20px'}}>PPL</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'mo')}}>MO</button>
                      <button className='calculator-card-buttons' onClick={()=>{set(player,'dth')}} style={{borderRadius:'0px 0px 20px 0px'}}>DTH</button>
                      </div>
                   </div>:"");
                  })
                }
              </div>
          </div>
        </div>
    </div>
    </>
  )
}
