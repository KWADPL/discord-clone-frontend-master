import React, { useState } from "react";
import FriendsSection from "../friendsection/friendsection";
import ActivitySection from "../activitysection/activitySection";
import LibrarySection from "../librarysection/librarySection";
import NitroSection from "../nitrosection/nitroSection";
import DirectMessages from "../directmessages/directMessages";
import UserSettings from "../usersettings/userSettings";

export enum ESections {
  ACTIVITY = 0,
  LIBRARY,
  NITRO,
  FRIENDS,
  SETTINGS
}

export default function LobbySection(): JSX.Element {
  const [currentSection, setCurrentSection] = useState(ESections.SETTINGS);

  const sections: Map<number, any> = new Map<number, any>();

  sections.set(ESections.FRIENDS, <FriendsSection />);
  sections.set(ESections.ACTIVITY, <ActivitySection />);
  sections.set(ESections.LIBRARY, <LibrarySection />);
  sections.set(ESections.NITRO, <NitroSection />);
  sections.set(
    ESections.SETTINGS,
    <UserSettings setCurrentSection={setCurrentSection} />
  );

  return (
    <>
      {DirectMessages({ setCurrentSection })}
      {sections.get(currentSection)}
    </>
  );
}
