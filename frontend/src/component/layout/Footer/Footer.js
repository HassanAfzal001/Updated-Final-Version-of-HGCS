import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD MY APP</h4>
        <p>For Android and IOS mobile phones</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1> Health Guide </h1>
        <h1> Consulting System.</h1>
        <p>Health is Wealth! </p>

        <p>Copyrights 2022 &copy; Hassan_Afzal</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Me</h4>
        <a href="https://www.instagram.com/hassan.afzal_official/">Instagram</a>
        <a href="https://www.youtube.com/channel/UCoK0oeZs_M71ZB3H3SE_LWw">Youtube</a>
        <a href="https://www.facebook.com/hassan.afzal.944">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
