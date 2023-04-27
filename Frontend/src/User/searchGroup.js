import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import  Form  from 'react-bootstrap/Form';
import { AccepterGroupAction, DemandeGroupAction, SearchGroupAction } from '../Redux-dep/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Components/loading/Loading';
import AlertCompnenet from '../Components/Alert/AlertCompnenet';
import Navbar from '../Pages/Users_Navbar/Navbar';
import { ChatState } from '../Pages/Chat_Page/Context/ChatProvider';

function SearchGroup() {
    const [Search, setSearch] = useState("");
    const dispatch = useDispatch()
    const {socket} = ChatState();

    const SearchGroup = useSelector((state) => state.SearchGroup)
    const { Groups, loading, error } = SearchGroup

    const Demande = useSelector((state) => state.Demande)
    const {success, loading: Loadin_demande, error : Error_demande } = Demande

    const Accept = useSelector((state) => state.Accept)
    const {success:Accept_Success, loading: Loadin_Accept, error : Error_Accept } = Accept

    const handleSubmit = async (event) =>{
        event.preventDefault();
        dispatch(SearchGroupAction(Search))
    }

    useEffect(() => {
        dispatch(SearchGroupAction(Search))
    }, [dispatch, success, Accept_Success]);

    const handleDemande = async (id) =>{
        dispatch(DemandeGroupAction(id, socket))
    }

    const handleAccept = async (id) =>{
        dispatch(AccepterGroupAction(id))
    }
  return (
    <div>
        <Navbar/>
        {(loading || Loadin_demande || Loadin_Accept) && <Loading />}
        {(error || Error_demande || Error_Accept) && <AlertCompnenet error={error || Error_demande || Error_Accept} />}
        <div className="Pages_Container">
            <div className="Top_Page">
                <h3 className="Page_Title">Rechercher un groupe</h3>
                <div className="Profile_Container">
                    <Form onSubmit={handleSubmit} className='Form'>
                        <div className="row100">
                            <Form.Group className="Form_Group" controlId="Search">
                                <Form.Label className="Form_Lable">Search</Form.Label>
                                <Form.Control 
                                    className="Form_Control" 
                                    autoFocus
                                    type="Search"
                                    value={Search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form.Group >
                        </div>
                        <Button  type="submit"  className="From_Button">Search</Button>
                    </Form>
                </div>
            </div>
            <div className="Bottom_Page">
                <div className="All_Cards">
                    {
                        !Groups?.length > 0 ? <strong className='Aucun_Result'>Aucun résultat trouver</strong> :
                        Groups?.map((element, key)=> 
                            <div className="col-sm-6 col-md-4 col-lg-2 mb-4" key={key}>
                                <div className="Card_Container">
                                    <div className="Card-details">
                                        <span className='Card_title' >{element.chat.chatName}</span>
                                        <p><strong>Admin :</strong> {element.chat.groupAdmin.firstName} {element.chat.groupAdmin.lastName}</p>
                                        <p><strong>Nombre de joueur :</strong> {element.chat.users.length} Joueur </p>
                                        <div className="Card_Buttons">
                                            {
                                                (element.group_Status === "Member" && <p className='text-center mt-3'>{"(Member)"}</p>)
                                                || (element.group_Status === "User" && <Button className='Form_Button' disabled >Envoyer</Button>)
                                                || (element.group_Status === "Group" && <Button className='Form_Button' onClick={()=> handleAccept(element.chat._id)} >Accepter</Button>)
                                                || (element.group_Status === "OUT" && <Button className='Form_Button' onClick={()=> handleDemande(element.chat._id)}>Demande</Button>)
                                            }
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

export default SearchGroup
