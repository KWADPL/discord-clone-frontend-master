import React, { useState } from "react";
import FriendSuggestionsBackground from "../assets/friend-suggestions.svg";
import api from "../services/api";
import FriendRequestMutation from "../graphql/mutations/friendRequest";
import Button from "./button";

export default function AddFriend(): JSX.Element {
  const [state, setState] = useState({ _id: "" });

  const sendFriendRequest = async (): Promise<void> => {
    try {
      if (state._id) {
        await api.post("", FriendRequestMutation(state._id));
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  return (
    <div className="w-full h-full bg-[#36393f] p-8">
      {/* Add Friend Section */}
      <div className="bg-[#35383e] p-6 rounded-lg relative">
        <h1 className="text-white text-xl font-bold uppercase mb-4">Add Friend</h1>
        <p className="text-gray-400 text-sm font-bold mb-4">
          You can add a friend with their DiscordTag.
        </p>
        <input
          type="text"
          placeholder="Enter a DiscordTag#0000"
          className="w-full p-4 bg-[#303338] text-white border-2 border-[#222327] rounded-md mb-4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setState({ ...state, _id: e.target.value })
          }
        />
        <Button
          className="w-[150px] h-[38px] bg-[#7289DA] text-white absolute left-1/2 transform -translate-x-1/2 bottom-4"
          onClick={sendFriendRequest}
        >
          Send Friend Request
        </Button>
      </div>

      {/* Friend Suggestions Header */}
      <div className="w-full h-16 mt-8 border-t border-b border-gray-700 flex items-center">
        <h1 className="text-white text-lg font-bold uppercase mx-auto">
          FRIEND SUGGESTIONS
        </h1>
      </div>

      {/* Friend Suggestions Section */}
      <div className="flex flex-col items-center mt-8">
        <img
          src={FriendSuggestionsBackground}
          alt="Friend Suggestions Background"
          className="mb-9"
        />
        <p className="text-gray-400 text-center text-sm leading-5 mb-6">
          Grab the desktop app to find friends from other services like Skype
          <br />
          or League of Legends.
        </p>
        <Button className="w-24 h-9 bg-[#7289DA] text-white">Download</Button>
      </div>
    </div>
  );
}