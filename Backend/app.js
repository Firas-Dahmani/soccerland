require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { notFound, errorHandler } = require("./middlewares/errorMiddlware");
const colors = require("colors");
const bodyParser = require("body-parser");
let multer = require("multer");
let upload = multer();
const User = require('./models/user')
const path = require("path");

// all routes
const playerRoutes = require('./routes/playerRoute')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const rootRoutes = require('./routes/rootRoutes')
const contactRoutes = require('./routes/contactRoute')
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");


// some dependency
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cors())
app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);
app.use(upload.array());

//database connection
const db = require('./database/db');
db()

/* //for testing purpose
app.get('/',(req,res)=>{
    res.send("Hello SoccerLand")
}) */

// use all routes
app.use('/api', authRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use('/user', playerRoutes)
app.use('/', contactRoutes)
app.use('/admin', adminRoutes)
app.use('/root', rootRoutes)


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);





const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});



io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(async (user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      await User.findByIdAndUpdate(  
        user._id,
        {$push: { notification: {content: newMessageRecieved, __Notification : "M" }}},
      )

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.on("reserver", async (reservation) => {
    let user = reservation.UserId
    await User.findByIdAndUpdate(  
      user._id,
      {$push: { notification: {content: reservation, __Notification : "R" }}},
    )
    socket.in(user._id).emit("new Reservation", reservation);
  })

  socket.on("add request",async (Chat) => {
    let Admin = Chat.groupAdmin
    await User.findByIdAndUpdate(  
      Admin,
      {$push: { notification: {content: Chat, __Notification : "A" }}},
    )
    socket.in(Admin).emit("new request", Chat.chatName);
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

