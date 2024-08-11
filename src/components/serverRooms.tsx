import React from "react";
import HashtagIcon from "../assets/hashtag.png";
import TPHIcon from "../assets/server-icon.png";
import store from "../Store/index";
import Label from "./label";
import CenterContainer from "./centerContainer";
import Avatar from "./avatar";
import Icon from "./icon";

function ServerRooms() {
  const {
    server: { name, _id }
  } = store.getState();

  return (
    <div className="w-72 h-full bg-gray-800 p-4">
      <CenterContainer className="border-b border-gray-700 pb-1 flex items-center">
        <Avatar src={TPHIcon} className="filter-none" />
        <Label className="truncate">{name}</Label>
      </CenterContainer>
      <Label className="w-4/5 mx-auto text-xs text-gray-400">{_id}</Label>
      <CenterContainer className="flex items-center mt-4">
        <Icon src={HashtagIcon} className="w-5 h-5" />
        <Label className="font-bold text-white ml-2">main</Label>
      </CenterContainer>
    </div>
  );
}
export default ServerRooms;
