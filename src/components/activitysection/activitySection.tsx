import Icon from "../icon/icon";
import ControllerIcon from "../../assets/gamepad-controller.png";
import CenterContainer from "../centercontainer/centerContainer";
import Label from "../label/label";
import Navbar from "../navbar/navbar";
import * as S from "./Styles";

const ActivitySection = (): JSX.Element => (
  <S.Container>
    <Navbar>
      <CenterContainer>
        <Icon src={ControllerIcon} />
        <Label>Activity</Label>
      </CenterContainer>
    </Navbar>
  </S.Container>
);

export default ActivitySection;
