import { useState } from 'react'
import  Form  from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Loading from './../../Components/loading/Loading';
import AlertCompnenet from './../../Components/Alert/AlertCompnenet';
import Navbar from './../Users_Navbar/Navbar';
import { playerSearchAction } from '../../Redux-dep/actions/RootAction';

function Search_Users() {
    const dispatch = useDispatch()
    const [Ville, setVille] = useState("")
    const [Poste, setPoste] = useState("");
    const [playerName, setSearch] = useState("");

    const playerSearch = useSelector((state) => state.playerSearch)
    const { Users, loading, error} = playerSearch

    const handleSubmit = async (event) =>{
        event.preventDefault();
        dispatch(playerSearchAction(Poste,playerName,Ville))
    }
  return (
    <>
        <Navbar />
        { loading && <Loading /> }
        {error && <AlertCompnenet /> }
        <div className="Pages_Container">
            <div className="Top_Page">
                <h3 className='Page_Title'>Rechercher un joueur</h3>
                <div className="Profile_Container">
                    <Form onSubmit={handleSubmit} className='Form'>
                        <div className="row100 mb-3">
                            <Form.Group className="Form_Group" controlId="Search">
                                <Form.Label className="Form_Lable">Search</Form.Label>
                                <Form.Control   
                                    className="Form_Control"
                                    type="Search"
                                    value={playerName}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form.Group >
                        </div>
                        <div className="row50 mb-3">
                            <Form.Group className="Form_Group"  controlId="Ville">
                                <Form.Label className='Form_Lable'>Ville</Form.Label>
                                <Form.Control 
                                    className='Form_Control'
                                    value={Ville}
                                    onChange={(e) => setVille(e.target.value)}>
                                </Form.Control >
                            </Form.Group >
                            <Form.Group className="Form_Group" controlId="poste">
                            <Form.Label className='Form_Lable'>Poste</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={Poste}
                                    custom ="true"
                                    onChange={(e) => setPoste(e.target.value)}>
                                    <option value="" >Poste</option>
                                    <option value="Gardien">Gardien</option>
                                    <option value="Libero">Libero</option>
                                    <option value="Défenseur">Défenseur</option>
                                    <option value="Milieu">Milieu</option>
                                    <option value="Ailier">Ailier</option>
                                    <option value="Attaquant">Attaquant</option>
                                </Form.Control >
                            </Form.Group>
                        </div>  
                        <Button  type="submit"  className="Form_Button">Search</Button>
                    </Form>
                </div>
            </div>
            <div className="Bottom_Page" style={{paddingTop:'32px'}}>
                <div className="All_Cards">
                    {
                        !Users ? <strong className='Aucun_Result'>Aucun résultat trouver</strong> :
                        Users?.map((element, key)=> 
                            <div className="Card_Container">
                                <div className="Card_img"><img src={element.pic} alt="" /></div>
                                <div className="Card-details">
                                    <span className='Card_title' >{element.firstName } {element.lastName}</span>
                                    <p>
                                        <i className="fas fa-filter pr-1 "></i>
                                        {element.role === 'User' ? element.Poste : element.role}
                                    </p>
                                    <p><i className="fas fa-map-marker-alt pr-1 "></i>{element.VilleID}</p>
                                    <div className="Card_Buttons">
                                        <Link className="Card_Button" to={`/chat/${element?._id}`}><i class="fa fa-comments" aria-hidden="true"></i></Link>                                             
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

export default Search_Users