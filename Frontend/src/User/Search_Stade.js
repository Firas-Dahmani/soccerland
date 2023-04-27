import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button  from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Loading from '../Components/loading/Loading';
import AlertCompnenet from '../Components/Alert/AlertCompnenet';
import { SearchStadeAction } from '../Redux-dep/actions/UserActions';
import { villeSeenAction } from '../Redux-dep/actions/RootAction';
import Navbar from './../Pages/Users_Navbar/Navbar';

function Reserver() {
    const dispatch = useDispatch()
    const [Search, setSearch] = useState("")
    const [VilleID, setVilleID] = useState()

    const SearchSatde = useSelector((state) => state.SearchSatde)
    const { Stade , loading, error } = SearchSatde

    const villeSeen = useSelector((state) => state.villeSeen)
    const { ville, loading: loadingSeeVille, error: errorSeeVille} = villeSeen

    useEffect(()=> {
        dispatch(villeSeenAction())
    },[dispatch])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        dispatch(SearchStadeAction(Search,VilleID))
    }

    return (
    <>
        <Navbar />
        {(loading || loadingSeeVille) && <Loading />}
        {(error || errorSeeVille) && <AlertCompnenet error={error || errorSeeVille}/>}
        <div className="Pages_Container">
            <div className="Top_Page">
                <h3 className="Page_Title">Rechercher un stade</h3>
                <div className="Profile_Container">
                    <Form onSubmit={handleSubmit} className='Form'>
                        <div className="row50">
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
                            <Form.Group  className="Form_Group"  controlId="Ville">
                            <Form.Label className="Form_Lable">Ville</Form.Label>
                                <Form.Control 
                                    className="Form_Control"
                                    as="select"
                                    custom ="true"
                                    defaultValue={VilleID}
                                    onChange={(e) => setVilleID(e.target.value)}>
                                    <option value="" >Ville</option>
                                    {
                                    ville && ville.length !== 0 &&
                                    ville.map((item, i) => ( 
                                        <option  value={item._id} key={i}>{item.villeName}</option>  
                                    ))
                                    }
                                </Form.Control >
                            </Form.Group >
                        </div>
                        <Button  type="submit"  className="Form_Button">Search</Button>
                    </Form>
                </div>
            </div>
            <div className="Bottom_Page">
                <div className="All_Cards mb-4">
                    {
                        !Stade ? <strong className='Aucun_Result'>Aucun résultat trouver</strong> :
                        Stade?.map((element, key)=> 
                            <div className="Card_Container">
                                <div className="Card_img"><img src={element?.Photo} alt=""  /></div>
                                <div className="Card-details">
                                    <span className='Card_title' >{element.Nom }</span>
                                    <p><strong>N° : </strong><i className="fa fa-phone "></i>{element.Tel}</p>
                                    <p><strong>Ville : </strong><i className="fas fa-map-marker-alt"></i>{element.Ville.villeName} </p>
                                    <div className="Card_Buttons">
                                        <Link to={`/Stade/${element._id}`} className='Form_Button'>Afficher</Link>
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

export default Reserver