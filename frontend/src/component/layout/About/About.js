import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/hassan.afzal_official/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Me</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dh9t9xesv/image/upload/v1655026284/Doctors/lanonynb07kdcdf0hn2n.png"
              alt="Developer"
            />
            <Typography>Name: Hassan Afzal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Portfolio: Instagram
            </Button>
            <span>
              Myself from Comsats University Islamaad and this is my final year project about health care.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow</Typography>
            <a
              href="https://www.youtube.com/channel/UCoK0oeZs_M71ZB3H3SE_LWw"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/hassan.afzal_official/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
