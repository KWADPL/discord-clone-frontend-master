import React, { useState } from "react";
import LobbySection from "../../components/lobbysection/lobbySection";
import ServerRooms from "../../components/serverrooms/serverRooms";
import ServerChat from "../../components/serverchat/serverChat";
import ServerMembers from "../../components/servermemebers/serverMemebers";
import LeftSideNavbar from "../../components/Lelfsidenavbar/leftSideNavbar";
import { Container } from "./styles";


export enum EViews {
  MAIN = 0,
  SERVER
}

export default function Lobby(): JSX.Element {
  const [currentView, setCurrentView] = useState(EViews.MAIN);

  const views: Map<number, any> = new Map<number, any>();

  views.set(
    EViews.MAIN,
    <>
      <LobbySection />
    </>
  );

  views.set(
    EViews.SERVER,
    <>
      <ServerRooms />
      <ServerChat />
      <ServerMembers />
    </>
  );

  return (
    <Container>
      <LeftSideNavbar setCurrentView={setCurrentView} />
      {views.get(currentView)}
    </Container>
  );
}
