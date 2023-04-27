import Form  from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button  from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { profileSeenAction, updatePicAction, updateUserProfile } from '../../Redux-dep/actions/RootAction';
import AlertCompnenet from '../../Components/Alert/AlertCompnenet';
import Loading from '../../Components/loading/Loading';
import Navbar from '../Users_Navbar/Navbar';
import RenderImage from './../../Components/Image/Image';

function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch()

    const profileSeen = useSelector((state) => state.profileSeen)
    const { seeProfile, loading, error } = profileSeen

    const updatePic = useSelector((state) => state.updatePic)
    const { success : UploadPhotoSUCCESS, loading : LoadUploadPhoto, error : Update_Pic_Error } = updatePic

    const userUpdate = useSelector((state) => state.UpdateProfile)
    const { success : userUpdateSUCCESS, loading : userUpdateLoading, error: userUpdateError } = userUpdate

    useEffect(()=> {
        if(pic){
            dispatch(updatePicAction(pic))
        }
    }, [dispatch,pic])

    useEffect(()=> {
        dispatch(profileSeenAction())
    },[dispatch,UploadPhotoSUCCESS, userUpdateSUCCESS])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        let element = {
            firstName:firstName,
            lastName:lastName,
            email:email, 
            tel:tel,
            date:date ,
            genre:genre,
            adress:adress,
            ville:ville,
            password:password
        }

        if ( password !== confirmPassword){
            setErrorMessage("Le mot de passe ne correspond pas !")
        } else {
            setErrorMessage("")
            dispatch(updateUserProfile(element))
        } 
    }


    return (
    <>
        <Navbar />
        <div className="Pages_Container">
            {(ErrorMessage || error || Update_Pic_Error || userUpdateError) && <AlertCompnenet error={ErrorMessage || error || Update_Pic_Error || userUpdateError} />}
            {(loading || userUpdateLoading || LoadUploadPhoto) && <Loading />}
            <div className="Profile_Container">
                <div className="Profile-Left-Section">
                    <RenderImage setPicRegister = {setPic}  pic = {seeProfile?.pic}  />
                    <h5 className="Card_title mt-3">{seeProfile?.firstName + " " + seeProfile?.lastName}</h5>
                    <strong className='mb-5'>({seeProfile?.role})</strong>
                    <div className="buttom-section-left mt-3">
                        <div className="Profile_Number">
                            <i className="fa fa-phone-square Card_icon"></i>
                            <span>{seeProfile?.tel}</span>
                        </div>
                        <div className="Profile_Number">
                            <i className="fa fa-envelope Card_icon"></i>
                            <span>{seeProfile?.email}</span>
                        </div>
                    </div>
                </div>
                <div className="Profile-right-Section">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Info</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Éditer</button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Changer le mot de passe</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        {/* Profile info section */}
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="row p-3">
                                <div className="col-md-6 col-sm-12  mb-3">
                                    <strong>Date de naissance</strong>
                                    <p>
                                        {seeProfile?.birthDay.split('T')[0]}
                                    </p>
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-12 mb-3">
                                    <strong>Sexe</strong>
                                    <p>
                                        {seeProfile?.Genre}
                                    </p>
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-12">
                                    <strong>Ville</strong>
                                    <p>
                                        {seeProfile?.VilleID}
                                    </p>
                                </div>
                                <div className="col-md-6 col-md-6 col-sm-12">
                                    <strong>Adress</strong>
                                    <p>
                                        {seeProfile?.adress}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Edit profile section */}
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <Form onSubmit={handleSubmit} className='Form' >
                                <div className="row50">
                                    <Form.Group className="Form_Group" controlId="firstName">
                                        <Form.Label className="Form_Lable">Prenom</Form.Label>
                                        <Form.Control 
                                            className="Form_Control"
                                            type="firstName"
                                            defaultValue={seeProfile?.firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Form.Group >
                                    <Form.Group className="Form_Group"  controlId="lastName">
                                        <Form.Label className="Form_Lable">Nom</Form.Label>
                                        <Form.Control
                                            className="Form_Control"
                                            type="lastName"
                                            defaultValue={seeProfile?.lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Form.Group >
                                </div>
                                <div className="row100">
                                    <Form.Group className="Form_Group"  controlId="email">
                                            <Form.Label className="Form_Lable">Adresse e-mail</Form.Label>
                                            <Form.Control
                                                className="Form_Control"
                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                autoComplete="off" 
                                                spellCheck="false"
                                                autoFocus
                                                type="email"
                                                defaultValue={seeProfile?.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group >
                                </div>
                                <div className="row100">
                                    <Form.Group className="Form_Groupe"  controlId="dob">
                                        <Form.Label className="Form_Lable">Date de naissance</Form.Label>
                                        <Form.Control
                                            className="Form_Control"
                                            type="date" 
                                            name="dob" 
                                            defaultValue={seeProfile?.birthDay.split('T')[0]}
                                            onChange={(e) => setDate(e.target.value)} 
                                        />
                                    </Form.Group>
                                </div>
                                <div className="row50">
                                    <Form.Group className="Form_Group"  controlId="tel">
                                        <Form.Label className="Form_Lable">Téléphone</Form.Label>
                                        <Form.Control
                                            pattern="((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})"
                                            className="Form_Control"
                                            type="tel"
                                            defaultValue={seeProfile?.tel}
                                            onChange={(e) => setTel(e.target.value)}
                                        />
                                    </Form.Group >
                                    <Form.Group className="Form_Group"  controlId="genre">
                                        <Form.Label className='Form_Lable' >Sexe</Form.Label>
                                        <Form.Control  
                                            as="select"
                                            defaultValue={seeProfile?.Genre}
                                            onChange={(e) => setGenre(e.target.value)}>
                                            <option value="Homme">Homme</option>
                                            <option value="Femme">Femme</option>
                                        </Form.Control >
                                    </Form.Group>
                                </div>
                                <div className="row50">
                                    <Form.Group className="Form_Group"  controlId="adress">
                                        <Form.Label className="Form_Lable">Adress</Form.Label>
                                        <Form.Control
                                            className="Form_Control"
                                            type="adress"
                                            defaultValue={seeProfile?.adress}
                                            onChange={(e) => setAdress(e.target.value)}
                                        />
                                    </Form.Group >
                                    <Form.Group className="Form_Group"  controlId="poste">
                                        <Form.Label className="Form_Lable">Ville</Form.Label>
                                        <Form.Control 
                                            className="Form_Control"
                                            type="ville"
                                            defaultValue={seeProfile?.VilleID}
                                            onChange={(e) => setVille(e.target.value)}>
                                        </Form.Control >
                                    </Form.Group>
                                </div>
                                <Button  type="submit"  className="Form_Button"/* disabled={!validateForm() || loading} */>
                                    Modifier
                                </Button>
                            </Form>
                        </div>
                        {/* Password reset section */}
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <Form onSubmit={handleSubmit} className="Form">
                                <div className="row100">
                                    <Form.Group className="Form_Group"   controlId="Password">
                                        <Form.Label className='Form_Lable'>Nouveau Mot de passe</Form.Label>
                                        <Form.Control
                                            className='Form_Control'
                                            type="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group >
                                    <Form.Group className='Form_Group'   controlId="confirmPassword">
                                        <Form.Label className='Form_Lable'>Confirmer le mot de passe</Form.Label>
                                        <Form.Control
                                            className='Form_Control'
                                            type="Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value) }
                                        />
                                    </Form.Group >
                                </div>
                                <Button  type="submit"  className="Form_Button"/* disabled={!validateForm() || loading} */>
                                    Changer
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile