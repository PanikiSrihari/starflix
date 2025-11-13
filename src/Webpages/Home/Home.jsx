import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { Container, Row, Col, Nav, Button, Dropdown } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import Navigationbar from "../../components/NavigateBar/Navigationbar";
import chunk from "lodash/chunk";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const slides = [
  {
    id: 1,
    title: "MIRAI",
    genres: ["DRAMA", "ACTION", "HISTORICAL"],
    description:
      "Mirai (also marketed as Mirāi: Super Yodha) is a 2025 Indian Telugu-language fantasy action-adventure film written and directed by Karthik Gattamneni. Produced by TG Vishwa Prasad and Krithi Prasad under People Media Factory, the film stars Teja Sajja, Manchu Manoj, Ritika Nayak, Shriya Saran, Jagapathi Babu and Jayaram.",
    rating: "9.0/10",
    duration: "2hr 30min",
    certificate: "U/A",
    imgSrc: "/images/img3.webp",
    interval: 10000,
  },
  {
    id: 2,
    title: "MADHARAASI",
    genres: ["ACTION", "DRAMA", "THRILLER"],
    description:
      "Madharaasi is a 2025 Indian Tamil-language psychological action thriller film written and directed by A. R. Murugadoss. Produced by Sri Lakshmi Movies, the film stars Sivakarthikeyan, Rukmini Vasanth, Vidyut Jammwal, Biju Menon, Vikranth and Shabeer Kallarakkal.",
    rating: "8.5/10",
    duration: "2hr 40min",
    certificate: "U/A",
    imgSrc: "/images/img2.webp",
    interval: 8000,
  },
  {
    id: 3,
    title: "WAR 2",
    genres: ["ACTION", "SPY", "THRILLER"],
    description:
      "War 2 is a 2025 Indian Hindi-language action-thriller film directed by Ayan Mukerji and produced by Aditya Chopra under Yash Raj Films. The film stars Hrithik Roshan, N. T. Rama Rao Jr., and Kiara Advani.",
    rating: "8.8/10",
    duration: "2hr 35min",
    certificate: "U/A",
    imgSrc: "/images/img4.webp",
    interval: 7000,
  },
];

const colors = ["danger", "success", "warning"];

