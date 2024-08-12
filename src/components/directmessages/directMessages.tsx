import React from "react";
import NitroIcon from "../../assets/start-up.png";
import ControllerIcon from "../../assets/gamepad-controller.png";
import BackpackIcon from "../../assets/school-book-bag.png";
import FriendsIcon from "../../assets/friends.png";
import MicrophoneIcon from "../../assets/microphone-black-shape.svg";
import HeadphoneIcon from "../../assets/headphone-symbol.svg";
import SettingsIcon from "../../assets/settings-work-tool.svg";
import { ESections } from "../lobbysection/lobbySection";
import Label from "../label/label";
import Icon from "../icon/icon";
import store from "../../Store/index";
import Avatar from "../avatar/avatar";
import SettingsContainer from "../settingscontainer/settingsContainer";
import * as S from "./styles";

export default function DirectMessages({
  setCurrentSection,
}: any): JSX.Element {
  const { user }: any = store.getState();

  const toggle = (input: string): void => {
    const newUser: any = { ...user };
    newUser[input] = !user[input];
    store.dispatch({ type: "SET_USER", user: newUser });
  };

  return (
    <S.Section>
      <S.SearchBar placeholder="Find or start a conversation" />
      <S.Container onClick={() => setCurrentSection(ESections.ACTIVITY)}>
        <Icon src={ControllerIcon} />
        <Label>Activity</Label>
      </S.Container>
      <S.Container onClick={() => setCurrentSection(ESections.LIBRARY)}>
        <Icon src={BackpackIcon} />
        <Label>Library</Label>
      </S.Container>
      <S.Container onClick={() => setCurrentSection(ESections.NITRO)}>
        <Icon src={NitroIcon} />
        <Label>Nitro</Label>
      </S.Container>
      <S.Container onClick={() => setCurrentSection(ESections.FRIENDS)}>
        <Icon src={FriendsIcon} />
        <Label>Friends</Label>
      </S.Container>

      <S.Message>Direct Messages</S.Message>

      <S.Container onClick={(): void => setCurrentSection(ESections.LIBRARY)} />

      <SettingsContainer>
        <Avatar src={user.avatar} />

        <Icon
          src={MicrophoneIcon}
          className="icon-style"
          onClick={() => toggle("microphone")}
        />
        <Icon
          className={`icon-style ${!user.headphones ? "no-headphones" : ""}`}
          src={HeadphoneIcon}
          onClick={() => toggle("headphones")}
        />
        <Icon
          src={SettingsIcon}
          className="icon-style"
          onClick={() => setCurrentSection(ESections.SETTINGS)}
        />
      </SettingsContainer>
    </S.Section>
  );
}
