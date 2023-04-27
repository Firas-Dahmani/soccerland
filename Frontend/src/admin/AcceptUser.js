import { useEffect } from 'react';
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
import Loading from './../Components/loading/Loading';
import AlertCompnenet from './../Components/Alert/AlertCompnenet';
import { userAccepteAction, userDeleteAction, userSeenAction } from '../Redux-dep/actions/AdminActions';
import Navbar from '../Pages/Users_Navbar/Navbar';

function AcceptUser() {

  const dispatch = useDispatch()

  const useUserSeen = useSelector((state) => state.userSeen)
  const { users, loading: Loading_Users_Seen, error: Error_Users_Seen } = useUserSeen

  const userAccepte = useSelector((state) => state.userAccepte);
  const { loading: loadingAccepte, error: errorAccepte, success: successAccepte } = userAccepte;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete;

  useEffect(()=> {
    dispatch(userSeenAction())
  },[ dispatch, successAccepte, successDelete ])

  const handleAccepte = (id, email) =>{
    dispatch(userAccepteAction(id, email))
  }

  const handleDelete = (id) =>{
    dispatch(userDeleteAction(id))
  }

  return (
    <>
      <Navbar />
      {(Loading_Users_Seen || loadingAccepte || loadingDelete) && <Loading />}
      {(Error_Users_Seen || errorAccepte || errorDelete )&& <AlertCompnenet error={Error_Users_Seen || errorAccepte || errorDelete}/> }
      <div className="Pages_Container">
        <div className="Top_Page">
          <h3 className="Page_Title">Liste d'utilisateur</h3>
        </div>
        <div className="Bottom_Page">
          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>Nom</Th>
                  <Th>Accepter</Th>
                  <Th>Supprimer</Th>
                </Tr>
              </Thead>
              <Tbody overflowY="scroll">
                {
                  !users?.length > 0  ?
                  <Tr>
                    <Td>*</Td>
                    <Td>*</Td>
                    <Td>*</Td>
                    <Td>*</Td>
                  </Tr> :
                  users?.map((item, i) => 
                    <Tr key={i}>
                      <Td>{item.email}</Td>
                      <Td>{item.firstName}</Td>
                      <Td><i className="fa fa-check check Card_icon" onClick={()=>handleAccepte(item._id, item.email)}></i></Td>
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

export default AcceptUser