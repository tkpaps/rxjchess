import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import Drawer from "./drawer";
import { BLACK_BOARD, WHITE_BOARD } from "src/types/constants";
import Tile from "./tile";
import { useSelector } from "react-redux";
import { css, keyframes } from "@emotion/react";
import { ChessGameState } from "src/store";
import Toolbar from "./Toolbar";
import { appear, mq } from "src/styles/constants";
import WrappedTimer from "src/components/cockpit/Timer";
import { _getOpponent } from "src/store/utils";
import useMobileView from "src/hooks/useMobileView";

const Chessboard = () => {
  const data = useStaticQuery(
    graphql`
      query {
        file(base: { eq: "wood.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  const imageData = data.file.childImageSharp.fluid;

  const { player, status: gameStatus } = useSelector(
    (state: ChessGameState) => state.currentGameState
  );

  const mobileView = useMobileView();

  const isGameActive = [
    "IN PROGRESS",
    "INITIALIZING",
    "READY",
    "GAME OVER",
    // "NOT STARTED",
  ].includes(gameStatus);

  const boardStyles = css`
    // animation: ${appear} 1s ease;
    position: relative;
    text-align: center;

    width: ${isGameActive ? "80vh" : "80vw"};
    height: ${isGameActive ? "80vh" : "80vw"};
    margin-top: ${isGameActive ? "0px" : "-100%"};
    ${mq[0]} {
      width: ${isGameActive ? "70vw" : "90vw"};
      height: ${isGameActive ? "70vw" : "90vw"};
      margin-top: ${isGameActive ? "0px" : "-100%"};
    }
    ${mq[1]} {
      width: 100vw;
      height: 95vw;
      margin-top: ${isGameActive ? "0px" : "-100%"};
    }
  `;

  const drawRow = (yPos) => {
    return (
      <div
        key={yPos}
        css={{
          display: "flex",
          width: "100%",
          height: "12.5%",
        }}
      >
        {[...Array(8).keys()].map((xPos) => {
          const key =
            player === "W" ? WHITE_BOARD[yPos][xPos] : BLACK_BOARD[yPos][xPos];
          return <Tile key={key} id={key} xPos={xPos} yPos={yPos} />;
        })}
      </div>
    );
  };

  return (
    <div css={boardStyles}>
      {isGameActive && mobileView && (
        <WrappedTimer player={_getOpponent(player)} />
      )}
      <BackgroundImage
        Tag="div"
        fluid={imageData}
        preserveStackingContext={true}
        style={{
          opacity: 1,
          boxShadow: "0.2px .2rem 0 rgba(1,1,1,0.6)",
          zIndex: 1,
          padding: "2%",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {[...Array(8).keys()]
          .sort((a, b) => b - a)
          .map((yPos) => drawRow(yPos))}
      </BackgroundImage>
      {isGameActive && mobileView && <WrappedTimer player={player} />}
      {isGameActive ? <Toolbar /> : <Drawer />}
    </div>
  );
};

export default Chessboard;
