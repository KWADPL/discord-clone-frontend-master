import React, { useState } from "react";
import FriendsIcon from "../../assets/friends.png";
import AddFriend from "../addFriend/addFriend";
import FriendList, { EFriendListFilters } from "../friendlist/friendlist";
import Label from "../label/label";
import CenterContainer from "../centercontainer/centerContainer";
import Navbar from "../navbar/navbar";
import Button from "../button/button";
import Icon from "../icon/icon";
import * as S from "./styles";

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
    <S.ContentSection>
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
          >
            Friends
          </Label>
        </CenterContainer>

        <CenterContainer>
          <Label
            style={{ margin: "0 auto" }}
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
            style={{ margin: "0 auto" }}
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
            style={{ margin: "0 auto" }}
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
        <S.FriendListHeaderContainer>
          <S.FriendListHeaderElement>Avatar</S.FriendListHeaderElement>
          <S.FriendListHeaderElement>Name</S.FriendListHeaderElement>
          <S.FriendListHeaderElement>Status</S.FriendListHeaderElement>
        </S.FriendListHeaderContainer>
      )}
      {state.componentsOnView.friendList &&
        FriendList({ filter: state.friendListFilter })}
      {state.componentsOnView.addFriend && <AddFriend />}
    </S.ContentSection>
  );
}
