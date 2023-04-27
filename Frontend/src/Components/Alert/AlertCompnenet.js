import { useToast } from '@chakra-ui/toast';

export default function AlertCompnenet({error}) {
  const toast = useToast();
  return (
    toast({
      title: "Error!",
      description: error,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    })
  )
}
