import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOwnerAction } from '../../Redux-dep/actions/AdminActions';
import Success_Owner_Add_Modal from './Success_Owner_Add_Modal';
import AlertCompnenet from './../../Components/Alert/AlertCompnenet';
import Loading from './../../Components/loading/Loading';
import Navbar from '../../Pages/Users_Navbar/Navbar';

function AddOwner() {
    //input validation
    let regFirstName = /^[a-zA-Z]+$/
    let regLastName = /^[a-zA-Z]+$/
    let regEmail = /\S+@\S+\.\S+/
    let regPhone = /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/
    let regAdress = /^[a-zA-Z0-9\s,'-]*$/

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [isOpen, setisOpen] = useState(true);
    
    const dispatch = useDispatch();

    const addOwner = useSelector((state) => state.addOwner);
    const { userInfo, error, loading } = addOwner;
    
    const handleSubmit = async (event) =>{
        event.preventDefault();

        let element = {
            firstname:firstname,
            lastname:lastname,
            email:email,
            tel:tel,
            date:date,
            genre:genre,
            adress:adress,
            ville:ville
        }
        
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
        } else {
            setErrorMessage("")
            setFirstName("")
            setLastName("")
            setEmail("")
            setTel("")
            setDate("")
            setGenre("")
            setAdress("")
            setVille("")
            dispatch(addOwnerAction(element)) 
        }     
    }
  return (
      <>
        <Navbar />
        {(ErrorMessage || error) && <AlertCompnenet error={ErrorMessage || error} />}
        {loading && <Loading />}
        <div className="Pages_Container">
            <h3 className="Page_Title">Ajouter un propriétaire</h3>
            <div className="Profile-Owner_Create">
                {userInfo && <Success_Owner_Add_Modal isOpen={isOpen} setOpen={setisOpen} password={userInfo?.Password} /> }
                <Form onSubmit={handleSubmit} className="Form" >
                    <div className="row50">
                        <Form.Group className="Form_Group"  controlId="firstName">
                            <Form.Label className='Form_Lable'>Prénom</Form.Label>
                            <Form.Control 
                                className='Form_Control'
                                type="name"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group >
                        <Form.Group className="Form_Group"  controlId="lastName">
                            <Form.Label className='Form_Lable'>Nom</Form.Label>
                            <Form.Control 
                                className='Form_Control' 
                                type="name"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group >
                    </div>
                    <div className="row100">
                        <Form.Group className="Form_Group"  controlId="email">
                            <Form.Label className="Form_Lable">Adresse e-mail</Form.Label>
                            <Form.Control 
                                className="Form_Control" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group >
                    </div>
                    <div className="row50">
                        <Form.Group className="Form_Group"  controlId="phone">
                            <Form.Label className='Form_Lable'>Téléphone</Form.Label>
                            <Form.Control 
                                className="Form_Control"
                                type="phone"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </Form.Group >

                        <Form.Group className="Form_Group"  controlId="genre">
                            <Form.Label className='Form_Lable'>Sexe</Form.Label>
                            <Form.Control  
                                as="select"
                                defaultValue={genre}
                                onChange={(e) => setGenre(e.target.value)}>
                                <option disabled="disabled">Genre</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </Form.Control >
                        </Form.Group>
                    </div>
                    <div className="row100">
                        <Form.Group className="Form_Group"  controlId="dob">
                            <Form.Label className="Form_Lable">Date de naissance</Form.Label>
                            <Form.Control
                                type="date" 
                                name="dob" 
                                placeholder="Date of Birth"
                                value={date}
                                onChange={(e) => setDate(e.target.value)} 
                            />
                        </Form.Group>
                    </div>
                    <div className="row50">
                        <Form.Group className="Form_Group"  controlId="ville">
                            <Form.Label className='Form_Lable'>Ville</Form.Label>
                                <Form.Control 
                                    className="Form_Control" 
                                    type="ville"
                                    value={ville}
                                    onChange={(e) => setVille(e.target.value)}
                                />
                        </Form.Group >
                        <Form.Group className="Form_Group" controlId="adress">
                            <Form.Label className='Form_Lable'>Adress</Form.Label>
                                <Form.Control 
                                    className="Form_Control"
                                    type="adress"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                />
                        </Form.Group >
                    </div>
                    <Button type="submit" className='Form_Button'>Enregistrer</Button>
                </Form>
            </div>
        </div>
      </>
  )
}

export default AddOwner