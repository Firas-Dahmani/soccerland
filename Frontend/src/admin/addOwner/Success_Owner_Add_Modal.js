import Button  from 'react-bootstrap/esm/Button';
import { Text } from '@chakra-ui/layout';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function Success_Owner_Add_Modal({isOpen, setOpen,  password}) {
    const handleClose = () => setOpen(false)
    return (
      <>
        <Modal isCentered isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
            <ModalContent>
                <ModalHeader>Propriétaire ajouté avec succès</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Copiez le mot de passe pour le donner au propriétaire <br/>
                        Mot de passe : {password}
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => {navigator.clipboard.writeText(password)}}>Coppie</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    )
}

export default Success_Owner_Add_Modal