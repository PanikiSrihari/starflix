import React from 'react';
import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShareNodes, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import "./Homebanner.css";

const Homebanner = ({ md }) => {
  const navigate = useNavigate(); // ✅ initialize

  // ✅ Function to navigate to AboutMovie page with movie title
  const goToMovieDetails = () => {
    if (!md.id) return; // safeguard
    navigate("/AboutMovie", { state: { movieTitle: md.title } });
  };

  return (
    <div className="carousel-content ">
      <div className="information">
        <div className="geners">
          <ul>
            {md.genres?.map((g, i) => (
              <li key={i}>
                <span className={`btn btn-${["success", "danger", "warning"][i % 3]}`}>
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="moviename">{md.title}</h2>
        <p className="about">{md.description}</p>

        <div className="suggestion ">
          <button className="btn btn-outline-dark play-btn">
            <FontAwesomeIcon icon={faCirclePlay} /> WATCH TRAILER
          </button> 
          <button className="btn btn-outline-danger heart-btn">
            <FontAwesomeIcon icon={faHeart} style={{ color:"#13aee6", fontSize: "32px" }} />
            ADD TO FAVOURITE
          </button>
          <button className="circle-btn share-btn">
            <FontAwesomeIcon icon={faShareNodes} /> SHARE
          </button>
        </div>

        <div className="details">
          <ul>
            <li>
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B" }} />
              Rating: {md.rating}
            </li>
            <li>Duration: {md.duration}</li>
            <li>Certificate: {md.certificate}</li>
          </ul>
        </div>

        {/* ✅ Updated button with navigation */}
        <button
          type="button"
          className="moredetails-btn btn btn-primary btn-lg"
          onClick={goToMovieDetails}
        >
          MORE DETAILS
        </button>
      </div>

      <div className="movieimage">
        <img src={md.poster} alt={md.title} />
      </div>
    </div>
  );
}

export default Homebanner;
