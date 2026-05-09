import React, { useState, useEffect } from "react";
import moment from "moment";
import "./CloudPopup.scss";
import{QuotesService} from '../../../redux/quotes/saga'

const CloudPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [todayDate, setTodayDate] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    // Set the current date and time when the component mounts
    setTodayDate(moment(new Date()).format("MM/DD/YYYY hh:mm:ss a"));

    // Fetch region data
    fetchRegion();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const fetchRegion = async () => {
    try {
      const response = await QuotesService.fetchQuotes();
  
      if (response && response.data) {
        console.log("rajkumar raw data", response.data);
  
        // Skip filtering if there's no field to filter by
        const filteredData = response.data; // Use the entire response data
  
        console.log("rajkumar filtered data", filteredData);
  
        // Handle content and author from the first item in the data
        if (filteredData.length > 0) {
          setContent(filteredData[0].content || "Default Content");
          setAuthor(filteredData[0].author || "Anonymous");
        } else {
          setContent("No content available");
          setAuthor("Unknown author");
        }
      } else {
        console.error("No data received from the API");
        setContent("No content available");
        setAuthor("Unknown author");
      }
    } catch (error) {
      console.error("Error fetching region data:", error);
      setContent("Error fetching content");
      setAuthor("Error");
    }
  };
  
  

  return (
    <>
      {isVisible && (
        <div className="popup-overlay">
   <div className="cloud-popup animated">
  <div className="cloud-shape">
    {/* Smiley Face */}
    <div className="cloud-face">
      <div className="cloud-eyes">
        <div className="eye left-eye"></div>
        <div className="eye right-eye"></div>
      </div>
      <div className="cloud-smile"></div>
    </div>

    {/* Popup Content */}
    <div className="cloud-content">
      <h2 className="cloud-title">Good Vibes Only!</h2>
      <h1 className="cloud-message content-message">{content}</h1>
      <h3 className="cloud-message author-message">- {author}</h3>
    </div>

    {/* Close Button */}
    <button className="cloud-close-button" onClick={handleClose}>
      Let’s Go!
    </button>
  </div>
</div>

        </div>
      )}
    </>
  );
};

export default CloudPopup;
