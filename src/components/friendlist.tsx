import React from "react";
import { useSelector } from "react-redux";
import Icon from "./icon";
import Label from "./label";
import { EFriendListFilters } from "./EFriendListFiltersEnum";

interface FriendListProps {
  filter: EFriendListFilters;
}

function FriendList({ filter }: FriendListProps): JSX.Element {
  const user = useSelector((state: any) => state.user);

  const renderFriend = (friend: any): JSX.Element => (
    <div
      key={friend.id}
      className="flex items-center w-full h-15 bg-transparent cursor-pointer hover:bg-gray-700 hover:brightness-110 rounded-lg"
    >
      <Icon src={friend.avatar} />
      <Label>{friend.username}</Label>
      <span
        className={`w-2.5 h-2.5 rounded-full ml-24 mr-2 ${
          friend.online ? "bg-green-500" : "bg-gray-600"
        }`}
      />
      <span className="font-bold text-gray-400">
        {friend.online ? "Online" : "Offline"}
      </span>
    </div>
  );

  const renderFriendList = (): JSX.Element[] => {
    switch (filter) {
      case EFriendListFilters.ALL:
        return user.friends.map(renderFriend);
      case EFriendListFilters.ONLINE:
        return user.friends
          .filter((friend: any) => friend.online)
          .map(renderFriend);
      case EFriendListFilters.PENDING:
        return user.friend_requests.map(renderFriend);
      default:
        return [];
    }
  };

  return <>{renderFriendList()}</>;
}

export default FriendList;
