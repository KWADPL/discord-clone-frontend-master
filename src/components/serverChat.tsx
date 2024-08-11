

import React, { useState } from "react";
import { ReactMic } from "react-mic";
import io from "socket.io-client";
import Avatar from "./avatar";
import ErrorMessage from "./errorMessage";
import useKeyPress from "../hooks/useKeyPress";
import { API_URL } from "../services/api";
import store from "../Store";

export const socket = io(API_URL);

let lastMessageTimestamp = 0;
let audioChunks: Blob[] = [];

function playAudio(chunks: Blob[]): void {
  const audioUrl: string = URL.createObjectURL(new Blob(chunks));
  new Audio(audioUrl).play();
}

function ServerChat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [tooManyMessages, setTooManyMessages] = useState(false);

  const {
    user,
    server: { _id }
  } = store.getState();

  socket.emit("join", { user_id: user._id, server_id: _id });

  socket.on("text", (data: { message: any }): void => {
    console.log("received", data.message);
    setMessages((messages) => [...messages, data.message]);
  });

  socket.on("voice", (data: { message: { content: Blob[] } }): void => {
    if (user.headphones) {
      playAudio(data.message.content);
    }
  });

  const onData = (chunk: Blob): void => {
    if (user.microphone) {
      audioChunks.push(chunk);
    }
  };

  const onStop = (_: any): void => {
    socket.emit("voice", {
      message: {
        server_id: _id,
        content: audioChunks,
        author: { ...user, token: null }
      }
    });
    audioChunks = [];
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!currentMessage) {
      return;
    }

    const timePassed: number = Date.now() - lastMessageTimestamp;

    timePassed > 1000 ? setTooManyMessages(false) : setTooManyMessages(true);

    if (tooManyMessages) {
      return;
    }

    setMessages([
      ...messages,
      { content: currentMessage, author: { ...user, token: null } }
    ]);

    socket.emit("message", {
      message: {
        server_id: _id,
        content: currentMessage,
        author: { ...user, token: null }
      }
    });

    setCurrentMessage("");
    lastMessageTimestamp = Date.now();
  };

  return (
    <div className="w-full h-full bg-gray-800">
      <div className="w-0 h-0 -mt-52">
        <ReactMic
          record={useKeyPress(user.push_to_talk_key)}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </div>
      <div className="w-3/5 fixed bottom-20 p-4">
        {messages.length > 0 &&
          messages.map((message: any): any => (
            <div
              key={Math.random()}
              className="flex mb-1 pl-7 w-full border-b border-gray-600"
            >
              <div className="w-24">
                <Avatar src={message.author.avatar} />
              </div>
              <p className="text-gray-400 text-xs w-full overflow-hidden min-h-[35px]">
                {message.content}
              </p>
            </div>
          ))}

        {tooManyMessages && (
          <ErrorMessage message="You're sending too many messages" />
        )}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>): void =>
            sendMessage(e)
          }
          className="fixed bottom-0 w-3/5 flex"
        >
          <input
            placeholder="type here"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setCurrentMessage(e.target.value)
            }
            value={currentMessage}
            className="w-full h-10 bg-gray-600 border-none rounded-lg text-white px-2"
          />
        </form>
      </div>
    </div>
  );
}
export default ServerChat;
