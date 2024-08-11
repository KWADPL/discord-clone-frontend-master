import React, { useState } from "react";
import ErrorMessage from "./errorMessage";
import store from "../Store/index";
import api from "../services/api";
import JoinServerMutation from "../graphql/mutations/joinServer";
import Label from "./label";

interface CreateServerCardJoinProps {
  backButtonClickHandler: () => void;
}

export default function CreateServerCardJoin({
  backButtonClickHandler
}: CreateServerCardJoinProps): JSX.Element {
  const [state, setState] = useState({
    invalidServerId: false,
    serverId: ""
  });

  const joinServer = async (): Promise<void> => {
    if (!state.serverId) return;

    try {
      console.log("Joinserver", state.serverId);
      const {
        data: {
          data: { join_server }
        }
      }: any = await api.post("", JoinServerMutation(state.serverId));

      console.log("store.getState()", store.getState());
      switch (join_server.status) {
        case 201:
          const { user }: any = store.getState();

          user.servers.push(join_server.server);

          store.dispatch({
            type: "SET_USER",
            user,
            token: user.token
          });

          break;
        case 400:
          setState({
            ...state,
            invalidServerId: true
          });
          break;
        default:
          console.error("Something went wrong", join_server);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[540px] h-[420px] bg-white rounded-lg absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden z-50">
      <div className="w-4/5 mx-auto flex flex-col items-center text-center p-4">
        <p className="text-xl font-bold text-[#53BB8C] mb-5">JOIN A SERVER</p>
        <p className="text-sm font-bold text-[#9BACB6] mb-5">
          Enter an instant invite below to join an existing server. The invite
          will look something like these:
        </p>
        <Label className="text-xs text-[#8C9EE0] mb-2">
          https://discord.gg/qJq5C
        </Label>
        <Label className="text-xs text-[#8C9EE0] mb-4">
          https://discord.gg/discord-developers-qJq5C
        </Label>
        <div className="w-full flex flex-col items-center mb-4">
          <div className="w-4/5 flex flex-col">
            <Label className="text-[#87909C] mb-2">Enter instant invite</Label>
            <input
              className="border-b border-[#F0F0F0] w-full text-[#C3C5C7] placeholder-[#C3C5C7] text-sm py-1 px-2 mb-2 focus:border-[#7289DA] outline-none"
              placeholder="Enter instant invite"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, serverId: e.target.value })
              }
            />
            {state.invalidServerId && (
              <ErrorMessage
                className="text-red-500 mt-2"
                message="Invite link must be valid"
              />
            )}
          </div>
        </div>
        <div className="flex w-full justify-around mt-8">
          <button
            className="bg-[#99AAB5] text-white font-bold py-2 px-4 rounded hover:brightness-95 w-[100px]"
            onClick={backButtonClickHandler}
          >
            Back
          </button>
          <button
            className="bg-[#43B581] text-white font-bold py-2 px-4 rounded hover:brightness-95 w-[100px]"
            onClick={joinServer}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
