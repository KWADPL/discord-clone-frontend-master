import React from "react";
import store from "../../Store/index";
import Label from "../label/label";
import Avatar from "../avatar/avatar";
import * as S from "./styles";

export default function ServerMembers(): JSX.Element {
  const { server } = store.getState();

  return (
    <S.Container>
      <S.H1>Staff - {server.staff.length}</S.H1>
      {server.staff.map((user: any): any => (
        <S.OptionContainer key={user._id} style={{ marginTop: "10px" }}>
          <Avatar src={user.avatar} />
          <Label>{user.username}</Label>
        </S.OptionContainer>
      ))}

      <S.H1>Members - {server.members.length - server.staff.length}</S.H1>
      {server.members
        .filter(
          (user: any): boolean =>
            !server.staff.find((_user: any): any => _user._id === user._id)
        )
        .map((user: any): any => (
          <S.OptionContainer key={user._id} style={{ marginTop: "10px" }}>
            <Avatar src={user.avatar} style={{ filter: "none" }} />
            <Label>{user.username}</Label>
          </S.OptionContainer>
        ))}
    </S.Container>
  );
}
