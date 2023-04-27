import React, { useEffect, useState } from "react";
import Navbar from './../indexnav/Navbar';
import { useNavigate } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import "./Home.css";
import Users_Home from "../../Pages/Users_Home";

function Home() {
    let navigate = useNavigate()
    const [User, setUser] = useState("")
    const [Avail, setAvail] = useState("")
    
    sessionService.loadUser()
      .then((user) => {
        setUser(user.data[0])
        setAvail(user.data[0].isAvail)
      })
      .catch(()=> console.log("first"))

    useEffect(()=>{
      if(User.Role === 'User' && Avail === false){
        navigate('/notavail')
      }
    })

    
  return (
    <div id="container">
      { User ? <Users_Home /> : <>
          <Navbar />
          {/* <!-- image --> */}
          <div id="image">
              <img src={require("../../assets/Football_Player.png")} alt="football player png" />
          </div>

          {/* <!-- content --> */}
          <div id="content">
              <h2>RESERVER</h2>
              <h4>STADE</h4>
          </div>

          {/* <!-- icons --> */}
          <div id="icons">
              {/* <!-- visit => "fontawesome.com" for icons --> */}
              <a href="#"><em className="fab fa-facebook-f"></em></a>
              <a href="#"><em className="fab fa-instagram"></em></a>
              <a href="#"><em className="fab fa-youtube"></em></a>
              <a href="#"><em className="fab fa-twitter"></em></a>
          </div>

          {/* <!-- lines --> */}
          <div id="line1"></div>
          <div id="line2"></div>
        </>
      }
    </div>
  );
}

export default Home;

