import React from "react";
import { Link } from "react-router-dom";
import DownArrow from "../assets/down-arrow.svg";
import LanguagesIcon from "../assets/languages-icon.svg";
import DiscordLogo from "../assets/landing-discord-logo.svg";
import TwitterIcon from "../assets/twitter-icon.svg";
import FacebookIcon from "../assets/facebook-icon.svg";
import InstagramIcon from "../assets/instagram-icon.svg";
import ComputerImage from "../assets/computer.svg";
import NotebookImage from "../assets/notebook.svg";
import HeadphonesImage from "../assets/headphones.svg";
import Phone1 from "../assets/phone-1.svg";
import Phone2 from "../assets/phone-2.svg";
import ControllerImage from "../assets/controller.svg";
import CoinImage from "../assets/coin.svg";
import BombImage from "../assets/bomb.svg";
import BoxImage from "../assets/box.svg";
import SquareImage from "../assets/square.svg";
import CircleImage from "../assets/circle.svg";
import TriangleImage from "../assets/triangle.svg";
import XImage from "../assets/x.svg";
import Button from "../components/button";
import './landing.css';

function Landing() {
  return (
    <div className="w-full h-[1100px] bg-[#26262b] font-sans">
      <div className="w-full h-[70px] flex items-center justify-between px-[30px]">
        <div className="flex items-center">
          <img
            src={DiscordLogo}
            className="h-full w-auto cursor-pointer hover:brightness-90"
            alt="Discord logo"
          />
          <ul className="list-none flex ml-[20px]">
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Download
            </li>
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Nitro
            </li>
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Jobs
            </li>
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Developers
            </li>
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Community
            </li>
            <li className="text-[12px] font-bold text-[#a0a6a8] mr-[20px] cursor-pointer hover:brightness-110">
              Support
            </li>
            <img
              src={DownArrow}
              className="h-full w-auto cursor-pointer hover:brightness-90 mx-[5px]"
              alt="Down arrow"
            />
          </ul>
        </div>
        <div className="flex items-center">
          <img
            src={TwitterIcon}
            className="w-[20px] h-auto transform scale-[0.5]"
            alt="Twitter icon"
          />
          <img
            src={FacebookIcon}
            className="w-[20px] h-auto transform scale-[0.5] ml-[10px]"
            alt="Facebook icon"
          />
          <img
            src={InstagramIcon}
            className="w-[20px] h-auto transform scale-[0.5] ml-[10px]"
            alt="Instagram icon"
          />
          <Link to="/login">
            <button
              type="button"
              className="h-[90%] border-[2px] border-[#97979a] w-[70px] text-[14px] font-bold rounded-[15px] bg-transparent cursor-pointer text-[#a0a6a8] hover:brightness-110 ml-[10px] mr-[20px]"
            >
              Login
            </button>
          </Link>
          <span className="w-[1px] h-[60%] bg-[#515155] mx-[10px]" />
          <img
            src={LanguagesIcon}
            className="w-[20px] h-auto transform scale-[0.5]"
            alt="Languages icon"
          />
        </div>
      </div>

      <div className="w-[80%] mx-auto mt-[50px] flex flex-col items-center">
        <h1 className="text-[32px] text-white font-extrabold text-center mb-[5px]">
          It's time to ditch Skype and TeamSpeak.
        </h1>
        <p className="text-[#a0a6a8] text-[14px] text-center font-semibold leading-[27px] mb-[30px]">
          All-in-one voice and text chat for gamers that's free, secure, and
          works on both your desktop and phone.
          <br /> Stop paying for TeamSpeak server and hassling with Skype.
          Simplify your life.
        </p>
        <div className="flex justify-center w-full mb-[50px]">
          <Button className="text-[#43B581] w-[250px] h-[45px] bg-white mr-[20px]">
            Download for Windows
          </Button>
          <Link to="/login">
            <Button className="w-[250px] h-[45px] bg-[#7289da] ml-[20px]">
              Open Discord
            </Button>
          </Link>
        </div>
        <img
          src={BoxImage}
          className="absolute top-[55%] left-[64%] transform -translate-x-[64%] -translate-y-[55%]"
          alt="Box"
        />
        <img
          src={ComputerImage}
          className="absolute h-[500px] w-[500px] left-[50%] top-[155%] transform -translate-x-[50%] -translate-y-[155%]"
          alt="Computer"
        />
        <img
          src={NotebookImage}
          className="absolute h-[400px] w-[600px] left-[80%] top-[145%] transform -translate-x-[80%] -translate-y-[145%]"
          alt="Notebook"
        />
        <img
          src={HeadphonesImage}
          className="absolute left-[80%] top-[100%] transform -translate-x-[80%] -translate-y-[100%] scale-[0.3] mt-[269px]"
          alt="Headphones"
        />
        <div className="absolute top-[165%] left-[22%] transform -translate-x-[22%] -translate-y-[165%] flex">
          <img src={Phone1} className="w-[110px] h-[210px]" alt="Phone 1" />
          <img
            src={Phone2}
            className="w-[120px] h-[200px] ml-[10px]"
            alt="Phone 2"
          />
        </div>
        <img
          src={ControllerImage}
          className="absolute top-[74%] left-[5%] transform scale-[0.15] -translate-x-[5%] -translate-y-[74%]"
          alt="Controller"
        />
        <img
          src={BombImage}
          className="absolute top-[71%] left-[23%] transform -translate-x-[23%] -translate-y-[71%]"
          alt="Bomb"
        />
        <img
          src={CoinImage}
          className="absolute top-[75%] left-[26%] transform -translate-x-[26%] -translate-y-[75%]"
          alt="Coin"
        />
        <img
          src={CoinImage}
          className="absolute top-[45%] left-[55%] transform -translate-x-[55%] -translate-y-[45%]"
          alt="Coin"
        />
        <img
          src={SquareImage}
          className="absolute top-[44%] left-[75%] transform -translate-x-[75%] -translate-y-[44%] faded-image"
          alt="Square"
        />
        <img
          src={SquareImage}
          className="absolute top-[65%] left-[80%] transform -translate-x-[80%] -translate-y-[65%] faded-image"
          alt="Square"
        />
        <img
          src={CircleImage}
          className="absolute top-[80%] left-[88%] transform -translate-x-[88%] -translate-y-[80%] faded-image"
          alt="Circle"
        />
        <img
          src={CircleImage}
          className="absolute top-[50%] left-[28%] transform -translate-x-[28%] -translate-y-[50%] faded-image"
          alt="Circle"
        />
        <img
          src={TriangleImage}
          className="absolute top-[50%] left-[53%] transform -translate-x-[53%] -translate-y-[50%] faded-image"
          alt="Triangle"
        />
        <img
          src={TriangleImage}
          className="absolute top-[90%] left-[19%] transform -translate-x-[19%] -translate-y-[90%] faded-image"
          alt="Triangle"
        />
        <img
          src={XImage}
          className="absolute top-[70%] left-[63%] transform -translate-x-[63%] -translate-y-[70%] faded-image"
          alt="X"
        />
      </div>
    </div>
  );
}

export default Landing;
