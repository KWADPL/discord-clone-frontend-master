import React from "react";

import notFoundImage from "../assets/404.png";
import robotImage from "../assets/not-found-robot.png";
import discordLogo from "../assets/discord-logo-transparent.svg";

function NotFound() {
  const handleLogoClick = () => {
    window.location.assign(process.env.SITE_URL ?? "/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          src={notFoundImage}
          alt="404"
          className="w-1/2 mx-auto"
        />
        <h1 className="mt-6 text-3xl font-bold text-gray-700">
          WIZARDS BEHIND CURTAINS?
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          That&apos;s so 1939. Discord is secretly powered by quantum robot hamsters.
          Technology is wild, isn&apos;t it? Anyway, you look lost. Here are a few
          suggested pages.
        </p>
        <ul className="mt-6 space-y-4">
          <li>
            <a
              href="https://status.discordapp.com"
              className="text-indigo-600 hover:underline"
            >
              STATUS PAGE
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/discordapp"
              className="text-indigo-600 hover:underline"
            >
              @DISCORD APP
            </a>
          </li>
          <li>
            <a
              href="https://support.discordapp.com/hc/en-us"
              className="text-indigo-600 hover:underline"
            >
              SUPPORT
            </a>
          </li>
        </ul>
      </div>
      <div>
        <img
          src={robotImage}
          alt="Robot"
          className="mt-6"
        />
      </div>
      <img
        src={discordLogo}
        alt="Discord logo"
        className="absolute bottom-8 left-0 right-0 mx-auto transform scale-150 cursor-pointer"
        onClick={handleLogoClick}
        role="button" 
        tabIndex={0}  
      />
    </div>
  );
}

export default NotFound;
