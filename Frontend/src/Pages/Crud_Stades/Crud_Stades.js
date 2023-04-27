
import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import Form  from 'react-bootstrap/Form';
import Button  from 'react-bootstrap/Button';
import Loading from './../../Components/loading/Loading';
import AlertCompnenet from './../../Components/Alert/AlertCompnenet';
import { stadeAddAction, stadeDeleteAction, StadeSeenAction, villeSeenAction } from '../../Redux-dep/actions/RootAction';
import Navbar from '../Users_Navbar/Navbar';

function Crud_Stade() {
  const [VilleID, setVilleID] = useState("")
  const [Nom, setNom] = useState("");
  const [Photo, setPhoto] = useState("");
  const [Image, setImage] = useState("");
  const [OpenTime, setOpenTime] = useState("");
  const [Description, setDescription] = useState("");
  const [Tel, setTel] = useState("");
  const [Start, setStart] = useState();
  const [End, setEnd] = useState();
  const [ErrorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch()
        
  const villeSeen = useSelector((state) => state.villeSeen)
    const { ville, loading: loadingSeeVille, error: errorSeeVille} = villeSeen

  const stadeSeen = useSelector((state) => state.stadeSeen)
    const { stade, loading: Loading_Stade_Seen, error:Error_Stade_Seen } = stadeSeen

  const stadeDelete = useSelector((state) => state.stadeDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete,} = stadeDelete;

  const stadeAdd = useSelector((state) => state.stadeAdd);
    const {loading: loadingStadeAdd, error: errorStadeAdd,success: successStadeAdd,} = stadeAdd; 

    useEffect(()=> {
      dispatch(villeSeenAction())
      },[dispatch])

    useEffect(()=> {
      if(VilleID){
        dispatch(StadeSeenAction(VilleID))
      }
    },[dispatch,VilleID,successStadeAdd,successDelete])

    const handleDelete = (id) =>{
      dispatch(stadeDeleteAction(id))
    }
  
    useEffect(() => {
      if(Image && Image.type.match('image.*')){
        const readeCovertFile = new FileReader();
        readeCovertFile.readAsDataURL(Image)
        readeCovertFile.addEventListener("load", () => {
            setPhoto(readeCovertFile.result);
        });}
    });

    useEffect(()=> {
      setOpenTime(Start + ' - ' + End)
    }, [Start,End])

    const handleSubmit = async (event) =>{
      event.preventDefault();
      
      let regPhone = /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/
      if(VilleID === ""){
        setErrorMessage("Ville non valide !")
      }else if(Nom === ""){
        setErrorMessage("Nom non valide !")
      }else if(!regPhone.test(Tel)){
        setErrorMessage("Telephone non valide !")
      }else if(Description === ""){
        setErrorMessage("Description non valide !")
      }else if(OpenTime === ""){
        setErrorMessage("Temp non valide !")
      }else if(Date.parse(Start) >= Date.parse(End)){
        setErrorMessage('Temp non valide')
      } else {
          dispatch(stadeAddAction(VilleID, Nom, Photo, OpenTime, Description , Tel ))
          setErrorMessage("")
          setNom("")
          setPhoto("")
          setDescription("")
          setOpenTime("")
          setTel("")
        }
    } 

  return (
    <>
      <Navbar />
      {(loadingSeeVille || Loading_Stade_Seen || loadingDelete || loadingStadeAdd) && <Loading /> }
      {
        (ErrorMessage 
        || errorSeeVille
        || Error_Stade_Seen
        || errorDelete
        || errorStadeAdd) && 
        <AlertCompnenet error={
          ErrorMessage 
          || errorSeeVille
          || Error_Stade_Seen
          || errorDelete
          || errorStadeAdd} 
        />
      }
      <div className="Pages_Container">
        <div  className='Top_Page'>
          <h3 className="Page_Title">Liste des stades</h3>
          <div className="Profile_Container">
            <Form onSubmit={handleSubmit} className="Form" >
              <div className="row100">
                <Form.Group className="Form_Group"  controlId="Ville">
                    <Form.Control 
                        as="select"
                        custom ="true"
                        defaultValue={VilleID}
                        onChange={(e) => setVilleID(e.target.value)}>
                          <option  value={""} key={"0"} disabled>Ville</option> 
                        {
                          ville && ville.length !== 0 &&
                          ville.map((item, i) => ( 
                              <option  value={item._id} key={i}>{item.villeName}</option>  
                          ))
                        }
                    </Form.Control >
                </Form.Group>
              </div>
              <div className="row100">
                <Form.Group className='Form_Group'  controlId="Nom">
                    <Form.Label className='Form_Lable'>Nom</Form.Label>
                    <Form.Control 
                      className="Form_Control"
                      type="Nom"
                      value={Nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                </Form.Group >
              </div>
              <div className="row100 mb-3">
                  <Form.Group className="Form_Group"  controlId="phone">
                      <Form.Label className='Form_Lable'>Téléphone</Form.Label>
                      <Form.Control 
                        className="Form_Control"
                        type="phone"
                        value={Tel}
                        onChange={(e) => setTel(e.target.value)}
                      />
                  </Form.Group >
              </div>
                <div className="row50 mb-3">
                  <Input
                    type="time"
                    placeholder="Ouvrir"
                    className='Form_Control'
                    onChange={(e) => {
                      setStart(e.target.value);
                    }}
                  />
                  <Input
                    type="time"
                    lable="Fermer"
                    className='Form_Control'
                    onChange={(e) => {
                      setEnd(e.target.value);
                    }}
                  />
                </div>
              <div className="row100">
                <Form.Group className='Form_Group' controlId="Nom">
                    <Form.Control
                      className='Form_Control'
                      type="file"
                      name="Photo"
                      onChange={(e)=> setImage(e.target.files[0])}
                    />
                </Form.Group >
              </div>
              <Form.Group className="Form_Group"  controlId="desc">
                <Form.Label className='Form_Lable'>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  cols={30} 
                  rows={4}
                  required 
                  placeholder="Des information sur votre stade" 
                  className="Form-Control"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group >
                <Button type="submit" className='Form_Button'>Ajouter</Button>
            </Form>
          </div>
        </div>

        <div className="Bottom_Page">
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Nom du stade</Th>
                  <Th>Téléphone</Th>
                  <Th>Supprimer Stade</Th>
                </Tr>
              </Thead>
              <Tbody overflowY="scroll">
                {
                  !stade?.length ?
                  <Tr>
                    <Td>*</Td>
                    <Td>*</Td>
                    <Td>*</Td>
                  </Tr> :
                  stade?.map((item, i) => 
                    <Tr key={i}>
                      <Td>{item.Nom}</Td>
                      <Td>{item.Tel}</Td>
                      <Td><i className="fa fa-trash delete Card_icon" onClick={()=>handleDelete(item._id)}></i></Td>
                    </Tr>
                  )
                }
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}

export default Crud_Stade