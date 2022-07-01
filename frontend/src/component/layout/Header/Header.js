import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/hgcs.png";
import DeleteIcon from "@material-ui/icons/DeleteForeverSharp";

const options = {
  burgerColorHover: "#eb4034",
  burgerColor: "navy",
  burgertranspiracyColor: "red",
  //logo: "https://www.lunapic.com/editor/premade/transparent.gif",
  logo,
  logoWidth: "100%",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Family: "Franklin Gothic Medium",
  link1Text: "Home",
  link2Text: "Doctors",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/doctors",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "navy",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "navy",
  // cartIconColor: "navy",
  searchIconColor: "navy",
  // selectionIconColor: "navy",
  profileIconColorHover: "#eb4034",
  // cartIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  // selectionIconColorHover: "#eb4034",
  // selectionIconMargin: "1vmax",
  SelectionIconElement: { DeleteIcon },
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