// movie list
const moviecards = [
  { id: 0, image: "/images/Eimg2.jpg", title: "Until Dawn", language: "ENGLISH" },
  { id: 1, image: "/images/Eimg3.jpg", title: "X-Men", language: "ENGLISH" },
  { id: 2, image: "/images/Eimg4.jpg", title: "The Matrix", language: "ENGLISH" },
  { id: 3, image: "/images/Eimg5.jpg", title: "Mortal Engines", language: "ENGLISH" },
  { id: 4, image: "/images/Eimg6.jpg", title: "Brave", language: "ENGLISH" },
  { id: 5, image: "/images/Eimg7.jpg", title: "Superman Returns", language: "ENGLISH" },
  { id: 6, image: "/images/Eimg11.avif", title: "Don't Speak", language: "ENGLISH" },
  { id: 7, image: "/images/Eimg13.avif", title: "Alien: Romulus", language: "ENGLISH" },
  { id: 8, image: "/images/Eimg14.jpg", title: "1917", language: "ENGLISH" },
  { id: 9, image: "/images/Eimg15.jpg", title: "Avatar: The Way of Water", language: "ENGLISH" },
  { id: 10, image: "/images/Eimg16.webp", title: "Jumanji", language: "ENGLISH" },
  { id: 11, image: "/images/Eimg17.jpeg", title: "Morbius", language: "ENGLISH" },
  { id: 12, image: "/images/himg1.jpg", title: "Maa", language: "HINDI" },
  { id: 13, image: "/images/himg2.jpg", title: "Dunki", language: "HINDI" },
  { id: 14, image: "/images/himg3.jpg", title: "Jawan", language: "HINDI" },
  { id: 15, image: "/images/himg4.webp", title: "Stree", language: "HINDI" },
  { id: 16, image: "/images/himg5.webp", title: "Brahmāstra: Part One – Shiva", language: "HINDI" },
  { id: 17, image: "/images/himg6.webp", title: "Deva", language: "HINDI" },
  { id: 18, image: "/images/Teimg1.avif", title: "Kishkindhapuri", language: "TELUGU" },
  { id: 19, image: "/images/Teimg2.avif", title: "Bhimaa", language: "TELUGU" },
  { id: 20, image: "/images/Teimg3.jpg", title: "They Call Him OG", language: "TELUGU" },
  { id: 21, image: "/images/Teimg4.jpg", title: "V", language: "TELUGU" },
  { id: 22, image: "/images/Teimg5.jpg", title: "Thandel", language: "TELUGU" },
  { id: 23, image: "/images/Teimg6.avif", title: "KA", language: "TELUGU" },
  { id: 24, image: "/images/Taimg1.webp", title: "Kingston", language: "TAMIL" },
  { id: 25, image: "/images/Taimg2.jpg", title: "Vikram", language: "TAMIL" },
  { id: 26, image: "/images/Taimg3.jpg", title: "Kanguva", language: "TAMIL" },
  { id: 27, image: "/images/Taimg4.jpg", title: "Aramm", language: "TAMIL" },
  { id: 28, image: "/images/Taimg5.jpg", title: "Kabali", language: "TAMIL" },
  { id: 29, image: "/images/Taimg6.jpg", title: "Dragon", language: "TAMIL" },
  { id: 30, image: "/images/mimg1.jpg", title: "Virus", language: "MALAYALAM" },
  { id: 31, image: "/images/mimg2.avif", title: "Marco", language: "MALAYALAM" },
  { id: 32, image: "/images/mimg3.jpg", title: "Joe", language: "MALAYALAM" },
  { id: 33, image: "/images/mimg4.jpg", title: "Kaamuki", language: "MALAYALAM" },
  { id: 34, image: "/images/mimg5.jpg", title: "Premalu", language: "MALAYALAM" },
  { id: 35, image: "/images/mimg6.webp", title: "Lokah: Chapter 1 - Chandra", language: "MALAYALAM" },
];

// TV shows
const Tvshowscards = [
  { id: 1, image: "/images/tv5.webp", title: "Kahat Hanuman Jai Shri Ram" },
  { id: 2, image: "/images/tvs3.jpg", title: "Meesha" },
  { id: 3, image: "/images/tvs4.webp", title: "Jayammu Nischayammu Raa with Jagapathi" },
  { id: 4, image: "/images/tvs5.webp", title: "Sumathi Valavu (Sumathi Valalu)" },
  { id: 5, image: "/images/tvs6.jpg", title: "English Teacher" },
  { id: 6, image: "/images/tvs7.jpg", title: "Red Eye" },
];

