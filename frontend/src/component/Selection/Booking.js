import React, { Fragment, useState } from "react";
import "./Booking.css";
import { useSelector, useDispatch } from "react-redux";
import { saveBookingInfo } from "../../actions/selectionAction";
import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps";

const Booking = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { bookingInfo } = useSelector((state) => state.selection);

  const [address, setAddress] = useState(bookingInfo.address);
  const [city, setCity] = useState(bookingInfo.city);
  const [state, setState] = useState(bookingInfo.state);
  const [country, setCountry] = useState(bookingInfo.country);
  const [pinCode, setPinCode] = useState(bookingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(bookingInfo.phoneNo);
  const [time, setTime] = useState(bookingInfo.time);

  const bookingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 12 || phoneNo.length > 12) {
      alert.error("Phone Number should be 12 digits Long with country code");
      return;
    }
    dispatch(
      saveBookingInfo({ address, city, state, country, pinCode, phoneNo, time })
    );
    history.push("/appointment/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Booking Details" />

      <CheckoutSteps activeStep={0} />

      <div className="bookingContainer">
        <div className="bookingBox">
          <h2 className="bookingHeading">Booking Details</h2>

          <form
            className="bookingForm"
            encType="multipart/form-data"
            onSubmit={bookingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="Time __ am/pm - __am/pm "
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="bookingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Booking;
