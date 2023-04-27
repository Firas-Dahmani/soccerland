
import  Form  from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import Button  from 'react-bootstrap/Button';
import Loading from '../Components/loading/Loading';
import AlertCompnenet from '../Components/Alert/AlertCompnenet';
import { villeSeenAction } from '../Redux-dep/actions/RootAction';
import { villeAddAction, villeDeleteAction } from '../Redux-dep/actions/AdminActions';
import Navbar from '../Pages/Users_Navbar/Navbar';

function VilleCRUD() {
  const dispatch = useDispatch()
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Ville, setVille] = useState("")

  const villeSeen = useSelector((state) => state.villeSeen)
  const { ville, loading, error } = villeSeen

  const villeDelete = useSelector((state) => state.villeDelete);
  const {loading: loadingDelete, error: errorDelete, success: successDelete} = villeDelete;

  const villeAdd = useSelector((state) => state.villeAdd);
  const {loading: loadingAdd, error: errorAdd, success: successAdd} = villeAdd;

  useEffect(()=> {
    dispatch(villeSeenAction())
  },[dispatch, successDelete, successAdd])
  
  const handleDelete = (id) =>{
    dispatch(villeDeleteAction(id))
  }

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (Ville === ""){ setErrorMessage("Ville non valide !")
    } else {
      setErrorMessage("")
      dispatch(villeAddAction(Ville))
    }
  }

  return (
    <>
      <Navbar />
      { (ErrorMessage ||error || errorDelete || errorAdd) && <AlertCompnenet error={ErrorMessage ||error || errorDelete || errorAdd}/>}
      {(loading || loadingDelete || loadingAdd) && <Loading />}
      <div className="Pages_Container">
        <div className="Top_Page">
          <h3 className="Page_Title">Liste des villes</h3>
          <div className="Profile_Container">
            <Form onSubmit={handleSubmit} className='Form'>
              <div className="row100">
                <Form.Group className="Form_Group"  controlId="Ville">
                  <Form.Label className='Form_Lable'>Ville</Form.Label>
                  <Form.Control 
                    className='Form_Control'
                    type="ville"
                    value={Ville}
                    onChange={(e) => setVille(e.target.value)}
                  />
                </Form.Group >
              </div>
              <Button type="submit" className='Form_Button'>Ajouter</Button>
            </Form>
          </div>
        </div>
        <div className="Bottom_Page">
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Supprimer</Th>
                </Tr>
              </Thead>
              <Tbody overflowY="scroll">
                {
                  !ville ?
                  <Tr>
                    <Td>*</Td>
                    <Td>*</Td>
                  </Tr> :

                  ville.map((item, i) => 
                    <Tr key={i}>
                      <Td>{item.villeName}</Td>
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
  
  export default VilleCRUD