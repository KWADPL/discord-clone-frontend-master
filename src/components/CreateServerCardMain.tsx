import React from "react";

import CreateServerActionIcon from "../assets/create-server.svg";
import JoinServerActionIcon from "../assets/join-server.png";

import CreateServerPopUpLeftBackground from "../assets/left-background.png";
import CreateServerPopUpRightBackground from "../assets/right-background.png";

interface CreateServerCardMainProps {
  closeButtonClickHandler: () => void;
  createButtonClickHandler: () => void;
  joinButtonClickHandler: () => void;
}

export default function CreateServerCardMain({
  closeButtonClickHandler,
  createButtonClickHandler,
  joinButtonClickHandler
}: CreateServerCardMainProps): JSX.Element {
  return (
    <div className="relative w-[540px] h-[420px] bg-white rounded-lg overflow-hidden z-50">
      <button
        className="absolute top-4 right-4 w-[20%] bg-[#E2E3E7] text-[#000] py-2 px-4 rounded hover:bg-[#d1d2d4]"
        onClick={closeButtonClickHandler}
      >
        Close
      </button>
      <div className="w-full h-full flex justify-between overflow-hidden">
        <img
          src={CreateServerPopUpLeftBackground}
          className="h-[200px] mt-[40%] object-cover"
          alt="Left Background"
        />
        <img
          src={CreateServerPopUpRightBackground}
          className="h-[200px] mt-[40%] object-cover"
          alt="Right Background"
        />
        <div className="flex flex-col items-center justify-center relative">
          <div className="w-[210px] h-[285px] border-2 border-[#E5E5E5] rounded-sm flex flex-col items-center justify-center text-center">
            <p className="text-[16px] font-bold text-[#7289DA] uppercase mt-2 mb-2">
              Create
            </p>
            <p className="text-[12px] font-normal text-[#9BACB6] w-4/5 mx-auto mb-4">
              Create a new server and invite your friends. It's free!
            </p>
            <img
              src={CreateServerActionIcon}
              className="w-[50%] h-auto mb-4"
              alt="Create Server"
            />
            <button
              className="bg-[#7289DA] text-white font-bold py-2 px-4 rounded hover:bg-[#5e73b4] w-[80%] h-[50px]"
              onClick={createButtonClickHandler}
            >
              Create a server
            </button>
          </div>
          <div className="w-[210px] h-[285px] border-2 border-[#E5E5E5] rounded-sm flex flex-col items-center justify-center text-center absolute left-[60%] top-[70%] transform -translate-x-[60%] -translate-y-[70%]">
            <p className="text-[16px] font-bold text-[#3CA374] uppercase mt-2 mb-2">
              Join
            </p>
            <p className="text-[12px] font-normal text-[#9BACB6] w-4/5 mx-auto mb-4">
              Enter an instant invite and join your friend's server.
            </p>
            <img
              src={JoinServerActionIcon}
              className="w-[50%] h-auto mt-6 mb-6"
              alt="Join Server"
            />
            <button
              className="bg-[#3CA374] text-white font-bold py-2 px-4 rounded hover:bg-[#2f8a60] w-[80%] h-[50px]"
              onClick={joinButtonClickHandler}
            >
              Join a server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
