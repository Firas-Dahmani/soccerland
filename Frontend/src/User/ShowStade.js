import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react';
import { CancelReservation, getStadeAction, Reserver } from '../Redux-dep/actions/UserActions';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import Navbar from '../Pages/Users_Navbar/Navbar';
import Loading from '../Components/loading/Loading';
import AlertCompnenet from '../Components/Alert/AlertCompnenet';
import { ChatState } from '../Pages/Chat_Page/Context/ChatProvider';

function ShowStade() {
    const dispatch = useDispatch()
    const {idStade} = useParams()
    const {socket} = ChatState();

    const getStade = useSelector((state) => state.getStade)
    const { stade, loading, error } = getStade

    const Add = useSelector((state) => state.AddReservationUser)
    const { reservation, loading: Loading_add, error : Error_add } = Add

    const Cancel = useSelector((state) => state.CancelReservation)
    const { Success: cancel ,loading: Loading_cancel, error : Error_cancel} = Cancel

    useEffect(()=> {
        dispatch(getStadeAction(idStade))
    },[dispatch, reservation , cancel])

    const handleReserver = (id) =>{
        dispatch(Reserver(id,socket))
    } 

    const handleReserveCancel = (id) =>{
        dispatch(CancelReservation(id))
    } 

  return (
    <>
        <Navbar/>
        {(loading || Loading_add || Loading_cancel) && <Loading />}
        {(error || Error_add || Error_cancel) && <AlertCompnenet error={error || Error_add || Error_cancel} />}
        <div className="Pages_Container">
            <div className="Card_Stade">
                <img src={stade?.Photo} alt=""   />
                <h3 className="Page_Title">{stade?.Nom}</h3>
                <div className="info">
                    <div className="description">
                        <span className="titre">Informations sur le stade</span>
                        <p className='desc'>{stade?.Description}</p>
                    </div>
                    <div className="colors">
                        <span className="titre">Details</span>
                        <ul className="list-unstyled">
                            <li><i className="fa fa-phone"></i> {stade?.Tel}</li>
                            <li><i className="fa fa-map-marker"></i>  {stade?.Ville.villeName}</li>
                            <li><i className="fa fa-clock"></i> {stade?.Open}</li>
                            <li>Propriétaire : {stade?.User.firstName} {stade?.User.lastName}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="Bottom_Page">
                <div className="All_Cards">
                    {
                        !stade?.Reservations?.length > 0 ? <strong className='Aucun_Result'>Aucun résultat trouver</strong> :
                        stade.Reservations.map((e, key)=> 
                            <div className="col-sm-6 col-md-4 col-lg-2 mb-4" key={key}>
                                <div className="Card_Container">
                                    <div className="Card-details">
                                        <span className='Card_title' >{e.Nom }</span>
                                        <p><strong>Prix : </strong> {e.Prix} dt</p>
                                        <p><strong>Commence : </strong>{moment(e.Start).format('MMMM Do YYYY, h:mm a')}</p>
                                        <p><strong>Fin : </strong>{moment(e.End).format('MMMM Do YYYY, h:mm a')}</p>
                                        <p><strong>Nombre de joueur Max : </strong>{e.NbjMax}</p>
                                        <div className="Card_Buttons">
                                            {!e.Reserved && <button onClick={()=>handleReserver(e._id)} className='font-weight-bold'><i className="fa fa-check Card_icon"></i> Reserver</button>}
                                            {e.Reserved && <button className='font-weight-bold'  onClick={()=>handleReserveCancel(e._id)}><i className="fa fa-ban Card_icon"></i> Annuler</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ShowStade