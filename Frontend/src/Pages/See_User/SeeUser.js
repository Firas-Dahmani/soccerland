import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from "../../Components/loading/Loading";
import AlertCompnenet from "../../Components/Alert/AlertCompnenet";
import Navbar from './../Users_Navbar/Navbar';
import { findUserByIDAction } from './../../Redux-dep/actions/RootAction';


function SeeUser() {
    let { id } = useParams();
    const dispatch = useDispatch()

    const UserFindByID = useSelector((state) => state.UserFindByID)
    const { User, loading:UserFindLoading, error:UserFindError } = UserFindByID

    useEffect(()=> {
        dispatch(findUserByIDAction(id))
    },[id])

    return (
    <>
        <Navbar />
        {UserFindLoading && <Loading /> }
        {UserFindError && <AlertCompnenet error={UserFindError} /> }
        <div className="Pages_Container">
            <div className="Profile_Container">
                <div className="Profile-Left-Section">
                    <div className="Profile_img mb-3"><img src={User?.pic} alt="" /></div>
                    <h5 className="Card_title mb-3">{User?.firstName + " " + User?.lastName}</h5>
                    <strong >({User?.role})</strong>
                    <div className="Profile_Number">
                        <i className="fa fa-phone-square Card_icon"></i>
                        <span>{User?.tel}</span>
                    </div>
                    <div className="Profile_Number">
                    <i className="fa fa-envelope Card_icon"></i>
                        <span>{User?.email}</span>
                    </div>
                </div>
                <div className="Profile_info">
                    <div className="tab-pane active show" id="profil">
                        <span className="Card_title">A-propos</span>
                        <div className="row p-3">
                            <div className="col-md-6 mb-3">
                                <strong>Date de naissance</strong>
                                <p>
                                    {User?.birthDay.split('T')[0]}
                                </p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <strong>Sexe</strong>
                                <p>
                                    {User?.Genre}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <strong>Ville</strong>
                                <p>
                                    {User?.VilleID}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <strong>Adress</strong>
                                <p>
                                    {User?.adress}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SeeUser