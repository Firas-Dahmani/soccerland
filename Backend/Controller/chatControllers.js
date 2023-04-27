const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/user");

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { 'users': { $elemMatch: { $eq: req.user._id } } },
        { 'users': { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage"); 
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error(error.message);
      }
    }
  });

  const fetchChats = asyncHandler(async (req, res) => {
    try {
      Chat.find({ "users": { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "firstName pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    let users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users.id are required to form a group chat");
    }
  
    users.push(req.user._id);
  
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user._id,
      });
      
      //Push the groupe in User Groupe
      users.map(async (user) => {
        if(req.user._id === user){
          await User.findByIdAndUpdate(
            user,
            {$push: { Groups: {id: groupChat._id, status: "member"}}},
          )
        }else{
          await User.findByIdAndUpdate(
            user,
            {$push: { Groups: {id: groupChat._id, status: "demande"}}},
          )
        }
      })

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
  
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(updatedChat);
    }
  });

  const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {$pull: { users: userId}},
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      await User.findByIdAndUpdate(
        userId,
        {$pull: { Groups: {id: chatId}}},
      )
      res.json(removed);
    }
  });

  const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if the requester is admin
  
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {$push: { users: userId }},
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      await User.findByIdAndUpdate(
        userId,
        {$push: { Groups: {id: chatId, status: "demandeAdmin"}}},
      )
      res.json(added);
    }
  });

  const fetchReqGroup = async (req, res) => {
    const {chatId} = req.body
    let RequestGroup = []

    try {
      const chat = await Chat.find({
        _id : chatId,
      }).populate("users", "-password")
  
      if(chat.length > 0){
        chat[0].users.map((u)=> {
          if (!(u._id).equals(chat[0].groupAdmin) ){
              u.Groups.map((group)=> {
              if((group.id).equals(chatId) && group.status==="demandeUser"){
                RequestGroup.push(u)
              }
            })
          }
        })
      }
      res.json({
        status: "SUCCESS",
        message: "Send Request!!",
        RequestGroup:RequestGroup
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: "FAILED",
        message: "An error occured while Sending request!"
      })
    }

  }

  const AcceptRequest = async (req, res)=> {
    const { chatId, userId } = req.body

    try {
      //Update in user model 
      await User.findOneAndUpdate({
        "_id": userId,
        "Groups.id": chatId
      }, {
          "$set": {
              "Groups.$.status": "member"
          }
      }, {
          new: true
      });
      
      res.json({
        status: "SUCCESS",
        message: "Accept Request!!"
      })
    } catch (error) {
      res.json({
        status: "FAILED",
        message: "An error occured while Accepting request!!"
      })
    }
  }
  
  module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
    fetchReqGroup,
    AcceptRequest
  };