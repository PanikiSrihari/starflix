// import React, { useState } from 'react';
// import Search from '../search/Search';
// import { Container, Row, Col, Dropdown, Form, Pagination, Card, Button, Spinner } from 'react-bootstrap';
// import "./TVshows.css";

// // Assuming TVshowsinfo now imports your provided 'movie' data,
// // but let's rename it conceptually for clarity.
// import showsData from '../../utils/TVshowsinfo'; // This is now your large array of show objects
// import Navigationbar from "../../components/NavigateBar/Navigationbar";
// import Footer from '../../components/Footer/Footer';

// // A helper function to simulate an API call for a single show's details
// const fetchShowDetails = async (showId) => {
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 500));

//   // Find the show by its ID in the local data
//   const show = showsData.find(item => item.id === showId);

//   if (!show) {
//     throw new Error('TV Show not found');
//   }

//   // In a real application, you would make a fetch request here:
//   // const response = await fetch(`/api/tvshows/${showId}`);
//   // const show = await response.json();
//   return show;
// };


// const Movies = () => { // Keeping the component name as 'Movies' per your original code
//   const [selectedSort, setSelectedSort] = useState('Popularity Descending');
//   const [hoveredMovieId, setHoveredMovieId] = useState(null);

//   const [moviesPerPage, setMoviesPerPage] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);
  
//   // NEW STATE for dynamic details view
//   const [selectedShowDetails, setSelectedShowDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // We should use the TVshowsinfo array which contains the TV show data
//   const totalMovies = showsData.length; 
//   const totalPages = Math.ceil(totalMovies / moviesPerPage);

//   const handleSelect = (eventKey) => {
//     setSelectedSort(eventKey);
//   };

//   const handleMoviesPerPageChange = (e) => {
//     setMoviesPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     setSelectedShowDetails(null); // Hide details when changing pages
//   };

//   // NEW HANDLER to fetch and display details
//   const handleMoreDetailsClick = async (showId) => {
//     setLoading(true);
//     setSelectedShowDetails(null); // Clear previous details

//     try {
//       const details = await fetchShowDetails(showId);
//       setSelectedShowDetails(details);
//     } catch (error) {
//       console.error("Error fetching show details:", error);
//       // Optional: set an error state to display to the user
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // NEW HANDLER to close the details view
//   const handleCloseDetails = () => {
//     setSelectedShowDetails(null);
//   };

//   const paginatedMovies = showsData.slice( // Changed TVshowsinfo to showsData
//     (currentPage - 1) * moviesPerPage,
//     currentPage * moviesPerPage
//   );

//   const renderPagination = () => {
//     const items = [];
//     const maxVisible = 5;

//     if (totalPages <= 7) {
//       for (let number = 1; number <= totalPages; number++) {
//         items.push(
//           <Pagination.Item
//             key={number}
//             active={number === currentPage}
//             onClick={() => handlePageChange(number)}
//           >
//             {number}
//           </Pagination.Item>
//         );
//       }
//     } else {
//       items.push(
//         <Pagination.Item key={1} active={1 === currentPage} onClick={() => handlePageChange(1)}>
//           1
//         </Pagination.Item>
//       );

//       if (currentPage > maxVisible) {
//         items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
//       }

//       let start = Math.max(2, currentPage - 1);
//       let end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         items.push(
//           <Pagination.Item
//             key={i}
//             active={i === currentPage}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </Pagination.Item>
//         );
//       }

//       if (currentPage < totalPages - 2) {
//         items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
//       }

//       items.push(
//         <Pagination.Item
//           key={totalPages}
//           active={totalPages === currentPage}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {totalPages}
//         </Pagination.Item>
//       );
//     }

//     items.push(
//       <Pagination.Next
//         key="next"
//         onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       />
//     );

//     return items;
//   };

//   const TitleArea = () => (
//     <Container className="text-center py-5">
//       <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>TV SHOWS</h1>
//       <p style={{ fontSize: '0.8rem' }}>HOME &gt; TV SHOWS</p>
//     </Container>
//   );

