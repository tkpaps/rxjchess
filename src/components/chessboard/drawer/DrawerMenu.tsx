import React, { useEffect, useState } from "react";
import DrawerMenuOption from "./DrawerMenuOption";
import {
  faUserFriends,
  faLaptopCode,
  faChessBoard,
} from "@fortawesome/free-solid-svg-icons";
import GameOptionsForm from "./GameOptionsForm";
import { mq } from "src/styles/constants";
import useMobileView from "src/hooks/useMobileView";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy } from "@fortawesome/free-solid-svg-icons";
import { actions, store } from "src/store";
import Select from "react-select";
import { usePubNub } from "pubnub-react";
import { StyledButton } from "src/components/StyledButton";

const DrawerMenu = ({ closeDrawer, isOpen }) => {
  const [gameMode, setGameMode] = useState<PlayModes | undefined>(undefined);

  // this is where we want to initialize the game
  const handleOnClick = (option: PlayModes) => {
    setGameMode(option);

    const playerArr: Player[] = ["W", "B"];

    const playerVal = playerArr[Math.round(Math.random())]

    const options = {
      gameType: "REGULAR",
      player: playerVal,
      increment: 0,
      maxTime: 10,
      playMode: "PLAY COMPUTER",
      gameId: undefined,
    };

    // if (playMode === "PLAY FRIEND") {
    //   const myGameId = (function () {
    //     return Math.random().toString(36).substr(2, 9);
    //   })();
    //   gameIdRef.current = myGameId;
    //   setGameId(myGameId);
    //   pubNub.unsubscribeAll();
    //   pubNub.addListener({ message: handleOnlineGameCreate });
    //   pubNub.subscribe({ channels: [myGameId], withPresence: true });
    //   pubNub.publish({
    //     channel: myGameId,
    //     message: { type: "CHANNEL_READY" },
    //   });
      // setIsFormComplete(false);
      closeDrawer();
      store.dispatch(actions.newGame(options));
  };

  const mobileView = useMobileView();

  const spacing = [28, 24, 18, 10].map((px) => ({
    bottom: px,
    left: px,
    right: px,
  }));

  useEffect(() => {
    setTimeout(() => {
      !isOpen && setGameMode(undefined);
    }, 300);
  }, [isOpen]);

  return (
    <div
      css={{
        position: "absolute",
        ...spacing[0],
        [mq[0]]: { ...spacing[1] },
        [mq[1]]: { ...spacing[2] },
        [mq[2]]: { ...spacing[3] },
      }}
    >
      {/* {gameMode && (
        <div
          css={{
            position: "absolute",
            width: "66%",
            top: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: gameMode && 3,
            opacity: gameMode ? 1 : 0,
            transition: "all 0.5s",
            [mq[0]]: {
              left: 0,
              width: "100%",
            },
          }}
        >
          <GameOptionsForm
            playMode={gameMode}
            onClose={() => setGameMode(undefined)}
            closeDrawer={closeDrawer}
          />
        </div>
      )} */}
      <div
        css={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          [mq[0]]: {
            flexDirection: "column",
            display: gameMode && "none",
            paddingTop: 16,
          },
        }}
      >
        {mobileView && gameMode ? null : (
          <>
              {/* <DrawerMenuOption
                onClick={() => handleOnClick("PLAY FRIEND")}
                text="PLAY NOW"
                icon={faChessBoard}
                selected={gameMode ? gameMode == "PLAY FRIEND" : undefined}
                position={0}
              /> */}
            <DrawerMenuOption
              onClick={() => handleOnClick("PLAY COMPUTER")}
              text="PLAY NOW"
              icon={faChessBoard}
              selected={gameMode ? gameMode == "PLAY COMPUTER" : undefined}
              position={1}
            />
            {/* <DrawerMenuOption
              onClick={() => handleOnClick("PLAY OVER THE BOARD")}
              text="PLAY OVER THE BOARD"
              icon={faChessBoard}
              selected={
                gameMode ? gameMode == "PLAY OVER THE BOARD" : undefined
              }
              position={2}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default DrawerMenu;
