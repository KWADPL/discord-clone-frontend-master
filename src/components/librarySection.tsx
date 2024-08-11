import React, { useState } from "react";
import BackpackIcon from "../assets/school-book-bag.png";
import FriendSuggestionsBackground from "../assets/friend-suggestions.svg";
import Icon from "./icon";
import CenterContainer from "./centerContainer";
import Navbar from "./navbar";

export enum EViews {
  GAMES = 0,
  GIFTS
}

function LibrarySection() {
  const [state, setState] = useState({
    selected: EViews.GIFTS
  });

  return (
    <div className="overflow-hidden w-full h-screen bg-gray-800">
      <Navbar>
        <CenterContainer>
          <Icon src="{BackpackIcon}" />
          <span className="text-white font-semibold">Library</span>
        </CenterContainer>

        <CenterContainer>
          <span
            onClick={() => setState({ selected: EViews.GAMES })}
            className="text-white cursor-pointer"
          >
            My Games
          </span>
        </CenterContainer>

        <CenterContainer>
          <span
            onClick={() => setState({ selected: EViews.GIFTS })}
            className="text-white cursor-pointer"
          >
            Gift Inventory
          </span>
        </CenterContainer>
      </Navbar>
      {state.selected === EViews.GAMES ? (
        <div className="w-4/5 h-full flex mx-auto text-center">
          <div className="w-full h-full mt-20 flex flex-col">
            <img src={FriendSuggestionsBackground} alt="Background" />
            <span className="text-2xl font-normal mt-5 mb-5">
              No games found
            </span>
            <span className="text-gray-400">
              Hm, seems you don't have any games. Purchase games and they'll
              show up here!
            </span>
          </div>
        </div>
      ) : (
        <div className="w-3/5 mx-auto mt-10">
          <h1 className="border-b border-gray-600 font-normal text-white text-lg pb-2 mb-5">
            Redeem Codes
          </h1>
          <p className="text-sm text-white mb-10">
            Received a code for Nitro or a game? That's exciting! Enter it
            below:
          </p>
          <div className="w-4/5 flex justify-between items-center mb-16">
            <input
              className="w-4/5 h-10 pl-2 bg-gray-700 border-2 border-gray-900 text-white rounded"
              placeholder="WUMP-AAAAA-BBBBB-CCCCC"
            />
            <button className="bg-blue-600 w-24 h-11 rounded text-white font-bold text-xs ml-9 hover:brightness-90">
              Redeem
            </button>
          </div>
          <h1 className="font-normal text-white text-lg pb-2 mb-24">
            Gift Inventory
          </h1>
          <div className="flex flex-col items-center text-center">
            <img src={FriendSuggestionsBackground} alt="Background" />
            <h1 className="text-2xl border-none mt-8 mb-2">
              There are no gifts.
            </h1>
            <p className="text-sm text-gray-500 font-light">
              Feeling generous? Check out{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                our store
              </span>{" "}
              and purchase a gift to make someone's day!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibrarySection;
