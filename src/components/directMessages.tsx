import React from "react";
import NitroIcon from "../assets/start-up.png";
import ControllerIcon from "../assets/gamepad-controller.png";
import BackpackIcon from "../assets/school-book-bag.png";
import FriendsIcon from "../assets/friends.png";
import MicrophoneIcon from "../assets/microphone-black-shape.svg";
import HeadphoneIcon from "../assets/headphone-symbol.svg";
import SettingsIcon from "../assets/settings-work-tool.svg";
import { ESections } from "./lobbySection";
import Label from "./label";
import Icon from "./icon";
import store from "../Store/index";
import Avatar from "./avatar";
import SettingsContainer from "./settingsContainer";

interface DirectMessagesProps {
  setCurrentSection: (section: ESections) => void;
}

export default function DirectMessages({
  setCurrentSection
}: DirectMessagesProps): JSX.Element {
  const { user }: any = store.getState();

  const toggle = (input: string): void => {
    const newUser: any = { ...user };
    newUser[input] = !user[input];
    store.dispatch({ type: "SET_USER", user: newUser });
  };

  return (
    <div className="w-[300px] h-full bg-[#2F3136]">
      <input
        type="text"
        placeholder="Find or start a conversation"
        className="w-[90%] h-[25px] ml-[5%] mt-[10px] mb-[20px] bg-[#202225] text-[#72767D] rounded-sm border-none text-[12px] pl-[5px]"
      />
      <div
        className="w-[90%] h-[40px] mx-auto flex items-center cursor-pointer hover:bg-[#42464D] hover:brightness-[1.1] rounded-sm"
        onClick={() => setCurrentSection(ESections.ACTIVITY)}
      >
        <Icon src={ControllerIcon} />
        <Label>Activity</Label>
      </div>
      <div
        className="w-[90%] h-[40px] mx-auto flex items-center cursor-pointer hover:bg-[#42464D] hover:brightness-[1.1] rounded-sm"
        onClick={() => setCurrentSection(ESections.LIBRARY)}
      >
        <Icon src={BackpackIcon} />
        <Label>Library</Label>
      </div>
      <div
        className="w-[90%] h-[40px] mx-auto flex items-center cursor-pointer hover:bg-[#42464D] hover:brightness-[1.1] rounded-sm"
        onClick={() => setCurrentSection(ESections.NITRO)}
      >
        <Icon src={NitroIcon} />
        <Label>Nitro</Label>
      </div>
      <div
        className="w-[90%] h-[40px] mx-auto flex items-center cursor-pointer hover:bg-[#42464D] hover:brightness-[1.1] rounded-sm"
        onClick={() => setCurrentSection(ESections.FRIENDS)}
      >
        <Icon src={FriendsIcon} />
        <Label>Friends</Label>
      </div>

      <p className="text-[#62656C] w-[90%] ml-[5%] h-[30px] text-[11px] font-bold uppercase">
        Direct Messages
      </p>

      <div
        className="w-[90%] h-[40px] mx-auto flex items-center cursor-pointer hover:bg-[#42464D] hover:brightness-[1.1] rounded-sm"
        onClick={() => setCurrentSection(ESections.LIBRARY)}
      />

      <SettingsContainer>
        <Avatar src={user.avatar} />
        <Icon
          src={MicrophoneIcon}
          className="mr-[5px] cursor-pointer"
          onClick={() => toggle("microphone")}
        />
        <Icon
          src={HeadphoneIcon}
          className={`mr-[5px] cursor-pointer ${
            !user.headphones ? "opacity-50" : ""
          }`}
          onClick={() => toggle("headphones")}
        />
        <Icon
          src={SettingsIcon}
          className="cursor-pointer"
          onClick={() => setCurrentSection(ESections.SETTINGS)}
        />
      </SettingsContainer>
    </div>
  );
}
