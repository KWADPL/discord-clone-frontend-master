
import Icon from "../icon/icon";
import Label from "../label/label";
import * as S from "./styles";
import store from "../../Store/index";


export enum EFriendListFilters {
  ALL = 0,
  ONLINE,
  PENDING
}

export default function FriendList({ filter }:any): JSX.Element {
  const modes: Map<number, any> = new Map<number, any>();

  const { user }: any = store.getState();

  modes.set(EFriendListFilters.ALL, (user: any): any =>
    user.friends.map((friend: any): any => (
      <S.UserRow key={Math.random()}>
        <Icon src={friend.avatar} />
        <Label>{friend.username}</Label>
        <S.GreenDot color={friend.online ? "#43b480" : "#747F8D"} />
        <S.Status>{friend.online ? "Online" : "Offline"}</S.Status>
      </S.UserRow>
    ))
  );

  modes.set(EFriendListFilters.ONLINE, (user: any): any =>
    user.friends
      .filter((friend: any): boolean => friend.online)
      .map((friend: any): any => (
        <S.UserRow key={Math.random()}>
          <Icon src={friend.avatar} />
          <Label>{friend.username}</Label>
          <S.GreenDot color={friend.online} />
          <S.Status>Online</S.Status>
        </S.UserRow>
      ))
  );

  modes.set(EFriendListFilters.PENDING, (user: any): any =>
    user.friend_requests.map((friend: any): any => (
      <S.UserRow key={Math.random()}>
        <Icon src={friend.avatar} />
        <Label>{friend.username}</Label>
        <S.GreenDot color={friend.online} />
        <S.Status>Online</S.Status>
      </S.UserRow>
    ))
  );

  return modes.get(filter)(user);
}
