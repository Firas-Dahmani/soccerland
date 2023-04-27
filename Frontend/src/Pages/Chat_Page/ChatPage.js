import { Box } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import Chatbox from "./Components/Chatbox";
import MyChats from "./Components/MyChats";
import { ChatState } from "./Context/ChatProvider";
import {  useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import Navbar from "../Users_Navbar/Navbar";


const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  let { id } = useParams();
  const toast = useToast();
  
  const {
      setSelectedChat,
      user,
      chats,
      setChats,
    } = ChatState();

    const accessChat = async (userId) => {
      
      try {
          const config = {
              headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post('/api/chat', { userId }, config);

        chats?.map((c) => {
          if (c._id === data._id) setChats([data, ...chats])
        })
        setSelectedChat(data);
      } catch (error) {
          toast({
            title: "Error fetching the chat",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
        });
      }
    };

    useEffect(()=> {
      if (id) accessChat(id);
    },[id])

  return (
    <>
      <Navbar />    
      <div className="Pages_Container">
        <Box display={"flex"} justifyContent="space-between" gap='20px' width={"100%"} height={"85.5vh"} p="10px">
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>

  );
};

export default Chatpage;