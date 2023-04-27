import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './Redux-dep/store';
import "react-datetime/css/react-datetime.css";
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from './Pages/Chat_Page/Context/ChatProvider';

const root = createRoot(document.getElementById("root"));

root.render(  
  <Provider store= {store}>
    <ChakraProvider>
      <ChatProvider>
          <App />
      </ChatProvider>
    </ChakraProvider>
  </Provider>,
);


