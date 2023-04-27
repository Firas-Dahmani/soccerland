import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register,login } from '../../Redux-dep/actions/authActions';
import './loginregister.css'
import AlertCompnenet from "../../Components/Alert/AlertCompnenet";

function LoginRegister() {
    const [LoginORregiterClass, setLoginORregiterClass ] = useState("sign-in-mode")

    /* Register Code  */
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [poste, setPoste] = useState("Poste");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");
    const [ErrorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();
    const dispatch = useDispatch();

    

    const userRegister = useSelector((state) => state.authRegister);
    const { error } = userRegister;

    const handleSubmitRegister = async (event) =>{
        event.preventDefault();
            const element = {
                firstname:firstname,
                lastname:lastname,
                email:email,
                tel:tel,
                date:date,
                genre:genre,
                adress:adress,
                ville:ville,
                poste:poste,
                password:password,
                pic:pic,
            }
            // Input validation
            let regFirstName = /^[a-zA-Z]+$/
            let regLastName = /^[a-zA-Z]+$/
            let regEmail = /\S+@\S+\.\S+/
            let regPhone = /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/
            let regAdress = /^[a-zA-Z0-9\s,'-]*$/

            if(!regFirstName.test(firstname)){
                setErrorMessage("Prénom non valide !")
            }else if(!regLastName.test(lastname)){
                setErrorMessage("Nom non valide !")
            }else if(!regEmail.test(email)){
                setErrorMessage("Email non valide !")
            }else if(!regPhone.test(tel)){
                setErrorMessage("Telephone non valide !")
            }else if(date === ""){
                setErrorMessage("Date non valide !")
            }else if(genre === ""){
                setErrorMessage("Genre non valide !")
            }else if(ville === ""){
                setErrorMessage("Ville non valide !")
            }else if(!regAdress.test(adress) || adress === ""){
                setErrorMessage("Adress non valide !")
            }else if(password.length < 8){
                setErrorMessage("Password should have minimum length 8 !")
            }else if(password !== confirmPassword){
                setErrorMessage("Password not match !")
            } else {
                setErrorMessage("")
                dispatch(register(element, navigate)) 
            }
    }

    //Verification Register


    /* Login code  */
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [ErrorMessageLogin, setErrorMessageLogin] = useState("");

    const userLogin = useSelector((state) => state.authLogin);
    const err = userLogin.error;

  
    const handleSubmitLogin = async (event) =>{
      event.preventDefault();

        if(emailLogin === ""){
            setErrorMessageLogin("Enter your email !")
        }else if(passwordLogin === ""){
            setErrorMessageLogin("Enter your password !")
        }else {
            setErrorMessageLogin("")
            dispatch(login(emailLogin, passwordLogin, navigate))
        }
    }

  return (
        <>
            <div className= {`containerr ${LoginORregiterClass}`}>
                <div className="forms-container">
                    <div className="signin-signup ">
                        {/* register */}
                        <Form onSubmit={handleSubmitRegister} className="sign-up-form " >
                            <h2 className="title">S'inscrire</h2>
                            {error && <AlertCompnenet error={error}/>}
                            {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
                            <div className="formRegister">
                                <div className="row50">
                                    <Form.Group className="inputBox" controlId="firstname">
                                    <Form.Label>Prénom</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="firstName"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    </Form.Group >
                                    <Form.Group className="inputBox"  controlId="lastname">
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control 
                                        autoFocus
                                        type="lastName"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    </Form.Group >
                                </div>
                                <div className="row100">
                                    <Form.Group className="inputBox"  controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control   
                                        autoComplete="off" 
                                        spellCheck="false"
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    </Form.Group >
                                </div>
                                <div className="row50">
                                    <Form.Group className="inputBox"  controlId="tel">
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control  
                                        autoFocus
                                        type="tel"
                                        value={tel}
                                        onChange={(e) => setTel(e.target.value)}
                                    />
                                    </Form.Group >

                                    <Form.Group className="inputBox"  controlId="dob">
                                        <Form.Label>Date de naissance</Form.Label>
                                        <Form.Control 
                                        type="date" 
                                        name="dob" 
                                        placeholder="Date of Birth"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)} 
                                        />
                                    </Form.Group>
                                </div>
                                <div className="row50" >
                                    <Form.Group className="inputBox"  controlId="genre">
                                    <Form.Label>Sexe</Form.Label>
                                        <Form.Control  
                                            as="select"
                                            custom ="true"
                                            defaultValue={genre}
                                            onChange={(e) => setGenre(e.target.value)}>
                                            <option disabled value="">Sexe</option>
                                            <option value="Homme">Homme</option>
                                            <option value="Femme">Femme</option>
                                        </Form.Control >
                                    </Form.Group>

                                    <Form.Group className="inputBox"  controlId="poste">
                                    <Form.Label>Poste</Form.Label>
                                        <Form.Control  
                                            as="select"
                                            custom ="true"
                                            defaultValue={poste}
                                            onChange={(e) => setPoste(e.target.value)}>
                                            <option  disabled="disabled">Poste</option>
                                            <option value="Gardien">Gardien</option>
                                            <option value="Libero">Libero</option>
                                            <option value="Défenseur">Défenseur</option>
                                            <option value="Milieu">Milieu</option>
                                            <option value="Ailier">Ailier</option>
                                            <option value="Attaquant">Attaquant</option>
                                        </Form.Control >
                                    </Form.Group>
                                </div>
                                <div className="row50">
                                <Form.Group className="inputBox"  controlId="adress">
                                <Form.Label>Adress</Form.Label>
                                <Form.Control  
                                    autoFocus
                                    type="adress"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                                </Form.Group >

                                <Form.Group className="inputBox" controlId="ville">
                                <Form.Label>Ville</Form.Label>
                                    <Form.Control 
                                        type="adress"
                                        value={ville}
                                        onChange={(e) => setVille(e.target.value)}
                                    />
                                </Form.Group >
                                </div>
                                <div className="row50">
                                    <Form.Group className="inputBox"   controlId="password">
                                    <Form.Label>Mot de passe</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    </Form.Group >

                                    <Form.Group className="inputBox"   controlId="confirmPassword">
                                    <Form.Label>Confirmez</Form.Label>
                                    <Form.Control 
                                        type="Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value) }
                                    />
                                    </Form.Group >
                                </div>
                            <Button   type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                s'inscrire
                            </Button>
                            </div>
                        </Form>

                        {/* login */}
                        <Form onSubmit={handleSubmitLogin}  className="sign-in-form">
                        
                            {err && <AlertCompnenet error={err}/>}
                            {ErrorMessageLogin && <AlertCompnenet error={ErrorMessageLogin}/>}
                            <div className="formLogin">
                            <h2 className="title">Login</h2>
                                <div className="row100">
                                <Form.Group className=" inputBox"  controlId="emailLogin">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    autoFocus
                                    type="email"
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />
                                </Form.Group >
                                </div>
                                <div className="row100">
                                <Form.Group className=" inputBox"   controlId="passwordLogin">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control required  
                                    type="password"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                                </Form.Group >
                                </div>
                                <p className="social-text" sx={{fontWeight: 'bold'}}>
                                    <Link to='reset'>Mot de passe oublié?</Link>
                                </p>
                                <Button  type="submit"  className="btn solid">
                                    Connecter
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="panels-container">

                    <div className="panel left-panel">
                    <div className="content">
                    <h3 className="mb-5"><Link  to={'/'}>Accueil <em className="fas fa-home"></em></Link></h3>
                        <h3>Nouvel utilisateur ?</h3>
                        <p>
                            Réserver votre terrain en quelques clics
                            Convoquer vos joueurs
                        </p>
                        <Button className="btn transparent" id="sign-up-btn" onClick={() => setLoginORregiterClass("sign-up-mode")}>
                            S'INSCRIRE
                        </Button>
                    </div>
                    <img src={require('../../assets/robot.gif')} className="image" alt="" />
                    </div>

                    <div className="panel right-panel">
                    <div className="content">
                        <h3 className="mb-5"><Link  to={'/'}>Accueil <em className="fas fa-home"></em></Link></h3>
                        <h3>Un de nous ?</h3>
                        <p>
                            Réserver votre terrain en quelques clics
                            Convoquer vos joueurs
                        </p>
                        <Button className="btn transparent" id="sign-in-btn" onClick={()=> setLoginORregiterClass("sign-in-mode")}>
                            CONNEXION
                        </Button>
                    </div>
                    <img src={require('../../assets/robot.gif')} className="image" alt="" />
                    </div>
                </div>
            </div>            
        </>
  )
}

export default LoginRegister