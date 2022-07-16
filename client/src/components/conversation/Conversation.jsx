import './conversation.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members?.find((m) => m !== currentUser?._id);
    console.log('friend', friendId);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        console.log('friend', friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  },[currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture? user.profilePicture : PF+ "person/noAvatar.png"}
        alt=""/>
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}