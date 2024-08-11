import React, { useState } from "react";
import CreateServerCardMain from "./CreateServerCardMain";
import CreateServerCardCreate from "./createServerCardCreate";
import CreateServerCardJoin from "./createServerCardJoin";
import store from "../Store/index";

enum ECards {
  MAIN = 0,
  CREATE,
  JOIN
}

interface CreateServerCardProps {
  setOnView: (view: boolean) => void;
}

const CreateServerCard: React.FC<CreateServerCardProps> = ({ setOnView }) => {
  const [state, setState] = useState({
    currentServerCard: ECards.MAIN,
    inviteLink: "",
    serverName: "",
    invalidInviteLink: false,
    invalidServerName: false,
    serverNameAlreadyInUse: false
  });

  console.log("serverchat store.getState()", store.getState());

  const renderCard = () => {
    switch (state.currentServerCard) {
      case ECards.CREATE:
        return (
          <CreateServerCardCreate
            backButtonClickHandler={() =>
              setState({ ...state, currentServerCard: ECards.MAIN })
            }
          />
        );
      case ECards.JOIN:
        return (
          <CreateServerCardJoin
            backButtonClickHandler={() =>
              setState({ ...state, currentServerCard: ECards.MAIN })
            }
          />
        );
      case ECards.MAIN:
      default:
        return (
          <CreateServerCardMain
            closeButtonClickHandler={() => setOnView(false)}
            createButtonClickHandler={() =>
              setState({ ...state, currentServerCard: ECards.CREATE })
            }
            joinButtonClickHandler={() =>
              setState({ ...state, currentServerCard: ECards.JOIN })
            }
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gray-800 text-white">
      {renderCard()}
    </div>
  );
};

export default CreateServerCard;