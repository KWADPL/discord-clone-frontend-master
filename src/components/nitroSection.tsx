import React from "react";
import NitroIcon from "../assets/start-up.png";
import Navbar from "./navbar";
import Icon from "./icon";
import Label from "./label";
import CenterContainer from "./centerContainer";

function NitroSection() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-800">
      <Navbar>
        <CenterContainer>
          <Icon src={NitroIcon} alt="Nitro Icon" className="w-8 h-8" />
          <Label className="text-white font-bold">Nitro</Label>
        </CenterContainer>
      </Navbar>
    </div>
  );
}

export default NitroSection;
