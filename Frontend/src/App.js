import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { sessionService } from "redux-react-session";
import Home from './index/main/Home';
import BasicRoute from './Utils/BasicRoute';
import AuthRoute from './Utils/AuthRoute';
import Contact from './index/contact/Contact';
import Profile from './Pages/User_Profile/Profile';
import Chatpage from './Pages/Chat_Page/ChatPage';
import Search_Users from "./Pages/Search_User/Search_User";
import SeeUser from './Pages/See_User/SeeUser';
import LoginRegister from './auth/loginregister/LoginRegister';
import Reset from './auth/reset/reset';
import ResetPasswordDone from './auth/reset-password-done/RsetPasswordDone';
import EmailSent from './auth/EmailSent/EmailSent';
import Profile_admin from './admin/Profile/Profile';
import AddOwner from './admin/addOwner/AddOwner';
import Crud_Stade from "./Pages/Crud_Stades/Crud_Stades";
import VilleCRUD from './admin/Add_Ville';
import AcceptUser from './admin/AcceptUser';
import Crud_Reservations from "./Pages/Crud_Reservations/Crud_Reservations";
import Reserver from './User/Search_Stade';
import ShowStade from './User/ShowStade';
import SearchGroup from './User/searchGroup';
import UserNotAvail from './Pages/Error_Pages/UserNotAvail/UserNotAvail';
import NotFound from './Pages/Error_Pages/NotFound/NotFound';
import { io } from 'socket.io-client';
import { ChatState } from "./Pages/Chat_Page/Context/ChatProvider";



function App() {
  const session = useSelector((state) => state.session);
  const { checked } = session;

  const [Role, setRole] = useState("")
  const [User, setUser] = useState("")
  const [Avail, setAvail] = useState()
  const { socket, setsocket} = ChatState();
  
  sessionService.loadUser()
  .then((User) => {
    setRole(User.data[0].role)
    setUser(User.data[0])
    setAvail(User.data[0].isAvail)
  })
  .catch(()=> console.log("no user"))

  useEffect(() => {
    setsocket(io("https://soccer2land.herokuapp.com"))
  }, []);

  useEffect(() => {
    socket?.emit("setup", User);
  }, [socket, User]);

  return (
      <div className="App">
        <Router>
          {checked && (
            <Routes>
              {/* Root */}
              <Route path="/" element={<Home /> } />
              <Route path="/contact" element={<BasicRoute><Contact /></BasicRoute>} />
              <Route path="/profile" element={<AuthRoute><Profile /> </AuthRoute>} />
              <Route path="/chat" element={<AuthRoute><Chatpage /> </AuthRoute>} />
              <Route path="/chat/:id" element={<AuthRoute><Chatpage /></AuthRoute>} />
              <Route path="/rechercher" element={<AuthRoute> <Search_Users /> </AuthRoute>} />
              <Route path="/userprofile/:id" element={<AuthRoute><SeeUser /> </AuthRoute>} />
              {/* Login Register */}
              <Route path="/registerlogin/" element={<BasicRoute><LoginRegister /></BasicRoute>} />
              {/* Reset Password */}
              <Route path="registerlogin/reset" element={<BasicRoute><Reset /></BasicRoute>} />
              <Route path="registerlogin/resetPasswordDone/:userId/:resetString" element={<BasicRoute><ResetPasswordDone /></BasicRoute>} />
              {/* Email Confimation */}
              <Route path="/emailsent">
                <Route path="" element={<BasicRoute><EmailSent /></BasicRoute>} />
                <Route path=":userEmail" element={<BasicRoute><EmailSent /></BasicRoute>} />
                <Route path=":userEmail/:reset" element={<BasicRoute><EmailSent /></BasicRoute>} />
              </Route>
              {/* Admin Router */}
              { Role === "Admin"  && <>
                  <Route path="/profile_admin" element={<AuthRoute><Profile_admin /> </AuthRoute>} />
                  <Route path="/addowner" element={<AuthRoute><AddOwner/> </AuthRoute>} />
                  <Route path="/stade" element={<AuthRoute><Crud_Stade /> </AuthRoute>} />
                  <Route path="/ville" element={<AuthRoute><VilleCRUD /> </AuthRoute>} />
                  <Route path="/acceptuser" element={<AuthRoute><AcceptUser /> </AuthRoute>} />
                  <Route path="/showreservation" element={<AuthRoute><Crud_Reservations /> </AuthRoute>} />
                </>
              }
              {/* Owner Router */}
              { Role === "Owner"  && <>
                  <Route path="/stade" element={<AuthRoute><Crud_Stade /> </AuthRoute>} />
                  <Route path="/showreservation" element={<AuthRoute><Crud_Reservations /> </AuthRoute>} />
                </>
              }
              {/* User Router */}
              { Role === "User"  && Avail === true ?  <>
                  <Route path="/search_stade" element={<AuthRoute><Reserver /> </AuthRoute>} />
                  <Route path="/Stade/:idStade" element={<AuthRoute><ShowStade /> </AuthRoute>} />
                  <Route path="/searchGroupe" element={<AuthRoute><SearchGroup /> </AuthRoute>} />
                </> : 
                  <Route path="/notavail" element={<AuthRoute><UserNotAvail /> </AuthRoute>} />
              }
              {/* ERROR */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </Router>
      </div>
  );
}

export default App;
