import { sessionService } from 'redux-react-session';
import { useState, useEffect } from 'react';
import Typed from 'typed.js';
import './Style.css'
import Loading from '../Components/loading/Loading';
import Navbar from './Users_Navbar/Navbar';

function Users_Home() {
    const [UserID, setUserID] = useState("")
    const [Photo, setPhoto] = useState("")
  
    sessionService.loadUser()
    .then((User) => {
        setUserID(User.data[0].firstName)
        setPhoto(User.data[0].pic)
    })
    .catch(()=> console.log("no user"))

    useEffect(()=> {
        if(UserID) {
            let options = {
                strings: [`${UserID}`],
                loop:true,
                typeSpeed: 200,
                backSpeed: 180,
                backDelay: 1500
            };
            let typed = new Typed('.multiText', options);
        }
    },[UserID])

  return (
    <>
        <Navbar />
        {(!UserID || !Photo) && <Loading />}
        <div className="Pages_Container ">
            <div className="overplay"></div>
            <video autoPlay loop muted playsInline className=' back-video' >
                <source src={require('../assets/Video-bg.mp4')}  type="video/mp4" />
            </video>
            <div className="Home_Page">
                <div className="Home_Text">
                    <span className='topline'>Bienvenue</span>
                    <p>Hey, <span className='multiText'></span></p>
                    <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Users_Home