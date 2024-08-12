import React from "react";
import HashtagIcon from "../../assets/hashtag.png";
import TPHIcon from "../../assets/server-icon.png";
import store from "../../Store/index";
import Label from "../label/label";
import CenterContainer from "../centercontainer/centerContainer";
import Avatar from "../avatar/avatar";
import Icon from "../icon/icon";
import * as S from "./styles";


export default function ServerRooms(): JSX.Element {
  const {
    server: { name, _id }
  } = store.getState();

  return (
    <S.Section>
      <CenterContainer
        style={{
          borderBottom: "1px solid #232428",
          width: "100%",
          justifyContent: "flex-start",
          paddingBottom: "5px"
        }}
      >
        <Avatar src={TPHIcon} style={{ filter: "none" }} />
        <Label style={{ maxWidth: "inherit", overflow: "hidden" }}>
          {name}
        </Label>
      </CenterContainer>
      <Label style={{ width: "80%", margin: "0 auto", fontSize: "11px" }}>
        {_id}
      </Label>
      <CenterContainer>
        <Icon src={HashtagIcon} />
        <Label style={{ fontWeight: "bolder", color: "#fff" }}>main</Label>
      </CenterContainer>
    </S.Section>
  );
}