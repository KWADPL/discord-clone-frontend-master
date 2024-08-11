import React, { useState, useEffect } from "react";
import DiscordLogo from "../assets/discord-icon.png";
import CreateServerImage from "../assets/plus.png";
import CreateServerCard from "./createServerCard";
import { EViews } from "./eviews";
import Avatar from "./avatar";
import ServerQuery from "../graphql/queries/server";
import store from "../Store/index";
import api from "../services/api";

interface Props {
  setCurrentView: (view: EViews) => void;
}

function LeftSideNavbar({ setCurrentView }: Props): JSX.Element {
  const [state, setState] = useState({
    joiningServer: false,
    componentsOnView: {
      createServerCard: false
    },
    userServers: store.getState().user.servers
  });

  useEffect(() => {
    const unsubscribe = store.subscribe(() =>
      setState({ ...state, userServers: store.getState().user.servers })
    );
    return () => unsubscribe();
  }, [state]);

  const join = async (serverId: string): Promise<void> => {
    if (state.joiningServer) {
      return;
    }

    try {
      setState({ ...state, joiningServer: true });

      const {
        data: {
          data: { server }
        }
      }: any = await api.post("", ServerQuery(serverId));

      switch (server.status) {
        case 200:
          store.dispatch({ type: "SET_SERVER", server: server.server });
          setCurrentView(EViews.MAIN);
          setCurrentView(EViews.SERVER);
          break;
        case 500:
          throw new Error("internal server error");
      }
    } catch (e) {
    } finally {
      setState({ ...state, joiningServer: false });
    }
  };

  const getUserServers = () =>
    state.userServers.map((server: any): any => (
      <Avatar
        src={server.logo}
        key={server._id}
        onClick={async (): Promise<void> => await join(server._id)}
        className="mt-2 cursor-pointer hover:filter hover:brightness-110"
      />
    ));

  return (
    <div className="flex h-screen">
      <div className="flex flex-col bg-gray-800 h-full min-w-[72px] max-w-[72px]">
        <Avatar
          src={DiscordLogo}
          onClick={(): void => setCurrentView(EViews.MAIN)}
          className="mt-2 cursor-pointer hover:filter hover:brightness-110"
        />

        <Avatar
          src={CreateServerImage}
          onClick={(): void =>
            setState({ ...state, componentsOnView: { createServerCard: true } })
          }
          className="mt-2 cursor-pointer hover:filter hover:brightness-110"
        />

        {getUserServers()}
      </div>
      {state.componentsOnView.createServerCard && (
        <CreateServerCard
          setOnView={(onview: boolean): void =>
            setState({
              ...state,
              componentsOnView: { createServerCard: onview }
            })
          }
        />
      )}
    </div>
  );
}
export default LeftSideNavbar;
