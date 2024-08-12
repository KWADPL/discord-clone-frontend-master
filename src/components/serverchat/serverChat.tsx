
import * as S from "./styles";
import React, { useState } from "react";
import { ReactMic } from "react-mic";
import io from "socket.io-client";
import Avatar from "../avatar/avatar";
import ErrorMessage from "../errormessage/errorMessage";
import useKeyPress from "../../hooks/useKeyPress";
import { API_URL } from "../../services/api";
import store from "../../Store";

export const socket = io(API_URL);

let lastMessageTimestamp: number = 0;
let audioChunks: any[] = [];

function playAudio(chunks: BlobPart[] | undefined): void {
  const audioUrl: string = URL.createObjectURL(new Blob(chunks));
  new Audio(audioUrl).play();
}

export default function ServerChat(): JSX.Element {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([] as any);

  const [tooManyMessages, setTooManyMessages] = useState(false);

  const {
    user,
    server: { _id }
  } = store.getState();

  socket.emit("join", { user_id: user._id, server_id: _id });

  socket.on("text", (data: { message: any; }): void => {
    console.log("received", data.message);
    setMessages((messages: any) => [...messages, data.message]);
  });

  socket.on("voice", (data: { message: { content: BlobPart[] | undefined; }; }): void => {
    if (user.headphones) {
      playAudio(data.message.content);
    }
  });

  const onData = (chunk: any): void => {
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

  const sendMessage = (event: { preventDefault: () => void; }): void => {
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
    <S.ContentSection>
      <div style={{ width: "0px", height: "0px", marginTop: "-2000px" }}>
        <ReactMic
          record={useKeyPress(user.push_to_talk_key)}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
      </div>
      <S.Container>
        {messages.length > 0 &&
          messages.map((message: any): any => (
            <S.MessageContainer key={Math.random()}>
              <S.AvatarContainer>
                <Avatar src={message.author.avatar} />
              </S.AvatarContainer>
              <S.Message>{message.content}</S.Message>
            </S.MessageContainer>
          ))}

        {tooManyMessages && (
          <ErrorMessage message="You're sending too many messages" />
        )}
        <form onSubmit={(e: any): void => sendMessage(e)}>
          <S.Input
            placeholder="type here"
            onChange={(e: any): void => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
        </form>
      </S.Container>
    </S.ContentSection>
  );
}
