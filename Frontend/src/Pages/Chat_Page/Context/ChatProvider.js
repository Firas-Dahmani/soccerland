import React, { createContext, useContext, useEffect, useState } from "react";
import { sessionService } from 'redux-react-session';
import { io } from "socket.io-client";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [user, setUser] = useState("")
  const [socket, setsocket] = useState(null);
  
  
  sessionService.loadUser()
  .then((User) => {
      setUser(User)
  })

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        socket,
        setsocket
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export  const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;