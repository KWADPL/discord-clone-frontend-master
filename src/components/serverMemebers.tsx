import React from "react";
import store from "../Store/index";
import Label from "./label";
import Avatar from "./avatar";

function ServerMembers() {
  const { server } = store.getState();

  return (
    <div className="w-1/5 h-full bg-gray-800 p-4">
      <h1 className="text-xs font-bold text-gray-400 uppercase mb-4">
        Staff - {server.staff.length}
      </h1>
      {server.staff.map((user: any) => (
        <div
          key={user._id}
          className="flex items-center bg-transparent cursor-pointer hover:bg-gray-600 hover:brightness-110 rounded-md py-2 px-4 mb-2"
        >
          <Avatar src={user.avatar} />
          <Label className="ml-2">{user.username}</Label>
        </div>
      ))}

      <h1 className="text-xs font-bold text-gray-400 uppercase mt-4">
        Members - {server.members.length - server.staff.length}
      </h1>
      {server.members
        .filter(
          (user: any) =>
            !server.staff.find((_user: any) => _user._id === user._id)
        )
        .map((user: any) => (
          <div
            key={user._id}
            className="flex items-center bg-transparent cursor-pointer hover:bg-gray-600 hover:brightness-110 rounded-md py-2 px-4 mb-2"
          >
            <Avatar src={user.avatar} className="filter-none" />
            <Label className="ml-2">{user.username}</Label>
          </div>
        ))}
    </div>
  );
}
export default ServerMembers;
