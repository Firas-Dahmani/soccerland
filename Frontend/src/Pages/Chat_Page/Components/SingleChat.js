import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import  Button  from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import AddRequestGroup from "./miscellaneous/AddRequestGroup";
import "./styles.css";
import Loading from "../../../Components/loading/Loading";
import AlertCompnenet from './../../../Components/Alert/AlertCompnenet';
import { AccepterGroupAction, RejeterGroupAction } from "../../../Redux-dep/actions/UserActions";

let  selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [Member, setMember] = useState();
  const dispatch = useDispatch();
  const toast = useToast();



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    socket,
    setsocket
  } = ChatState();



  const AccepterGroup = useSelector((state) => state.AccepterGroup);
  const {
    success: SuccAcc,
    loading: Loading_Accept_Group,
    error: Error_Accept_Group,
  } = AccepterGroup;

  const RejeterGroup = useSelector((state) => state.RejeterGroup);
  const {
    success: SuccRej,
    loading: Loading_Rejeter_Group,
    error: Error_Rejeter_Group,
  } = RejeterGroup;

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    setFetchAgain(!fetchAgain);
  }, [selectedChat, SuccRej]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setFetchAgain(!fetchAgain);
      setMessages([...messages, newMessageRecieved]);
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    selectedChat?.users?.map((u) => {
      if (u._id === user.data[0]._id) {
        u.Groups.map((group) => {
          if (group.id === selectedChat._id) {
            group.status === "member" ? setMember(true) : setMember(false);
          }
        });
      }
    });
  }, [selectedChat]);

  useEffect(() => {
    setMember(true);
  }, [SuccAcc]);

  useEffect(() => {
    setSelectedChat("");
  }, [SuccRej]);

  const handleAccept = async (event) => {
    event.preventDefault();
    dispatch(AccepterGroupAction(selectedChat._id));
  };

  const handleRejet = async (event) => {
    event.preventDefault();
    dispatch(RejeterGroupAction(selectedChat._id));
  };

  return (
    <>
      {(Loading_Accept_Group || Loading_Rejeter_Group) && <Loading />}
      {(Error_Accept_Group || Error_Rejeter_Group) && (
        <AlertCompnenet error={Error_Accept_Group || Error_Rejeter_Group} />
      )}
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user?.data[0], selectedChat?.users)}
                  <ProfileModal
                    user={getSenderFull(user.data[0], selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <div className="d-flex">
                    {selectedChat.groupAdmin._id === user.data[0]._id && (
                      <AddRequestGroup chatId={selectedChat._id} />
                    )}
                    <div className="ml-3">
                      <UpdateGroupChatModal
                        fetchMessages={fetchMessages}
                        fetchAgain={fetchAgain}
                        setFetchAgain={setFetchAgain}
                      />
                    </div>
                  </div>
                </>
              ))}
          </Box>

          {(selectedChat.isGroupChat && Member) || !selectedChat.isGroupChat ? (
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              width="100%"
              height="100%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              )}

              <FormControl
                onKeyDown={sendMessage}
                id="first-name"
                isRequired
                mt={3}
              >
                {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      // height={50}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
              </FormControl>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                <Button
                  type="button"
                  className="btn solid "
                  onClick={handleAccept}
                >
                  Accepter <i className="fa fa-check" aria-hidden="true"></i>
                </Button>
                <Button
                  type="button"
                  style={{ marginLeft: "30px" }}
                  className="btn solid "
                  onClick={handleRejet}
                >
                  rejeter <i className="fa fa-ban" aria-hidden="true"></i>
                </Button>
              </Text>
            </Box>
          )}
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;