//   // NEW COMPONENT for displaying the fetched details
//   const ShowDetailsCard = ({ show, onClose }) => (
//     <Card className="my-4 bg-dark text-white border-secondary">
//       <Card.Header className="d-flex justify-content-between align-items-center">
//         <h3 className="mb-0">{show.title}</h3>
//         <Button variant="outline-light" onClick={onClose} size="sm">
//           Close X
//         </Button>
//       </Card.Header>
//       <Card.Body>
//         <Row>
//           <Col md={4} lg={3} className="mb-3 mb-md-0 text-center">
//             <img src={show.poster} alt={show.title} style={{ width: '100%', maxWidth: '200px', borderRadius: '5px' }} />
//             <p className="mt-2 mb-0"><strong>Rating:</strong> {show.rating}</p>
//             <p><strong>Run Time:</strong> {show.runTime}</p>
//           </Col>
//           <Col md={8} lg={9}>
//             <h5>Overview</h5>
//             <p>{show.overview}</p>
//             <Row>
//               <Col sm={6}>
//                 <p><strong>Release Date:</strong> {show.releaseDate}</p>
//                 <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
//               </Col>
//               <Col sm={6}>
//                 <p><strong>Director:</strong> {show.director}</p>
//                 <p><strong>Stars:</strong> {show.stars.join(', ')}</p>
//               </Col>
//             </Row>
            
//             {/* Displaying Cast and Crew details */}
//             {show.cast && Object.entries(show.cast).map(([section, members]) => (
//                 <div key={section} className="mt-3">
//                     <h6>{section}</h6>
//                     <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
//                         {members.map((member, index) => (
//                             <li key={index} style={{fontSize: '0.9rem'}}>{member.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}

//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
//   // ---

//   return (
//     <div>
//       <div className="hero">
//         <div className="hero-content ">
//          <Navigationbar />
//           <div className=" pt-104 d-flex justify-content-center text-center">
//             <Search />
//           </div>
//           <TitleArea />
//         </div>
//       </div>

//       <div className="bg-lightblack w-100">
//         <Container className="py-3">
//           <div
//             style={{
//               borderTop: '1px solid #333',
//               borderBottom: '1px solid #333',
//               padding: '10px 0',
//             }}
//           >
//             <Row className="align-items-center" style={{ color: '#d1d1d1' }}>
//               <Col>
//                 <span>
//                   Found{' '}
//                   <a href="#" style={{ color: '#3399ff', textDecoration: 'none' }}>
//                     {totalMovies}
//                   </a>{' '}
//                   TV shows in total
//                 </span>
//               </Col>
//               <Col className="text-end d-flex justify-content-end align-items-center">
//                 <span style={{ color: '#999', marginRight: '8px' }}>Sort by:</span>
//                 <Dropdown onSelect={handleSelect}>
//                   <Dropdown.Toggle
//                     variant="secondary"
//                     size="sm"
//                     style={{
//                       backgroundColor: 'transparent',
//                       border: 'none',
//                       color: '#ffffff',
//                     }}
//                   >
//                     {selectedSort}
//                   </Dropdown.Toggle>

//                   <Dropdown.Menu
//                     style={{
//                       backgroundColor: '#000',
//                       border: '1px solid #444',
//                     }}
//                   >
//                     <Dropdown.Item eventKey="Popularity Descending" style={{ color: '#fff' }}>
//                       Popularity Descending
//                     </Dropdown.Item>
//                     <Dropdown.Item eventKey="Popularity Ascending" style={{ color: '#fff' }}>
//                       Popularity Ascending
//                     </Dropdown.Item>
//                     <Dropdown.Item eventKey="Rating" style={{ color: '#fff' }}>
//                       Rating
//                     </Dropdown.Item>
//                     <Dropdown.Item eventKey="Release Date" style={{ color: '#fff' }}>
//                       Release Date
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>
//               </Col>
//             </Row>
//           </div>
//         </Container>

