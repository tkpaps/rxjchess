import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import DrawerMenu from "./DrawerMenu";
import { css } from "@emotion/react";
import { mq } from "../../../styles/constants";

const DrawerMain = ({ isOpen, closeDrawer, ...props }) => {
  const data = useStaticQuery(
    graphql`
      query {
        felt: file(base: { eq: "drawer_base.jpeg" }) {
          childImageSharp {
            fluid(quality: 80, maxWidth: 50) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        wood: file(base: { eq: "wood.jpg" }) {
          childImageSharp {
            fluid(quality: 80, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  const feltImage = data.felt.childImageSharp.fluid;
  const woodImage = data.wood.childImageSharp.fluid;

  const LeftSidePiece = () => {
    return (
      <BackgroundImage
        Tag="div"
        fluid={woodImage}
        className={"sidepiece"}
        style={{
          left: 0,
        }}
      />
    );
  };

  const RightSidePiece = () => {
    return (
      <BackgroundImage
        Tag="div"
        fluid={woodImage}
        className={"sidepiece"}
        style={{
          right: 0,
        }}
      />
    );
  };

  const BottomSidePiece = () => {
    return (
      <BackgroundImage Tag="div" fluid={woodImage} className={"bottompiece"} />
    );
  };

  return (
    <div 
    style={{
      display: 'flex', // This enables flexbox layout
      justifyContent: 'center', // This centers the child horizontally in the container
      alignItems: 'center', // This centers the child vertically in the container
      height: '100%', // Make sure the div takes full height of its parent
      position: 'relative', // Ensures the div is positioned relative to its parent
      // Uncomment if needed: boxShadow: '.1rem 1rem 1rem rgba(0,0,0,.2)',
    }}>
      {/* <BackgroundImage
        Tag="div"
        fluid={feltImage}
        style={{
          height: "100%",
          position: "relative",
          backgroundSize: "5%",
          backgroundRepeat: "repeat",
          // boxShadow: ".1rem 1rem 1rem rgba(0,0,0,.2)",
        }}
      > */}
        {/* <LeftSidePiece />
       
        <BottomSidePiece />
        <RightSidePiece /> */}
        <DrawerMenu closeDrawer={closeDrawer} isOpen={isOpen} />
      {/* </BackgroundImage> */}
    </div>
  );
};

export default DrawerMain;
