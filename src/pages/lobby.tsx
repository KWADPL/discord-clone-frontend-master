import React, { useState } from "react";
import FriendsSection from "../components/friendsection";
import ActivitySection from "../components/activitySection";
import LibrarySection from "../components/librarySection";
import NitroSection from "../components/nitroSection";
import DirectMessages from "../components/directMessages";
import UserSettings from "../components/userSettings";

export enum ESections {
  ACTIVITY = 0,
  LIBRARY,
  NITRO,
  FRIENDS,
  SETTINGS
}

export default function LobbySection(): JSX.Element {
  const [currentSection, setCurrentSection] = useState<ESections>(ESections.SETTINGS);

  const sections = new Map<ESections, JSX.Element>([
    [ESections.FRIENDS, <FriendsSection key="friends-section" />],
    [ESections.ACTIVITY, <ActivitySection key="activity-section" />],
    [ESections.LIBRARY, <LibrarySection key="library-section" />],
    [ESections.NITRO, <NitroSection key="nitro-section" />],
    [
      ESections.SETTINGS,
      <UserSettings key="user-settings" setCurrentSection={setCurrentSection} />
    ]
  ]);

  return (
    <div className="w-full h-full min-h-full">
      <DirectMessages setCurrentSection={setCurrentSection} />
      {sections.get(currentSection)}
    </div>
  );
}