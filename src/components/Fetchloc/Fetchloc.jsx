import React, { useState } from "react";
import "./Fetchloc.css";
import cross_icon from "../assests/cross.png";
import nodata from "../assests/no_data_found.png";


function Fetchloc() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const api = "c1088540-7beb-11ee-a88a-3d740c96d128";

  const handleClick = async () => {
    if (!zipCode) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://app.zipcodebase.com/api/v1/search?apikey=${api}&codes=${zipCode}`
      );
      console.log();
      if (res.ok) {
        const data = await res.json();
        setLocationInfo(
          data.results[zipCode][0] || { postalcode: "No Data Available" }
        );
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLocationInfo({ postalcode: "No Data Available" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setZipCode("");
    setLocationInfo(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setZipCode(value);

    if (!value) handleReset();
  };

  return (
    <div className="body">
      <div className={`box ${loading ? "loading" : ""}`}>
        <div className="inputData">
          <input
            type="text"
            value={zipCode}
            placeholder="Enter The Zip Code"
            onChange={handleInputChange}
          />
          {zipCode && (
            <span className="closeIcon" onClick={handleReset}>
              <img className="icon_cross" src={cross_icon} alt="Cross Icon" />
            </span>
          )}
        </div>

        {loading && (
          <img
            src="https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif"
            alt="Loading Indicator"
            className="loadingIndicator"
          />
        )}

        {locationInfo &&
          (locationInfo.postalcode === "No Data Available" ? (
            <img src={nodata} alt="No Data Found" className="noDataImage" />
          ) : (
            <div className="info">
              <h3>Location Info</h3>
              <p>Place Name: {locationInfo.province}</p>
              <p>State: {locationInfo.state}</p>
              <p>Country: {locationInfo.country_code}</p>
            </div>
          ))}

        {!locationInfo && !loading && (
          <button onClick={handleClick}>Get Location</button>
        )}
      </div>
    </div>
  );
}

export default Fetchloc;