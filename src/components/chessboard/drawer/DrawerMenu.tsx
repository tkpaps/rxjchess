import React, { useState } from "react";
import DrawerMenuOption from "./DrawerMenuOption";
import {
  faUserFriends,
  faLaptopCode,
  faChessBoard,
} from "@fortawesome/free-solid-svg-icons";
import GameOptionsForm from "./GameOptionsForm";
import { mq } from "../../../styles/constants";

const DrawerMenu = ({ closeDrawer }) => {
  const [gameMode, setGameMode] = useState<PlayModes | undefined>(undefined);

  const handleOnClick = (option: PlayModes) => {
    setGameMode(option);
  };

  return (
    <>
      <div
        css={{
          position: "absolute",
          right: "2.5%",
          width: "66%",
          top: 0,
          bottom: "8%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: gameMode && 3,
          [mq[1]]: {
            position: "relative",
            width: "initial",
            right: 0,
            top: "2rem",
          },
        }}
      >
        {gameMode && (
          <GameOptionsForm
            playMode={gameMode}
            onClose={() => setGameMode(undefined)}
            closeDrawer={closeDrawer}
          />
        )}
      </div>
      <div
        css={{
          boxShadow: "inset .1rem 1rem 1.5rem 0 #000000",
          position: "absolute",
          display: "flex",
          top: "0%",
          bottom: "8%",
          left: "2.5%",
          right: "2.5%",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 12,
          [mq[0]]: {
            flexDirection: "column",
            display: gameMode && "none",
          },
        }}
      >
        <DrawerMenuOption
          onClick={() => handleOnClick("PLAY FRIEND")}
          text="PLAY A FRIEND ONLINE"
          icon={faUserFriends}
          selected={gameMode ? gameMode == "PLAY FRIEND" : undefined}
          position={0}
        />
        <DrawerMenuOption
          onClick={() => handleOnClick("PLAY COMPUTER")}
          text="PLAY THE COMPUTER"
          icon={faLaptopCode}
          selected={gameMode ? gameMode == "PLAY COMPUTER" : undefined}
          position={1}
        />
        <DrawerMenuOption
          onClick={() => handleOnClick("PLAY OVER THE BOARD")}
          text="PLAY OVER THE BOARD"
          icon={faChessBoard}
          selected={gameMode ? gameMode == "PLAY OVER THE BOARD" : undefined}
          position={2}
        />
      </div>
    </>
  );
};

export default DrawerMenu;
