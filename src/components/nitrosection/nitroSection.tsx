import React from "react";
import NitroIcon from "../../assets/start-up.png";
import Navbar from "../navbar/navbar";
import Icon from "../icon/icon";
import Label from "../label/label";
import CenterContainer from "../centercontainer/centerContainer";
import * as S from "./styles";

export default function NitroSection(): JSX.Element {
  return (
    <S.Container>
      <Navbar>
        <CenterContainer>
          <Icon src={NitroIcon} />
          <Label>Nitro</Label>
        </CenterContainer>
      </Navbar>
    </S.Container>
  );
}