const Home = () => {
  const [activeLang, setActiveLang] = useState("english");
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [hoveredShowId, setHoveredShowId] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleMouseEnter = () => setIsShareOpen(true);
  const handleMouseLeave = () => setIsShareOpen(false);

  const navigate = useNavigate();

  const filteredMovies = moviecards.filter(
    (movie) => movie.language.toLowerCase() === activeLang
  );

  // Go to movie info page
  const infopage = (movieTitle) => {
    navigate("/AboutMovie", { state: { movieTitle } });
  };

  // Direct navigation without handleClose
  const navtomovies = () => navigate("/Movies");
  const TVshows = () => navigate("/TVshows");

  return (
    <div>
      <div className="banner">
        <Navigationbar />
        <Container className="py-104">
          <Carousel className="w-100" indicators={false} controls={true}>
            {slides.map((slide) => (
              <Carousel.Item key={slide.id} interval={slide.interval}>
                <Container className="h-100 d-flex justify-content-center align-items-center">
                  <Row className="align-items-center justify-content-center w-100">
                    <Col md={5} className="text-white">
                      <div className="information">
                        <div className="geners mb-3">
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              display: "flex",
                              gap: "0.5rem",
                            }}
                          >
                            {slide.genres.map((genre, idx) => {
                              const color = colors[idx % colors.length];
                              return (
                                <li key={idx}>
                                  <Link
                                    to="#"
                                    className={`badge text-bg-${color}`}
                                  >
                                    {genre}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <h2 className="moviename fs-50 fw-bold">
                          {slide.title}
                        </h2>
                        <p className="about">{slide.description}</p>
                        <div className="suggestion mb-3">
                          <ul className="d-flex gap-3 p-0 m-0 list-unstyled">
                            <li>
                              <i
                                className="fa-solid fa-play me-2"
                                style={{ color: "#74C0FC" }}
                              ></i>
                              <Link
                                to="#"
                                style={{ color: "#74C0FC" }}
                                className="text-decoration-none"
                              >
                                WATCH TRAILER
                              </Link>
                            </li>
                            <li>
                              <i
                                className="fa-solid fa-heart me-2"
                                style={{ color: "#74C0FC" }}
                              ></i>
                              <Link
                                to="#"
                                style={{ color: "#74C0FC" }}
                                className="text-decoration-none"
                              >
                                ADD TO FAVORITE
                              </Link>
                            </li>
                            <li
                              className="share-dropdown-li"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <Dropdown drop="end" show={isShareOpen}>
                                <Dropdown.Toggle
                                  as="div"
                                  className="p-0 border-0 bg-transparent"
                                >
                                  <div className="d-flex align-items-center">
                                    <i
                                      className="fa-solid fa-share-nodes me-2"
                                      style={{ color: "#74C0FC" }}
                                    ></i>
                                    <Link
                                      to="#"
                                      onClick={(e) => e.preventDefault()}
                                      className="text-decoration-none"
                                      style={{ color: "#74C0FC" }}
                                    >
                                      SHARE
                                    </Link>
                                  </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                  className="share-popup"
                                  style={{ backgroundColor: "#74C0FC" }}
                                >
                                  <div className="d-flex gap-2">
                                    <Link
                                      to="URL_FACEBOOK"
                                      target="_blank"
                                      className="text-white"
                                    >
                                      <i className="fa-brands fa-facebook-f"></i>
                                    </Link>
                                    <Link
                                      to="URL_TWITTER"
                                      target="_blank"
                                      className="text-white"
                                    >
                                      <i className="fa-brands fa-twitter"></i>
                                    </Link>
                                    <Link
                                      to="URL_GOOGLE"
                                      target="_blank"
                                      className="text-white"
                                    >
                                      <i className="fa-brands fa-google-plus-g"></i>
                                    </Link>
                                    <Link
                                      to="URL_YOUTUBE"
                                      target="_blank"
                                      className="text-white"
                                    >
                                      <i className="fa-brands fa-youtube"></i>
                                    </Link>
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </ul>
                        </div>

                        <div className="details mb-3">
                          <ul className="d-flex gap-4 p-0 m-0 list-unstyled">
                            <li>
                              <i
                                className="fa-solid fa-star me-2"
                                style={{ color: "#FFD43B" }}
                              ></i>
                              {slide.rating}
                            </li>
                            <li>Run Time: {slide.duration}</li>
                            <li>{slide.certificate}</li>
                          </ul>
                        </div>

                        <Button
                          variant="primary"
                          size="lg"
                          className="moredetails-btn bg-blue rounded-pill border-0"
                          onClick={() => infopage(slide.title)}
                        >
                          MORE DETAILS
                        </Button>
                      </div>
                    </Col>

                    <Col md={4} className="d-flex justify-content-center">
                      <img
                        src={slide.imgSrc}
                        alt={slide.title}
                        className="img-fluid"
                        style={{
                          maxHeight: "400px",
                          objectFit: "contain",
                        }}
                      />
                    </Col>
                  </Row>
                </Container>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      {/* MOVIES SECTION */}
      <div className="Movies bg-black w-100">
        <Container className="py-5">
          <Row className="align-items-center mb-3">
            <Col className="d-flex justify-content-between align-items-center">
              <h2 className="text-white fs-3 fw-bold mb-0 mt-3">MOVIES</h2>
              <Button
                variant="link"
                className="text-uppercase text-white text-decoration-none p-0 fs-6 rounded-pill"
                onClick={navtomovies}
              >
                VIEW ALL <ChevronRight size={16} />
              </Button>
            </Col>
          </Row>

          <Row className="align-items-center mb-4">
            <Col xs="auto" className="flex-grow-1">
              <Nav
                activeKey={activeLang}
                onSelect={(selectedKey) => setActiveLang(selectedKey)}
                className="border-0"
              >
                {["ENGLISH", "HINDI", "TELUGU", "TAMIL", "MALAYALAM"].map(
                  (lang) => (
                    <Nav.Item key={lang} className="me-2">
                      <Nav.Link
                        eventKey={lang.toLowerCase()}
                        className={`text-uppercase fw-medium text-secondary pb-2 border-0 ${
                          activeLang === lang.toLowerCase()
                            ? "text-white border-bottom border-3 border-warning fw-bold"
                            : ""
                        }`}
                      >
                        {lang}
                      </Nav.Link>
                    </Nav.Item>
                  )
                )}
              </Nav>
            </Col>
            <Col xs="auto">
              <div className="d-flex align-items-center">
                <span
                  className="bg-warning me-2"
                  style={{ width: "8px", height: "8px" }}
                ></span>
                <span
                  className="bg-white"
                  style={{ width: "8px", height: "8px" }}
                ></span>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Carousel indicators={false} controls={false}>
                {chunk(filteredMovies, 6).map((group, idx) => (
                  <Carousel.Item key={idx} interval={3000}>
                    <Row className="g-3">
                      {group.map((movieposter) => (
                        <Col key={movieposter.id} xs={12} sm={6} md={4} lg={2}>
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: "250px", cursor: "pointer" }}
                            onMouseEnter={() =>
                              setHoveredMovieId(movieposter.id)
                            }
                            onMouseLeave={() => setHoveredMovieId(null)}
                          >
                            <img
                              src={movieposter.image}
                              alt={movieposter.title}
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
                              style={{
                                opacity:
                                  hoveredMovieId === movieposter.id ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                              }}
                            >
                              <button
                                className="btn btn-primary rounded-pill"
                                onClick={() => infopage(movieposter.title)}
                              >
                                More Details
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-center small text-white">
                            {movieposter.title}
                          </p>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>

          {/* POPULAR TV SHOWS */}
          <Row className="align-items-center mt-5">
            <Col className="d-flex justify-content-between align-items-center">
              <h2 className="text-white fs-3 fw-bold mb-0 mt-3">
                POPULAR TV SHOWS
              </h2>
              <Button
                variant="link"
                className="text-uppercase text-white text-decoration-none p-0 fs-6 rounded-pill"
                onClick={TVshows}
              >
                VIEW ALL <ChevronRight size={16} />
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              <Carousel indicators={false} controls={false}>
                {chunk(Tvshowscards, 6).map((group, idx) => (
                  <Carousel.Item key={idx} interval={3000}>
                    <Row className="g-3">
                      {group.map((show) => (
                        <Col key={show.id} sm={6} md={4} lg={2}>
                          <div
                            className="position-relative overflow-hidden"
                            style={{ height: "250px", cursor: "pointer" }}
                            onMouseEnter={() => setHoveredShowId(show.id)}
                            onMouseLeave={() => setHoveredShowId(null)}
                          >
                            <img
                              src={show.image}
                              alt={show.title}
                              className="w-100 h-100"
                              style={{ objectFit: "cover" }}
                            />
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
                              style={{
                                opacity: hoveredShowId === show.id ? 1 : 0,
                                transition: "opacity 0.3s ease-in-out",
                              }}
                            >
                              <button
                                className="btn btn-primary rounded-pill"
                                onClick={TVshows}
                              >
                                More Details
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 text-center small text-white">
                            {show.title}
                          </p>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>

        <div className="text-blakish w-100">
          <Container className="py-5 text-white py-4">
            <h2 className="text-white fs-3 fw-bold mt-3">IN THEATERS</h2>
            <Col className="text-end">
              <Button
                variant="link"
                className="text-white text-uppercase p-0 rounded-pill"
                style={{ fontSize: "0.9rem" }}
              >
                VIEW ALL &gt;
              </Button>
            </Col>
            <VideoPlayer />
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
