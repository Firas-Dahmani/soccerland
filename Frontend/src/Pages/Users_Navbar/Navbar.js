import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux';
import { logout } from "../../Redux-dep/actions/authActions";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import { Effect } from 'react-notification-badge';
import './navbar.css'
import { sessionService } from "redux-react-session";
import {  useEffect, useState } from "react";
import { profileSeenAction } from "../../Redux-dep/actions/RootAction";
import { ChatState } from "../Chat_Page/Context/ChatProvider";
import { getSender} from "../Chat_Page/config/ChatLogics";
import { Text } from "@chakra-ui/react";
import Button  from 'react-bootstrap/Button';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [Role, setRole] = useState("");
    const [user, setUser] = useState("");
    const [Notification, setNotification] = useState([]);
    const [Messages, setMessages] = useState([]);
    
    

    const {socket} = ChatState()
    // console.log(notification) 
    
    useEffect(() => {
        dispatch(profileSeenAction())
    }, []);

    const profileSeen = useSelector((state) => state.profileSeen)
    const { seeProfile } = profileSeen
    
    useEffect(() => {
        seeProfile?.notification && seeProfile.notification.map((n)=> {
            n.__Notification == "M" 
            ? setMessages(Messages => [...Messages, n.content]) 
            : setNotification(Notification => [...Notification, n])
        })
    },[seeProfile]);
    
    sessionService.loadUser()
    .then((User) => {
        setRole(User.data[0].role)
        setUser(User.data[0])
    })

    useEffect(() => {
        socket?.on("new Reservation", (reservation) => {
            setNotification([...Notification, reservation ])
        })
    },[socket]);

    useEffect(() => {
        socket?.on("new request", (chat) => {
            setNotification([...Notification, chat ])
        })
    },[socket]);

    useEffect(() => {
        socket?.on("message recieved", (newMessageRecieved) => {
            setMessages([...Messages, newMessageRecieved ])
        });
    });
    
    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }


  return (
    <>
        <div className="Menu-head ">
                <div className="left-menu-bar ">
                    <input type="checkbox" className="toggler" />
                    <div className="hamburger"><div></div></div>
                    <div className="menu">
                        <div>
                            <div>
                                <ul>
                                    { Role === "Admin" &&
                                        <>
                                            <li><i className="fa fa-home" aria-hidden="true"></i><Link className="nav-admin"  to='/' >Accueil</Link></li>
                                            <li><i className="fa fa-id-card" aria-hidden="true"></i><Link className="nav-admin"  to='/profile_admin' >Profile</Link></li>
                                            <li><i className="fa fa-map-pin" aria-hidden="true"></i><Link className="nav-admin"  to='/ville' >Ville</Link></li>
                                            <li><i className="fa fa-futbol" aria-hidden="true"></i><Link className="nav-admin"  to='/stade' >Stade</Link></li>
                                            <li><i className="fa fa-user"></i> <Link className="nav-admin"  to='/addowner' ><span>Client</span></Link></li>
                                            <li><i className="fa fa-ticket" aria-hidden="true"></i><Link className="nav-admin"  to='/showreservation' >Reservation</Link></li>
                                            <li><i className="fa fa-search" aria-hidden="true"></i><Link className="nav-admin"  to='/rechercher' >Rechercher</Link></li>
                                            <li><i className="fa fa-comment" aria-hidden="true"></i><Link className="nav-admin"  to='/chat' >Message</Link></li>
                                            <li><i className="fa fa-user-plus" aria-hidden="true"></i><Link className="nav-admin"  to='/acceptuser' >Demande</Link></li>
                                        </>
                                    }
                                    { Role === "User" &&
                                        <>
                                            <li><i className="fa fa-home" aria-hidden="true"></i><Link className="nav-admin"  to='/' >Accueil</Link></li>
                                            <li><i className="fa fa-id-card" aria-hidden="true"></i><Link className="nav-admin"  to='/profile' >Profile</Link></li>
                                            <li><i className="fa fa-ticket" aria-hidden="true"></i><Link className="nav-admin"  to='/search_stade' >Reserver</Link></li>
                                            <li><i className="fa fa-search" aria-hidden="true"></i><Link className="nav-admin"  to='/rechercher' >Rechercher</Link></li>
                                            <li><i className="fa fa-comment" aria-hidden="true"></i><Link className="nav-admin"  to='/chat' >Message</Link></li>
                                            <li><i className="fa fa-users" aria-hidden="true"></i><Link className="nav-admin"  to='/searchGroupe' >Groupe</Link></li>
                                        </>
                                    }
                                    { Role === "Owner" &&
                                        <>
                                            <li><i className="fa fa-home" aria-hidden="true"></i><Link className="nav-admin"  to='/' >Accueil</Link></li>
                                            <li><i className="fa fa-id-card" aria-hidden="true"></i><Link className="nav-admin"  to='/profile' >Profile</Link></li>
                                            <li><i className="fa fa-ticket" aria-hidden="true"></i><Link className="nav-admin"  to='/showreservation' >Reservation</Link></li>
                                            <li><i className="fa fa-futbol" aria-hidden="true"></i><Link className="nav-admin"  to='/stade' >Stade</Link></li>
                                            <li><i className="fa fa-search" aria-hidden="true"></i><Link className="nav-admin"  to='/rechercher' >Rechercher</Link></li>
                                            <li><i className="fa fa-comment" aria-hidden="true"></i><Link className="nav-admin"  to='/chat' >Message</Link></li>
                                        </>
                                    }
                                    {/* <!-- login Button --> */}
                                    <li id="login">
                                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                                        <Link  className="nav-admin" onClick={logoutHandler}  to='/registerlogin' >Déconnecter</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <!-- logo --> */}
                    <label > <img src={require("../../assets/logo.png")} width="40" height="40" className="rounded-circle" /> <b>TAKWIRETNA</b></label>

                </div>
                
                <div className="right-menu-item">
                    <ul className="list-unstyled Notif">
                        <li className="nav-item dropdown">
                            <NotificationBadge
                                count={Messages?.length}
                                effect={Effect.SCALE}
                            />
                        <a className="nav-link " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                            <i className="fa fa-envelope icon-msg" aria-hidden="true"></i>
                        </a>
                        <div className="dropdown-menu dropdown-msg " >
                            {!Messages?.length > 0 && <p> No New Messages</p>}
                            {Messages.map((M, key) => (
                                <div key={key}>
                                    {   M.chat.isGroupChat 
                                        ? 
                                            (
                                                <Text fontSize="xs">
                                                    <b>New Message in {M.chat.chatName} : </b>
                                                    {M.content.length > 50
                                                    ? M.content.substring(0, 51) + "..."
                                                    : M.content}
                                                </Text>
                                            )
                                        :
                                            (
                                                <Text fontSize="xs">
                                                    <b>New Message from {getSender(user, M.chat.users)} : </b>
                                                    {M.content.length > 50
                                                    ? M.content.substring(0, 51) + "..."
                                                    : M.content}
                                                </Text>
                                            )         
                                    }
                                </div>
                            ))}
                        </div>
                        </li> 
                    </ul> 

                    <ul className="list-unstyled Notif" >
                        <li className="nav-item dropdown">
                            <NotificationBadge
                                count={Notification?.length}
                                effect={Effect.SCALE}
                            />
                        <a className="nav-link " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown">
                            <i className="fa fa-bell icon-notif" aria-hidden="true"></i>
                        </a>
                        <div className="dropdown-menu dropdown-notif" >
                            {!Notification?.length && <p> No New Notification</p>}
                            {Notification.map((N, key) => (
                                <p key={key}>
                                    {
                                        N.__Notification == 'R' ? 
                                        <Text fontSize="xs">
                                            <b>{N.content.StadeId.Nom} est reserver </b>
                                        </Text> 
                                        :
                                        <Text fontSize="xs">
                                            <b>Nouveau demande dans {N.content.chatName} </b>
                                        </Text>
                                    }
                                </p>
                            ))}
                        </div>
                        </li> 
                    </ul>
                    <img src={user.pic} width="40" height="40" className="rounded-circle" />
                </div>
        </div>
    </>
  )
}

export default Navbar