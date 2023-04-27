import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import  Button  from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';
import moment from 'moment'
import Navbar from '../Users_Navbar/Navbar';
import { AddEventAction, DeleteEventAction, getEventAction, MystadeSeenAction } from '../../Redux-dep/actions/RootAction';
import Loading from '../../Components/loading/Loading';
import AlertCompnenet from '../../Components/Alert/AlertCompnenet';
import { Input } from '@chakra-ui/react';

function Crud_Reservations() {
    const [Prix, setPrix] = useState("");
    const [Start, setStart] = useState();
    const [End, setEnd] = useState();
    const [Stade, setStade] = useState("");
    const [NbjMax, setNbjMax] = useState("");
    const [ErrorMsg, setErrorMsg] = useState();
    const dispatch = useDispatch()

    const stadeSeen = useSelector((state) => state.MystadeSeen)
    const { stade, loading:LoadStade, error:ErrorStade } = stadeSeen

    const ReservationAdd = useSelector((state) => state.AddReservation)
    const { success : SuccReserv, loading: Loading_Add_Reservation , error: Error_Add_Reservation } = ReservationAdd
    
    const getEvent = useSelector((state) => state.showReservation)
    const { event, loading, error } = getEvent

    const OwnerDeleteEvent = useSelector((state) => state.DeleteEvent)
    const { success, loading:deleteEveltLoad, error:deleteEveltErr } = OwnerDeleteEvent

    useEffect(()=> {
        dispatch(MystadeSeenAction())
    },[dispatch])
    
    useEffect(()=> {
        dispatch(getEventAction())
    },[dispatch,success,SuccReserv])

    const handleSubmit = (e) => {
        e.preventDefault();
        const StartTime =  moment(Start).format('YYYY-MM-DDTHH:mm')
        const EndTime =  moment(End).format('YYYY-MM-DDTHH:mm')

        if(Stade === "Stade"){
            setErrorMsg('Stade non valide')
        }else if(Prix === ""){
            setErrorMsg('Prix non valide')
        }else if(NbjMax === ""){
            setErrorMsg('Nombre de joueur non valide')
        }else if(
            (StartTime >= EndTime )
            || (StartTime <= moment().format('YYYY-MM-DDTHH:mm'))
            || (EndTime <= moment().format('YYYY-MM-DDTHH:mm'))
            ){
            setErrorMsg('Temp non valide')
        }else{
            dispatch(AddEventAction(Stade, Prix, StartTime, EndTime,NbjMax))
            setPrix("")
            setStade("")
            setNbjMax("")
            setStart(moment().format())
            setEnd(moment().format())
            setErrorMsg("")
        }  
    }

    const handledeleteEvent = (id) =>{
        dispatch(DeleteEventAction(id))
    } 
  return (
    <div>
        <Navbar />
        {(loading || LoadStade || Loading_Add_Reservation || deleteEveltLoad)  && <Loading/>}
        {(deleteEveltErr || ErrorMsg || error || Error_Add_Reservation || ErrorStade) && <AlertCompnenet error ={deleteEveltErr || error || Error_Add_Reservation || ErrorStade || ErrorMsg} /> }
        <div className="Pages_Container">
            {/* Form de creation Event */}
            <div className="Top_Page">
                <h3 className='Page_Title '>Cree Reservation</h3> 
                <div className="Profile_Container">
                    <Form onSubmit={handleSubmit} className="Form" >
                        <div className="row100 mb-3">
                            <Form.Group className="Form_Group mb-3"  controlId="Stade">
                                <Form.Control 
                                    as="select"
                                    custom ="true"
                                    defaultValue={Stade}
                                    onChange={(e) => setStade(e.target.value)}>
                                    <option value=""  disabled="disabled">Stade</option>
                                    {
                                        (stade && stade.length !== 0) &&
                                        stade.map((item, i) => ( 
                                            <option  value={item._id} key={i}>{item.Nom}</option>  
                                        ))
                                    }
                                </Form.Control >
                            </Form.Group>
                        </div>
                        <div className="row100 mb-3">
                            <Form.Group className='Form_Group' controlId="Nom">
                                <Form.Label className='Form_Lable'>Prix</Form.Label>
                                <Form.Control 
                                    className='Form_Control'
                                    type="Prix"
                                    value={Prix}
                                    onChange={(e) => setPrix(e.target.value)}
                                />
                            </Form.Group >
                        </div>
                        <div className="row100 mb-3">
                            <Form.Group className='Form_Group' controlId="nbJmax">
                                <Form.Label className='Form_Lable'>Nombre de joueur Max</Form.Label>
                                <Form.Control 
                                    className='Form_Control'
                                    type="nbjMax"
                                    value={NbjMax}
                                    onChange={(e) => setNbjMax(e.target.value)}
                                />
                            </Form.Group >
                        </div>
                        <div className="row50 mb-3">
                            <Input
                                type="datetime-local"
                                placeholder="Ouvrir"
                                className='Form_Control'
                                onChange={(e) => {
                                    setStart(e.target.value);
                                }}
                            />
                            <Input
                                type="datetime-local"
                                lable="Fermer"
                                className='Form_Control'
                                onChange={(e) => {
                                    setEnd(e.target.value);
                                }}
                            />
                        </div>
                        <Button type="submit" className='Form_Button'>ADD</Button>
                    </Form>
                </div>
            </div>
            {/* Les Reservation Deja cree */}
            <div className="Bottom_Page">
                <div className="All_Cards">
                    {
                        !event?.length > 0 ? <strong className='Aucun_Result'>Aucun résultat trouver</strong> :
                        event.map((element, key)=> 
                            <div className="col-sm-6 col-md-4 col-lg-2 mb-4" key={key}>
                                <div className="Card_Container">
                                    <div className="Card-img"></div>
                                    <div className="Card_details">
                                        <span className='Card_title' >{element.StadeId.Nom }</span>
                                        <p><strong>Prix : </strong>{element.Prix} dt</p>
                                        <p><strong>Commencer : </strong><i className="fas fa-clock pr-1 "></i>{moment(element.Start).format('MMMM Do YYYY, h:mm a')}</p>
                                        <p><strong>Fin : </strong><i className="fas fa-clock pr-1 "></i>{moment(element.End).format('MMMM Do YYYY, h:mm a')} </p>
                                        <div className="Card_Buttons">
                                            <button className="Card_Button" onClick={()=>handledeleteEvent(element?._id)}><i className="fa fa-trash Card_icon "></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Crud_Reservations