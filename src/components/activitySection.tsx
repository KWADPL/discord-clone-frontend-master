import Icon from "./icon";
import ControllerIcon from "../assets/controller.svg";
import CenterContainer from "./centerContainer";
import Label from "./label";

function ActivitySection() {
  return (
    <div className="w-full h-full min-h-screen bg-[#36393f]"> 
      <div className="flex justify-center items-center py-4 bg-gray-900 shadow">
        <CenterContainer>
          <Icon src={ControllerIcon} className="w-6 h-6" />
          <Label className="text-white font-bold uppercase ml-2">
            Activity
          </Label>
        </CenterContainer>
      </div>
    </div>
  );
}

export default ActivitySection;
