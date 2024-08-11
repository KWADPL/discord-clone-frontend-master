import React, { useState } from "react";
import TwitterIcon from "../assets/twitter-icon.svg";
import FacebookIcon from "../assets/facebook-icon.svg";
import InstagramIcon from "../assets/instagram-icon.svg";
import ChestImage from "../assets/chest.svg";
import { ESections } from "../pages/lobby";
import api from "../services/api";
import DeleteAccountMutation from "../graphql/mutations/deleteAccount";
import DeactivateAccountMutation from "../graphql/mutations/deactivateAccount";
import UpdateAccountMutation from "../graphql/mutations/UpdateAccount";
import store from "../Store/index";
import Avatar from "./avatar";
import Icon from "./icon";
import Button from "./button";
import { Input } from "./input";
import UserService from "../services/user.service";

interface User {
  _id: string;
  username: string;
  email: string;
  servers?: any[];
  friends?: any[];
  friend_requests?: any[];
}

type UserSettingsProps = {
  setCurrentSection: (section: ESections) => void;
};

interface UserSettingsState {
  username?: string;
  email?: string;
  password?: string;
}

const UserSettings: React.FC<UserSettingsProps> = ({ setCurrentSection }) => {
  const [editButtonClicked, setEditButtonClicked] = useState<boolean>(false);
  const [state, setState] = useState<UserSettingsState>({});

  const { user } = store.getState();

  const updateAccount = async (): Promise<void> => {
    try {
      const {
        data: {
          data: { update_account }
        }
      } = await api.post(
        "",
        UpdateAccountMutation(
          state.username || "",
          state.email || "",
          state.password || ""
        )
      );

      if (update_account.status === 201) {
        store.dispatch({ type: "UPDATE_USER", fields: state });
      }
    } catch (error) {
      console.error("Error updating account:", error);
    } finally {
      setEditButtonClicked(false);
    }
  };

  const cancelUpdate = (): void => {
    setState({});
    setEditButtonClicked(false);
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      await api.post("", DeleteAccountMutation());
      UserService.logout();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setEditButtonClicked(false);
    }
  };

  const disableAccount = async (): Promise<void> => {
    try {
      await api.post("", DeactivateAccountMutation());
      UserService.logout();
    } catch (error) {
      console.error("Error disabling account:", error);
    } finally {
      setEditButtonClicked(false);
    }
  };

  return (
    <div className="flex w-full h-full bg-gray-800">
      <div className="flex flex-col w-48 h-full bg-gray-700 p-4">
        <h3 className="font-bold text-sm text-gray-400 uppercase mb-2">
          User Settings
        </h3>
        {["My Account", "Privacy & Safety", "Authorized Apps", "Connections", "Billing"].map((item, index) => (
          <Button key={index} className="text-gray-400 text-left bg-transparent">
            {item}
          </Button>
        ))}
        <Button className="text-blue-500 text-left bg-transparent">
          Discord Nitro
        </Button>
        <Button className="text-gray-400 text-left bg-transparent">
          HypeSquad
        </Button>
        <h3 className="font-bold text-sm text-gray-400 uppercase mt-6 mb-2">
          App Settings
        </h3>
        {["Voice & Video", "Notifications", "Activity Feed", "Text & Images", "Appearance", "Streamer Mode", "Language", "Change Log"].map((item, index) => (
          <Button key={index} className="text-gray-400 text-left bg-transparent">
            {item}
          </Button>
        ))}
        <Button
          className="text-red-600 text-left bg-transparent mt-4"
          onClick={UserService.logout}
        >
          Log Out
        </Button>
        <div className="flex space-x-2 mt-4">
          <Icon src={TwitterIcon} />
          <Icon src={FacebookIcon} />
          <Icon src={InstagramIcon} />
        </div>
      </div>

      <div className="w-7/12 mx-4 mt-4 text-uppercase">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-white text-lg">
            My Account{" "}
            <span className="ml-2 text-sm text-gray-400">
              #DiscordTag: {user._id}
            </span>
          </h1>
          <button
            className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 text-white flex justify-center items-center hover:bg-gray-700"
            onClick={() => setCurrentSection(ESections.FRIENDS)}
          >
            X
          </button>
        </div>

        <div
          className={`flex items-center bg-gray-900 border border-gray-800 rounded-lg p-4 ${
            editButtonClicked ? "h-96" : "h-36"
          }`}
        >
          <Avatar
            src={TwitterIcon}
            className={`ml-8 ${editButtonClicked ? "-mt-32" : ""}`}
          />
          {editButtonClicked ? (
            <div className="flex flex-col w-4/5">
              <h3 className="font-bold text-sm text-gray-400 mb-1">USERNAME</h3>
              <Input
                onChange={(e) =>
                  setState((prevState) => ({ ...prevState, username: e.target.value }))
                }
              />
              <h3 className="font-bold text-sm text-gray-400 mb-1">EMAIL</h3>
              <Input
                type="email"
                onChange={(e) =>
                  setState((prevState) => ({ ...prevState, email: e.target.value }))
                }
              />
              <h3 className="font-bold text-sm text-gray-400 mb-1">PASSWORD</h3>
              <Input
                type="password"
                onChange={(e) =>
                  setState((prevState) => ({ ...prevState, password: e.target.value }))
                }
              />
              <div className="flex space-x-4 mt-6">
                <Button
                  className="border border-red-600 text-red-600 bg-transparent"
                  onClick={deleteAccount}
                >
                  Delete Account
                </Button>
                <Button
                  className="border border-red-600 text-red-600 bg-transparent"
                  onClick={disableAccount}
                >
                  Disable Account
                </Button>
                <Button className="bg-transparent text-white border-none h-9" onClick={cancelUpdate}>
                  Cancel
                </Button>
                <Button className="bg-green-500 h-9" onClick={updateAccount}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col ml-8">
              <h3 className="font-bold text-sm text-gray-400 mb-1">USERNAME</h3>
              <p className="text-gray-400">
                {user.username}{" "}
                <span className="text-gray-500 text-sm">#3450</span>
              </p>
              <h3 className="font-bold text-sm text-gray-400 mb-1">EMAIL</h3>
              <p className="text-gray-400">{user.email}</p>
              <Button
                className="mt-12 w-24 h-10 bg-blue-600"
                onClick={() => setEditButtonClicked(true)}
              >
                Edit
              </Button>
            </div>
          )}
        </div>

        <h1 className="font-bold text-white text-lg mt-12 mb-5">
          TWO-FACTOR AUTHENTICATION
        </h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-400 text-xs font-bold">
            Protect your Discord account with an extra layer of security. Once
            configured, you'll be required to enter both your password and an
            authentication code from your mobile phone to sign in.
          </p>
          <img src={ChestImage} alt="treasure chest" className="scale-75" />
        </div>
        <Button className="mt-4 text-xs h-10 bg-blue-600">
          Enable Two-Factor Auth
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