//         {/* Dynamic Show Details Area */}
//         <Container>
//           {loading && (
//             <div className="text-center py-5">
//               <Spinner animation="border" role="status" variant="light">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//               <p className="text-white mt-2">Fetching details...</p>
//             </div>
//           )}
//           {!loading && selectedShowDetails && (
//             <ShowDetailsCard show={selectedShowDetails} onClose={handleCloseDetails} />
//           )}
//         </Container>
//         {/* --- */}

//         {/* Movie Cards */}
//         <Container className="py-5">
//           <Row xs={1} sm={2} md={3} lg={6} className="g-4">
//             {paginatedMovies.map((movie) => (
//               <Col key={movie.id}>
//                 <div
//                   className="position-relative overflow-hidden movie-card"
//                   style={{ cursor: 'pointer' }}
//                   onMouseEnter={() => setHoveredMovieId(movie.id)}
//                   onMouseLeave={() => setHoveredMovieId(null)}
//                 >
//                   <img
//                     src={movie.poster}
//                     alt={movie.title}
//                     className="w-100"
//                     style={{ height: '250px', objectFit: 'cover' }}
//                   />

//                   {/* Hover Overlay */}
//                   <div
//                     className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
//                     style={{
//                       opacity: hoveredMovieId === movie.id ? 1 : 0,
//                       transition: 'opacity 0.3s ease-in-out',
//                     }}
//                   >
//                     {/* MODIFIED BUTTON: Calls the new async handler */}
//                     <button 
//                       className="btn btn-primary"
//                       onClick={() => handleMoreDetailsClick(movie.id)}
//                       disabled={loading} // Disable button while loading
//                     >
//                       More Details
//                     </button>
//                   </div>
//                 </div>

//                 {/* Movie Title & Rating */}
//                 <div className="text-center text-white mt-2">
//                   <h6 className="mb-1">{movie.title}</h6>
//                   <small style={{ color: '#bbb' }}>Rating: {movie.rating}</small>
//                 </div>
//               </Col>
//             ))}
//           </Row>

//           {/* Pagination and Per Page Selector */}
//           <Row className="align-items-center justify-content-between mt-5">
//             <Col xs="12" md="6" className="mb-2 mb-md-0">
//               <Form className="d-flex align-items-center">
//                 <Form.Label className="mb-0 me-2 text-white">TV shows per page:</Form.Label>
//                 <Form.Select
//                   size="sm"
//                   style={{ width: '150px' }}
//                   value={moviesPerPage}
//                   onChange={handleMoviesPerPageChange}
//                 >
//                   <option value={10}>10 TV shows</option>
//                   <option value={20}>20 TV shows</option>
//                   <option value={50}>50 TV shows</option>
//                   <option value={100}>100 TV shows</option>
//                 </Form.Select>
//               </Form>
//             </Col>

//             <Col xs="12" md="6" className="d-flex justify-content-md-end align-items-center">
//               <span className="me-2 text-white">Page {currentPage} of {totalPages}:</span>
//               <Pagination className="mb-0">{renderPagination()}</Pagination>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//       <div>
//         <Footer/>
//       </div>
//     </div>
//   );
// };

// export default Movies;



import React, { useState } from 'react';
import Search from '../search/Search';
import { Container, Row, Col, Dropdown, Form, Pagination } from 'react-bootstrap';
import "./TVshows.css";
import showsData from '../../utils/TVshowsinfo';
import Navigationbar from "../../components/NavigateBar/Navigationbar";

import { useNavigate } from "react-router-dom"; // ✅ NEW
import Footer from '../../components/Footer/Footer';

