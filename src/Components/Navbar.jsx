import React,{useState,useEffect,useRef} from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Fab } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import GroupsIcon from '@mui/icons-material/Groups';
import {Drawer} from '@mui/material';
import { CSSTransition } from 'react-transition-group';
export default function Navbar() {
    const p = useParams()
    const isMobile = useMediaQuery({query:"(max-width:1000px)"});
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef(null); 
    const navigate = useNavigate()
    const teams = ["CSK","DC","GT","KKR","LSG","MI","PBKS","RCB","RR","SRH"]
    useEffect(() => {
      setIsOpen(false)
    }, [p])
    
    const handleClose = () =>{
        setOpen(!open);
    };
  return (
    <nav>
        <div className='nav1'>
            <div className="logo">
                <Link to="/dashboard"><img src='/media/logo.png' alt="" /></Link>
            </div>
            
            <span>
                <Link to="/dashboard">{!isMobile?<>Welcome to IPL Auction 2023</>:<><div>IPL Auction 2023</div></>}</Link>
                {!isMobile?<></>:
                <Fab size='small' onClick={handleClose}>
                    <MenuIcon/>
                </Fab>
                    
                }
            </span>
        </div> 
        {
            open?
            <CSSTransition nodeRef={nodeRef} in={open} timeout={200} classNames="my-node">
            <div ref={nodeRef} className={`mobNavbar`} >
            <Link to="/search">
                <button className="nav-item"><SearchIcon /> Search</button>
            </Link>
            <Link to="/leaderboard">
                <button className="nav-item"><EmojiEventsIcon />Leaderboard</button>
            </Link>
            <Link to="/calculator">
                <button className="nav-item"><CalculateIcon /> Calculator</button>
            </Link>
            <div  type="text" style={{backgroundColor:'transparent',color:'white'}} onClick={()=>{setIsOpen(true)}} >
                
                <button className='nav-item'><GroupsIcon/>Other Teams</button>
            </div>
            <div  type="text" style={{backgroundColor:'transparent',color:'white'}} onClick={async()=>{
                if(window.confirm("Are you sure want to logout"))
                {localStorage.clear();
                navigate("/");}
            }}>
                <button className='nav-item'><LogoutIcon/>Log Out</button>
            </div>
        </div></CSSTransition>:<></>
        }
        {!isMobile?
        <div className="nav2">
            
            <Link to="/search">
                <button className="nav-item"><SearchIcon /> Search</button>
            </Link>
            <Link to="/leaderboard">
                <button className="nav-item"><EmojiEventsIcon />Leaderboard</button>
            </Link>
            <Link to="/calculator">
                <button className="nav-item"><CalculateIcon /> Calculator</button>
            </Link>
            <div  type="text" style={{backgroundColor:'transparent',color:'white'}} onClick={()=>{setIsOpen(true)}} >
                
                <button className='nav-item'><GroupsIcon/>Other Teams</button>
            </div>
            <div  type="text" style={{backgroundColor:'transparent',color:'white'}} onClick={async()=>{
                if(window.confirm("Are you sure want to logout")){
                    localStorage.clear();
                    navigate("/");
                }
            }}>
                
                <button className='nav-item'><LogoutIcon/>Log Out</button>
            </div>
        </div>:""

        }
        <Drawer anchor='left' open={isOpen} onClose={()=>setIsOpen(false)} >
            <div  className='sidebar'>
                <div className='sidebar-team-names' >Other Teams</div>
                {
                    teams.map((t,i)=>{
                        return <Link className='sidebar-team-names' key={i} to={`/otherteams/${t}`}  ><img src={`/media/teamlogo/${t.toLowerCase()}.png`}/>{t}</Link>
                    })
                }
            </div>
        </Drawer>
    </nav>
  )
}
