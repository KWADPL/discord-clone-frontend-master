import React, { useState } from "react";
import FriendsSection from "./friendsection";
import ActivitySection from "./activitySection";
import LibrarySection from "./librarySection";
import NitroSection from "./nitroSection";
import DirectMessages from "./directMessages";
import UserSettings from "./userSettings";

export enum ESections {
  ACTIVITY = 0,
  LIBRARY,
  NITRO,
  FRIENDS,
  SETTINGS
}

function LobbySection(): JSX.Element {
  const [currentSection, setCurrentSection] = useState(ESections.SETTINGS);

  const sections = new Map<number, JSX.Element>([
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
export default LobbySection;
