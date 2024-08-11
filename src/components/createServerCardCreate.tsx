import React, { useState } from "react";
import ServerRegionImage from "../assets/server-region.png";
import ErrorMessage from "./errorMessage";
import Label from "./label";
import api from "../services/api";
import store from "../Store/index";
import CreateServerMutation from "../graphql/mutations/createServer";

interface CreateServerCardCreateProps {
  backButtonClickHandler: () => void;
}

export default function CreateServerCardCreate({
  backButtonClickHandler
}: CreateServerCardCreateProps): JSX.Element {
  const [state, setState] = useState({
    invalidServerName: false,
    serverNameAlreadyInUse: false,
    serverName: ""
  });

  const createServer = async (): Promise<void> => {
    try {
      const {
        data: {
          data: { create_server }
        }
      }: any = await api.post("", CreateServerMutation(state.serverName));
      console.log(create_server);
      switch (create_server.status) {
        case 201:
          const { user }: any = store.getState();

          user.servers.push(create_server.server);

          store.dispatch({
            type: "SET_USER",
            user,
            token: user.token
          });

          break;
        case 400:
          setState({
            ...state,
            invalidServerName: false,
            serverNameAlreadyInUse: true
          });
          break;
        default:
          console.error("Something went wrong", create_server);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[540px] h-[420px] bg-white rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50">
      <div className="w-4/5 mx-auto flex flex-col items-center text-center p-4">
        <p className="text-xl font-bold text-[#7289DA] mb-5">
          CREATE YOUR SERVER
        </p>
        <p className="text-sm font-bold text-[#9BACB6] mb-5">
          By creating a server, you will have access to voice and text chat to
          use amongst your friends.
        </p>
        <div className="w-full flex justify-between">
          <div className="w-full flex flex-col mt-5 mb-5">
            <Label>SERVER NAME</Label>
            <input
              className="border-b border-[#F0F0F0] w-[60%] text-[#C3C5C7] placeholder-[#C3C5C7] text-sm mt-2 mb-2 focus:border-[#7289DA] outline-none"
              placeholder="Enter a server name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, serverName: e.target.value })
              }
            />
            {state.invalidServerName && (
              <ErrorMessage
                className="mt-3"
                message="Server name must be valid"
              />
            )}
            {state.serverNameAlreadyInUse && (
              <ErrorMessage
                className="mt-3"
                message="Server name is already in use"
              />
            )}
          </div>
          <button className="w-[220px] h-[140px] rounded-full border-4 border-[#EBEBEB] bg-[#7289DA] text-white font-bold uppercase text-xs hover:bg-[#8289DA]">
            Change <br />
            Icon
          </button>
        </div>
        <div className="flex items-center">
          <img src={ServerRegionImage} alt="Server region" className="mr-4" />
          <button
            className="bg-[#677BC4] text-white font-bold py-2 px-4 rounded hover:brightness-95 w-[100px] h-[50px] mr-4"
            onClick={createServer}
          >
            Create
          </button>
          <button
            className="bg-[#99AAB5] text-white font-bold py-2 px-4 rounded hover:brightness-95 w-[100px] h-[50px]"
            onClick={backButtonClickHandler}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
