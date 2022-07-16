import React from 'react';
import "./message.css";
import {format} from "timeago.js";
export default function Message({message, own}) {

  return (
    <div className={own? "message own":"message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?cs=srgb&dl=pexels-olena-bohovyk-3686769.jpg&fm=jpg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}