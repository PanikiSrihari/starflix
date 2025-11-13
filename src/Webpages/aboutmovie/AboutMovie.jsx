import React, { useState, useRef } from "react";
// --------------------------------------------------------------------------
// UPDATED IMPORTS: Added Dropdown from react-bootstrap
import { Container, Row, Col, Button, Nav, Dropdown } from "react-bootstrap"; 
// --------------------------------------------------------------------------
import { useLocation } from "react-router-dom";
import Navigationbar from "../../components/NavigateBar/Navigationbar";
import Search from "../search/Search";
import movie from "../../utils/AboutMovie"; // Assuming this is your data utility
import "./AboutMovie.css";
import Footer from "../../components/Footer/Footer";
import { Link } from 'react-router-dom';
// -------------------------------------------------------------------
// CAST & CREW SECTION
// -------------------------------------------------------------------

const CastCrewSection = ({ title, members, isLast }) => {
    const getRightSideText = (name) => {
        if (name.includes(" as ")) return "... " + name.split(" as ")[1];
        if (name.includes("(")) return name.split("(")[1].replace(")", "").trim();
        if (name.includes("...")) return name.split("...")[1].trim();
        return "";
    };
    const getLeftSideName = (name) => {
        let cleanName = name.split(" as ")[0].split("(")[0].split("...")[0].trim();
        return cleanName;
    };
    return (
        <div
            className="mb-4"
            style={
                !isLast
                    ? { paddingBottom: "15px", marginBottom: "15px", borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }
                    : {}
            }
        >
            <h5
                className="text-uppercase fw-bold mb-3"
                style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "white" }}
            >
                {title}
            </h5>
            {members.map((member, i) => (
                <Row key={i} className="mb-2 align-items-center">
                    <Col xs={1} className="d-flex justify-content-center">
                        <span
                            style={{
                                backgroundColor: "#334455",
                                borderRadius: "50%",
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.7rem",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            {member.role.substring(0, 2).toUpperCase()}
                        </span>
                    </Col>
                    <Col xs={5}>
                        <p className="mb-0">{getLeftSideName(member.name)}</p>
                    </Col>
                    <Col xs={6}>
                        <p className="mb-0 text-end" style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                            {getRightSideText(member.name)}
                        </p>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

// -------------------------------------------------------------------
// AUDIENCE REVIEW SECTION
// -------------------------------------------------------------------

const AudienceReview = ({ review, isLast }) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} style={{ color: "gold" }}>
                    ★
                </span>
            );
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const reviewStyle = isLast
        ? {}
        : {
              paddingBottom: "15px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          };

    return (
        <div
            className="mb-3 p-3"
            style={{
                ...reviewStyle,
                marginBottom: isLast ? "0" : "1.5rem",
            }}
        >
            <p className="mb-2 fst-italic" style={{ color: "yellow", fontSize: "0.8rem" }}>
                {review.hashtags}
            </p>
            <div className="mb-2">{renderStars(review.rating)}</div>
            <div className="d-flex justify-content-start align-items-center mb-2">
                <small className="me-2" style={{ color: "white" }}>
                    {review.date}
                </small>
                <span className="fw-bold">by {review.reviewer}</span>
            </div>
            <p className="mb-0" style={{ color: "white", fontSize: "0.9rem" }}>
                {review.text}
            </p>
        </div>
    );
};

// -------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------

const MovieDetailspage = () => {
    // FIX APPLIED: All React Hooks are now called at the top-level
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("overview");
    const containerRowRef = useRef(null);
    const [showTrailer, setShowTrailer] = useState(false);

    // --------------------------------------------------------------------------
    // NEW HOOKS FOR SHARE DROPDOWN
    const [isShareOpen, setIsShareOpen] = useState(false);
    const handleMouseEnter = () => setIsShareOpen(true);
    const handleMouseLeave = () => setIsShareOpen(false);
    // --------------------------------------------------------------------------

    // Logic to determine the movie, which relies on a hook's value (location)
    const movieTitle = location.state?.movieTitle;
    const selectedMovie = movie.find(m => m.title === movieTitle);
    const currentMovie = selectedMovie || movie[0];

    // Conditional return is now SAFE because all hooks have been called
    if (!currentMovie) {
        return (
            <div>
                <Navigationbar />
                <Container className="text-white pt-5">
                    <h2 className="text-warning">Error 404</h2>
                    <p>Movie details not found for the requested title.</p>
                </Container>
                <Footer />
            </div>
        );
    }


    const thumbnailURL = `https://img.youtube.com/vi/${currentMovie.youTubeID}/maxresdefault.jpg`;
    const embedURL = `https://www.youtube.com/embed/${currentMovie.youTubeID}`;

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
        if (tab !== "overview") setShowTrailer(false);

        if (containerRowRef.current) {
            window.scrollTo({
                top: containerRowRef.current.offsetTop - 80,
                behavior: "smooth",
            });
        }
    };

    const castSections = Object.keys(currentMovie.cast || {});

    return (
        <div
            style={{
                backgroundColor: "rgba(3, 13, 23)",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
            }}
        >
            {/* Background Image - Uses currentMovie */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "500px",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${currentMovie.background})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center top",
                    zIndex: 0,
                }}
            />

            <div style={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
                <Navigationbar />
                <div className="pt-104">
                    <Search />
                </div>

                <Container
                    style={{
                        marginTop: "40px",
                        marginBottom: "40px",
                        borderRadius: "10px",
                        color: "white",
                        maxWidth: "1200px",
                    }}
                >
                    <Row className="align-items-start gx-4 gy-2" ref={containerRowRef}>
                        {/* Left Poster - Uses currentMovie */}
                        <Col
                            md={5}
                            className="text-center mb-4 mb-md-0"
                            style={{ position: "sticky", top: "80px", alignSelf: "flex-start" }}
                        >
                            <img
                                src={currentMovie.poster}
                                alt={currentMovie.title}
                                className="img-fluid rounded shadow"
                                style={{ objectFit: "contain", width: "80%" }}
                            />
                            <Button variant="primary" className="w-100 mt-3">
                                <i className="bi bi-play-fill me-2"></i> WATCH TRAILER
                            </Button>
                            <Button variant="warning" className="w-100 mt-2">
                                <i className="bi bi-ticket-fill me-2"></i> BUY TICKET
                            </Button>
                        </Col>

                        {/* Right Details - Uses currentMovie */}
                        <Col md={7} className="text-white">
                            <h2 className="fw-bold text-warning">{currentMovie.title}</h2>
                            <div
                                className="d-flex align-items-center mb-4"
                                style={{
                                    borderTop: "1px solid rgba(255,255,255,0.2)",
                                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                                    gap: "20px",
                                }}
                            >
                                <div
                                    className="text-center"
                                    style={{
                                        paddingRight: "20px",
                                        borderRight: "1px solid rgba(255,255,255,0.2)",
                                        paddingTop: "15px",
                                        paddingBottom: "15px",
                                        marginTop: "-1px",
                                        marginBottom: "-1px",
                                    }}
                                >
                                    <span className="text-warning fs-5 fw-semibold d-block">
                                        ★ {currentMovie.rating.split("/")[0]}
                                    </span>
                                    <small style={{ fontSize: "0.8rem", color: "white" }}>{currentMovie.reviews}</small>
                                </div>
                                <div className="ms-3 d-flex align-items-center">
                                    <span className="me-2 fw-semibold">Movie Rating:</span>
                                    <span className="fs-5" style={{ color: "gold" }}>
                                        ★★★★<span style={{ color: "rgba(255, 255, 255, 0.3)" }}>★</span>
                                    </span>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------- */}
                            {/* REPLACED CODE: New Action Bar (Favorite and Share) */}
                            <ul className="d-flex gap-3 p-0 m-0 list-unstyled mt-4 mb-4" style={{
                                fontSize: "0.85rem", 
                                fontWeight: "700", 
                                textShadow: "0 0 5px rgba(0,0,0,0.5)"
                            }}>
                                
                                {/* ADD TO FAVORITE */}
                                <li>
                                    <i className="fa-solid fa-heart me-2" style={{ color: "#74C0FC" }}></i>
                                    <Link to="#" style={{ color: "#74C0FC" }} className="text-decoration-none">ADD TO FAVORITE</Link >
                                </li>

                                {/* SHARE Dropdown with Hover Logic */}
                               <li 
                                                   className="share-dropdown-li"
                                                   onMouseEnter={handleMouseEnter}
                                                   onMouseLeave={handleMouseLeave}
                                               >
                                                   <Dropdown drop="end" show={isShareOpen}> 
                                                       
                                                       {/* Custom Toggle: SHARE text and icon */}
                                                       <Dropdown.Toggle 
                                                           as="div" 
                                                           className="p-0 border-0 bg-transparent" 
                                                       >
                                                           <div className="d-flex align-items-center">
                                                               <i 
                                                                   className="fa-solid fa-share-nodes me-2" 
                                                                   style={{ color: "#74C0FC" }} // Icon color
                                                               ></i>
                                                               <Link to="" 
                                                                   onClick={(e) => e.preventDefault()}
                                                                   style={{ color: "#74C0FC" }} // Link text color FIX
                                                                   className="text-decoration-none"
                                                               >
                                                                   SHARE
                                                               </Link>
                                                           </div>
                                                       </Dropdown.Toggle>
                               
                                                       {/* Dropdown Menu: The blue box with social icons */}
                                                       <Dropdown.Menu className="share-popup"style={{ backgroundColor: "#74C0FC" }}>
                                                           <div className="d-flex gap-2">
                                                               {/* Social Icons - Replace HREFS with actual share links */}
                                                               <Link to="URL_FACEBOOK" target="_blank" className="text-white"><i className="fa-brands fa-facebook-f"></i></Link>
                                                               <Link to="URL_TWITTER" target="_blank" className="text-white"><i className="fa-brands fa-twitter"></i></Link>
                                                               <Link to="URL_GOOGLE" target="_blank" className="text-white"><i className="fa-brands fa-google-plus-g"></i></Link>
                                                               <Link to="URL_YOUTUBE" target="_blank" className="text-white"><i className="fa-brands fa-youtube"></i></Link>
                                                           </div>
                                                       </Dropdown.Menu>
                                                   </Dropdown>
                                               </li>
                            </ul>
                            {/* -------------------------------------------------------------------------- */}


                            {/* Tabs */}
                            <Nav
                                variant="tabs"
                                activeKey={activeTab}
                                onSelect={handleTabSelect}
                                className="mb-4"
                                style={{ borderBottom: "none", paddingBottom: "0px" }}
                            >
                                {["overview", "cast", "ratings"].map((tab) => (
                                    <Nav.Item key={tab}>
                                        <Nav.Link
                                            eventKey={tab}
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: activeTab === tab ? "orange" : "white",
                                                fontWeight: "700",
                                                paddingBottom: "8px",
                                                borderBottom: activeTab === tab ? "3px solid orange" : "none",
                                                borderRadius: 0,
                                            }}
                                        >
                                            {tab === "ratings" ? "REVIEWS" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>

                            {/* Tab Content */}
                            {activeTab === "overview" && (
                                <section>
                                    <Row>
                                        <Col md={8}>
                                            <div className="mb-4">
                                                <p style={{ lineHeight: "1.6" }}>{currentMovie.overview.trim()}</p>
                                            </div>

                                            {/* Trailer */}
                                            <div
                                                className="mb-4"
                                                style={{ paddingTop: "15px", borderTop: "1px solid rgba(255,255,255,0.15)" }}
                                            >
                                                <h5 className="fw-bold">WATCH TRAILER</h5>

                                                {!showTrailer ? (
                                                    <div
                                                        onClick={() => setShowTrailer(true)}
                                                        style={{
                                                            position: "relative",
                                                            cursor: "pointer",
                                                            borderRadius: "5px",
                                                            overflow: "hidden",
                                                            paddingBottom: "56.25%", // 16:9
                                                            height: 0,
                                                            backgroundColor: "#000",
                                                        }}
                                                    >
                                                        <img
                                                            src={thumbnailURL}
                                                            alt={`${currentMovie.title} Trailer Thumbnail`}
                                                            className="img-fluid"
                                                            style={{
                                                                position: "absolute",
                                                                top: 0,
                                                                left: 0,
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                position: "absolute",
                                                                top: "50%",
                                                                left: "50%",
                                                                transform: "translate(-50%, -50%)",
                                                                fontSize: "3rem",
                                                                color: "white",
                                                                opacity: 0.9,
                                                                pointerEvents: "none",
                                                                textShadow: "0 0 10px rgba(0,0,0,0.8)",
                                                            }}
                                                        >
                                                            &#9654;
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "5px" }}>
                                                        <iframe
                                                            src={`${embedURL}?autoplay=1`}
                                                            title={`${currentMovie.title} Trailer`}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                                        ></iframe>
                                                    </div>
                                                )}
                                            </div>
                                        </Col>

                                        <Col md={4} className="mt-4 mt-md-0">
                                            <div style={{ paddingLeft: "15px" }}>
                                                <p className="mb-2">
                                                    <strong className="d-block">Director:</strong> {currentMovie.director}
                                                </p>
                                                <p className="mb-2">
                                                    <strong className="d-block">Stars:</strong> {currentMovie.stars.join(", ")}
                                                </p>
                                                <p className="mb-2">
                                                    <strong className="d-block">Genres:</strong> {currentMovie.genres.join(", ")}
                                                </p>
                                                <p className="mb-2">
                                                    <strong className="d-block">Release Date:</strong> {currentMovie.releaseDate}
                                                </p>
                                                <p className="mb-2">
                                                    <strong className="d-block">Run Time:</strong> {currentMovie.runTime}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </section>
                            )}

                            {activeTab === "cast" && (
                                <section>
                                    {castSections.map((title, index) => (
                                        <CastCrewSection
                                            key={title}
                                            title={title}
                                            members={currentMovie.cast[title]}
                                            isLast={index === castSections.length - 1}
                                        />
                                    ))}
                                </section>
                            )}

                            {activeTab === "ratings" && (
                                <section>
                                    <h4 className="text-warning mb-4">AUDIENCE REVIEWS ({currentMovie.audiencereviews.length})</h4>

                                    {currentMovie.audiencereviews && currentMovie.audiencereviews.length > 0 ? (
                                        currentMovie.audiencereviews.map((review, index) => (
                                            <AudienceReview
                                                key={review.id}
                                                review={review}
                                                isLast={index === currentMovie.audiencereviews.length - 1}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-muted">No audience reviews available yet.</p>
                                    )}
                                </section>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            
        </div>
    );
};

export default MovieDetailspage;