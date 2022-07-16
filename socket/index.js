const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000"
  }
})

let users = [];

const addUser = (userId, socketId) => {
  !user.some(user => user.userId === userId) &&
  users.push({userId, socketId})
}

io.on("connection", (socket)=> {
  console.log("a user connected")

  io.emit("welcome", "hello this is socket server");

//take userId
socket.on("addUser", userId => {

})
})