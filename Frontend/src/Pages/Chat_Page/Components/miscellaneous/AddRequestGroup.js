import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { CheckIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptDemandeAction, FetchDemandeAction } from '../../../../Redux-dep/actions/chatActions';
import Loading from '../../../../Components/loading/Loading';
import AlertCompnenet from '../../../../Components/Alert/AlertCompnenet';

function AddRequestGroup({chatId}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch()

    const fetch = useSelector((state) => state.fetch)
    const { Users, loading, error } = fetch

    const Accept = useSelector((state) => state.Accept)
    const { success, loading:Loading_Accept, error:Error_Accept } = Accept

    useEffect(() => {
       dispatch(FetchDemandeAction(chatId)) 
    },[chatId,success]);

    const handleAccept = (userId) =>{
        dispatch(AcceptDemandeAction(chatId, userId))
    }
    
  return (
    <div>
        {(loading || Loading_Accept) && <Loading /> }
        {(error || Error_Accept) && <AlertCompnenet error={error || Error_Accept} /> }
        <IconButton d={{ base: "flex" }}  icon={<i className="fa fa-user">
            <NotificationBadge
                count={Users && Users.length > 0 ? Users.length : 0}
                effect={Effect.SCALE}
            />
        </i>} onClick={onOpen} />
        <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
                <ModalHeader
                    fontSize="40px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center"
                >
                    Liste de demande
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    d="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <div className='text-center  d-inline'>
                        {!Users ? <p>"No New Request"</p> :
                        Users.map((User) => (
                            <div className='content-center justify-content-center d-flex' key={User._id}>
                                <Image
                                    borderRadius="full"
                                    boxSize="45px"
                                    mr={"20px"}
                                    ml={"20px"}
                                    src={User.pic}
                                    alt={""}
                                />
                                <Text
                                    key={User._id}
                                    mt={"5px"}
                                    fontSize={{ base: "15px", md: "20px" }}
                                    fontFamily="Work sans"
                                    >
                                    {User.firstName} {User.lastName}
                                </Text>
                                <Button ml={"15px"} onClick={()=> handleAccept(User._id)}><CheckIcon /></Button>
                            </div>
                        ))}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default AddRequestGroup