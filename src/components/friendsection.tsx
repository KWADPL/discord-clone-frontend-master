import React, { useState } from "react";
import FriendsIcon from "../assets/friends.png";
import AddFriend from "./addFriend";
import FriendList from "./friendlist";
import { EFriendListFilters } from "./EFriendListFiltersEnum";
import Label from "./label";
import CenterContainer from "./centerContainer";
import Navbar from "./navbar";
import Button from "./button";
import Icon from "./icon";

export default function FriendsSection(): JSX.Element {
  const [state, setState] = useState({
    componentsOnView: {
      addFriend: false,
      friendList: true,
      createServerCard: false
    },
    friendListFilter: EFriendListFilters.ALL,
    friendName: ""
  });

  return (
    <div className="w-full h-full bg-gray-800">
      <Navbar>
        <CenterContainer>
          <Icon src={FriendsIcon} />
          <Label
            onClick={() =>
              setState({
                ...state,
                componentsOnView: {
                  friendList: true,
                  addFriend: false,
                  createServerCard: false
                }
              })
            }
            className="cursor-pointer"
          >
            Friends
          </Label>
        </CenterContainer>

        <CenterContainer>
          <Label
            className="mx-auto cursor-pointer"
            onClick={() =>
              setState({
                ...state,
                componentsOnView: {
                  friendList: true,
                  addFriend: false,
                  createServerCard: false
                },
                friendListFilter: EFriendListFilters.ONLINE
              })
            }
          >
            Online
          </Label>
        </CenterContainer>
        <CenterContainer>
          <Label
            className="mx-auto cursor-pointer"
            onClick={() =>
              setState({
                ...state,
                componentsOnView: {
                  friendList: true,
                  addFriend: false,
                  createServerCard: false
                },
                friendListFilter: EFriendListFilters.ALL
              })
            }
          >
            All
          </Label>
        </CenterContainer>
        <CenterContainer>
          <Label
            className="mx-auto cursor-pointer"
            onClick={() =>
              setState({
                ...state,
                componentsOnView: {
                  friendList: true,
                  addFriend: false,
                  createServerCard: false
                },
                friendListFilter: EFriendListFilters.PENDING
              })
            }
          >
            Pending
          </Label>
        </CenterContainer>
        <CenterContainer>
          <Button
            onClick={() =>
              setState({
                ...state,
                componentsOnView: {
                  ...state.componentsOnView,
                  addFriend: true,
                  friendList: false
                }
              })
            }
          >
            Add Friend
          </Button>
        </CenterContainer>
      </Navbar>
      {state.componentsOnView.friendList && (
        <div className="flex w-11/12 h-8 border-b border-gray-600 mx-auto mt-5">
          <span className="text-gray-400 font-bold text-xs uppercase pr-24 mr-5 border-r border-gray-600">
            Avatar
          </span>
          <span className="text-gray-400 font-bold text-xs uppercase pr-24 mr-5 border-r border-gray-600">
            Name
          </span>
          <span className="text-gray-400 font-bold text-xs uppercase pr-24 mr-5 border-r border-gray-600">
            Status
          </span>
        </div>
      )}
      {state.componentsOnView.friendList &&
        FriendList({ filter: state.friendListFilter })}
      {state.componentsOnView.addFriend && <AddFriend />}
    </div>
  );
}