const TVShows = () => {
  const [selectedSort, setSelectedSort] = useState('Popularity Descending');
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const [showsPerPage, setShowsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate(); // ✅ NEW

  const totalShows = showsData.length;
  const totalPages = Math.ceil(totalShows / showsPerPage);

  const handleSelect = (eventKey) => {
    setSelectedSort(eventKey);
  };

  const handleShowsPerPageChange = (e) => {
    setShowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ✅ NEW – Navigate on button click
  const goToDetails = (title) => {
    navigate("/AboutMovie", { state: { movieTitle: title } });
  };

  const paginatedShows = showsData.slice(
    (currentPage - 1) * showsPerPage,
    currentPage * showsPerPage
  );

  const renderPagination = () => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= 7) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      items.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );

      if (currentPage > maxVisible) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  const TitleArea = () => (
    <Container className="text-center py-5">
      <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>TV SHOWS</h1>
      <p style={{ fontSize: '0.8rem' }}>HOME &gt; TV SHOWS</p>
    </Container>
  );

  return (
    <div>
      <div className="hero">
        <div className="hero-content ">
         <Navigationbar />
          <div className=" pt-104 d-flex justify-content-center text-center">
            <Search />
          </div>
          <TitleArea />
        </div>
      </div>

      <div className="bg-lightblack w-100">
        <Container className="py-3">
          <div
            style={{
              borderTop: '1px solid #333',
              borderBottom: '1px solid #333',
              padding: '10px 0',
            }}
          >
            <Row className="align-items-center" style={{ color: '#d1d1d1' }}>
              <Col>
                <span>
                  Found{' '}
                  <a href="#" style={{ color: '#3399ff', textDecoration: 'none' }}>
                    {totalShows}
                  </a>{' '}
                  TV shows in total
                </span>
              </Col>
              <Col className="text-end d-flex justify-content-end align-items-center">
                <span style={{ color: '#999', marginRight: '8px' }}>Sort by:</span>
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ffffff',
                    }}
                  >
                    {selectedSort}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      backgroundColor: '#000',
                      border: '1px solid #444',
                    }}
                  >
                    <Dropdown.Item eventKey="Popularity Descending" style={{ color: '#fff' }}>
                      Popularity Descending
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Popularity Ascending" style={{ color: '#fff' }}>
                      Popularity Ascending
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Rating" style={{ color: '#fff' }}>
                      Rating
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Release Date" style={{ color: '#fff' }}>
                      Release Date
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </Container>

        {/* Show Cards */}
        <Container className="py-5">
          <Row xs={1} sm={2} md={3} lg={6} className="g-4">
            {paginatedShows.map((show) => (
              <Col key={show.id}>
                <div
                  className="position-relative overflow-hidden movie-card"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredMovieId(show.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                >
                  <img
                    src={show.poster}
                    alt={show.title}
                    className="w-100"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
                    style={{
                      opacity: hoveredMovieId === show.id ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                  >
                    <button 
                      className="btn btn-primary  rounded-pill"
                      onClick={() => goToDetails(show.title)} // ✅ FIXED
                    >
                      More Details
                    </button>
                  </div>
                </div>

                {/* Show Title & Rating */}
                <div className="text-center text-white mt-2">
                  <h6 className="mb-1">{show.title}</h6>
                
                </div>
              </Col>
            ))}
          </Row>

          {/* Pagination and Per Page Selector */}
          <Row className="align-items-center justify-content-between mt-5">
            <Col xs="12" md="6" className="mb-2 mb-md-0">
              <Form className="d-flex align-items-center">
                <Form.Label className="mb-0 me-2 text-white">TV shows per page:</Form.Label>
                <Form.Select
                  size="sm"
                  style={{ width: '150px' }}
                  value={showsPerPage}
                  onChange={handleShowsPerPageChange}
                >
                  <option value={10}>10 TV shows</option>
                  <option value={20}>20 TV shows</option>
                  <option value={50}>50 TV shows</option>
                  <option value={100}>100 TV shows</option>
                </Form.Select>
              </Form>
            </Col>

            <Col xs="12" md="6" className="d-flex justify-content-md-end align-items-center">
              <span className="me-2 text-white">Page {currentPage} of {totalPages}:</span>
              <Pagination className="mb-0">{renderPagination()}</Pagination>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </div>
  );
};

export default TVShows;
