import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import YouTube from "react-youtube";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InTheater = () => {
  const sidebarVideos = [
    {
      title: "SHAMBALA",
      duration: "2:04",
      embedId: "6F9zpvbsQ6g",
      thumb: "https://img.youtube.com/vi/6F9zpvbsQ6g/mqdefault.jpg",
    },
    {
      title: "MITHRA MANDALI",
      duration: "4:19",
      embedId: "m6neAwuGjFY",
      thumb: "https://img.youtube.com/vi/m6neAwuGjFY/mqdefault.jpg",
    },
    {
      title: "THAMMA",
      duration: "2:32",
      embedId: "kCiQOhg5mq8",
      thumb: "https://img.youtube.com/vi/kCiQOhg5mq8/mqdefault.jpg",
    },
    {
      title: "Predator",
      duration: "1:57",
      embedId: "cDL3Zjdz514",
      thumb: "https://img.youtube.com/vi/cDL3Zjdz514/mqdefault.jpg",
    },
    {
      title: "LIK",
      duration: "2:30",
      embedId: "TnupaGUj1R8",
      thumb: "https://img.youtube.com/vi/TnupaGUj1R8/mqdefault.jpg",
    },
    {
      title: "LOKAH CHAPTER 1",
      duration: "2:13",
      embedId: "64XHtNWTB5o",
      thumb: "https://img.youtube.com/vi/64XHtNWTB5o/mqdefault.jpg",
    },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [autoplaySlider, setAutoplaySlider] = useState(true);
  const currentVideo = sidebarVideos[currentVideoIndex];
  const playerRef = useRef(null);

  const listBgStyle = { backgroundColor: "rgb(10,26,42)" };

  const UpArrow = (props) => (
    <div
      className="text-center"
      style={{ padding: "8px 0", cursor: "pointer", ...listBgStyle }}
      onClick={props.onClick}
    >
      <FaChevronUp className="text-white-50" size={18} />
    </div>
  );

  const DownArrow = (props) => (
    <div
      className="text-center"
      style={{ padding: "8px 0", cursor: "pointer", ...listBgStyle }}
      onClick={props.onClick}
    >
      <FaChevronDown className="text-white-50" size={18} />
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    autoplay: autoplaySlider,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <DownArrow />,
    prevArrow: <UpArrow />,
    beforeChange: (current, next) => setCurrentVideoIndex(next),
  };

  const youtubeOpts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0, // Do not autoplay
      controls: 1,
    },
  };

  const handlePlayerStateChange = (event) => {
    const state = event.data;
    if (state === 1) {
      setAutoplaySlider(false); // Playing
    } else if (state === 2 || state === 0) {
      setAutoplaySlider(true); // Paused or ended
    }
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      const player = playerRef.current;
      if (!player) return;
      const state = player.getPlayerState();

      if (document.hidden) {
        if (state === 1) {
          setAutoplaySlider(true);
        }
      } else {
        if (state === 1) {
          setAutoplaySlider(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="text-white py-4 ">
      <Container >
        <Row>
          {/* Main Video */}
          <Col lg={8} className="mb-3">
            <Card className="border-0 rounded-0 h-100" style={listBgStyle}>
              <div className="ratio ratio-16x9 h-100">
                <YouTube
                  videoId={currentVideo.embedId}
                  opts={youtubeOpts}
                  onStateChange={handlePlayerStateChange}
                  onReady={onPlayerReady}
                />
              </div>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div
              style={{
                overflow: "hidden",
               
                ...listBgStyle,
               
              }}
            >
              <Slider {...sliderSettings}>
                {sidebarVideos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentVideoIndex(index);
                      setAutoplaySlider(false);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="d-flex align-items-center p-2"
                      style={{
                        backgroundColor:
                          index === currentVideoIndex
                            ? "rgb(28,61,94)"
                            : "transparent",
                        borderLeft:
                          index === currentVideoIndex
                            ? "4px solid #1a3c6f"
                            : "4px solid transparent",
                        padding: "10px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <img
                        src={video.thumb}
                        alt={video.title}
                        className="me-3 rounded"
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1 ">
                        <div
                          className="fw-semibold small"
                          style={{
                            fontWeight:
                              index === currentVideoIndex ? "bold" : "normal",
                            color:
                              index === currentVideoIndex ? "#ffffff" : "#ccc",
                          }}
                        >
                          {video.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color:
                              index === currentVideoIndex ? "#ffffff" : "#888",
                          }}
                        >
                          {video.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InTheater;
