import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './notavail.css'
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux-dep/actions/authActions';

function UserNotAvail() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    
    const logoutHandler = () =>{
        dispatch(logout(navigate))
    }
  return (
    <div className="container">
            <section className="error-section">
                <h1 className="error-code">Oops ...</h1>
                <p className="error-message">Désolé, la page que vous recherchez est introuvable. jusqu'à ce que l'administrateur accepte votre compte </p>
                <img src={require("../../../assets/notavail.png")} alt="page not found" className="error-img"  />
                <Link to="/" onClick={logoutHandler} className="main-btn ">Return Home</Link>
            </section>
        </div>
  )
}

export default UserNotAvail