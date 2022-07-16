import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatonline/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {io} from "socket.io-client";

export default function Messenger () {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const {user} = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));

  useEffect(()=>{
    socket.current.emit("addUser", user._id);
  },[user]);
  console.log(socket);
  // useEffect(()=>{
  //   socket?.on("welcome", message => {
  //     console.log(message);
  //   });
  // }, [socket]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/" + user._id);
        console.log(res);
        setConversations(res.data);
      } catch (err){
        console.log(err);
      }
    }
    getConversations();
  }, [user._id]);

  useEffect(()=> {
    const getMessages = async () => {
      try{
        const res = await axios.get("/messages/"+currentChat?._id);
        setMessages(res.data);
      }catch(err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

  useEffect(()=> {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    };
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
    <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput"/>
            { conversations.map((c) => (
              <div onClick={()=> setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}/>
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
          {
            currentChat?
            <>
            <div className="chatBoxTop">
              {
                messages.map(m => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id}/>
                  </div>
              ))}

            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                onChange={(e)=>setNewMessage(e.target.value)}
                value={newMessage}
                placeholder="write something...">
              </textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div> </> : <span className="noConversationText">Open a conversation to start a chat</span> }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
          </div>
        </div>
      </div>
    </div>
  )
}