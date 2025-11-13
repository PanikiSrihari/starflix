import React, { useState } from 'react';
import Search from '../search/Search';
import Navigationbar from "../../components/NavigateBar/Navigationbar";
import { Container, Row, Col, Dropdown, Form, Pagination, Button, Card } from 'react-bootstrap';
import "./Newsandpopular.css";
import { Link } from 'react-router-dom';
import  Newsinfo from '../../utils/Newsandpopularsinfo';
import Footer from '../../components/Footer/Footer';


const Movies = () => {
  const [selectedSort, setSelectedSort] = useState('Popularity Descending');
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // For search form filters
  const [filters, setFilters] = useState({
    name: '',
    genre: '',
    rating: '',
    yearFrom: '',
    yearTo: ''
  });

  const totalMovies =  Newsinfo.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handleSelect = (eventKey) => {
    setSelectedSort(eventKey);
  };

  const handleMoviesPerPageChange = (e) => {
    setMoviesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Filters Applied:", filters);
    // Here you can add logic to filter  Newsinfo based on filters
  };

  const paginatedMovies =  Newsinfo.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
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
      <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>NEWS &POPULAR</h1>
      <p style={{ fontSize: '0.8rem' }}>HOME &gt;NEWS AND POPULAR</p>
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
          <Row>
            {/* Left Column: Movie Listing */}
            <Col lg={9}>
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
                      <Link to="#" style={{ color: '#3399ff', textDecoration: 'none' }}>
                        {totalMovies}
                      </Link>{' '}
                      News in total
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

              {/* Movie Cards */}
              <Container className="py-5">
                <Row xs={1} sm={2} md={3} lg={6} className="g-4">
                  {paginatedMovies.map((movie) => (
                    <Col key={movie.id}>
                      <div
                        className="position-relative overflow-hidden movie-card"
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredMovieId(movie.id)}
                        onMouseLeave={() => setHoveredMovieId(null)}
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-100"
                          style={{ height: '250px', objectFit: 'cover' }}
                        />

                        {/* Hover Overlay */}
                        <div
                          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
                          style={{
                            opacity: hoveredMovieId === movie.id ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
                          }}
                        >
                          <button className="btn btn-primary  rounded-pill ">More Details</button>
                        </div>
                      </div>

                      {/* Movie Title & Rating */}
                      <div className="text-center text-white mt-2">
                        <h6 className="mb-1">{movie.title}</h6>
                      
                      </div>
                    </Col>
                  ))}
                </Row>

                {/* Pagination and Per Page Selector */}
                <Row className="align-items-center justify-content-between mt-5">
                  <Col xs="12" md="6" className="mb-2 mb-md-0">
                    <Form className="d-flex align-items-center">
                      <Form.Label className="mb-0 me-2 text-white">News per page:</Form.Label>
                      <Form.Select
                        size="sm"
                        style={{ width: '150px' }}
                        value={moviesPerPage}
                        onChange={handleMoviesPerPageChange}
                      >
                        <option value={10}>10 News</option>
                        <option value={20}>20 News</option>
                        <option value={50}>50 News</option>
                        <option value={100}>100 News</option>
                      </Form.Select>
                    </Form>
                  </Col>

                  <Col xs="12" md="6" className="d-flex justify-content-md-end align-items-center">
                    <span className="me-2 text-white">Page {currentPage} of {totalPages}:</span>
                    <Pagination className="mb-0">{renderPagination()}</Pagination>
                  </Col>
                </Row>
              </Container>
            </Col>

            {/* Right Column: Filter Form */}
            <Col lg={3}>
              <Card className="p-3 bg-greenish text-white">
                <h5 className="mb-3">SEARCH FOR MOVIES</h5>
                <Form onSubmit={handleFilterSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={filters.name}
                      onChange={handleFilterChange}
                      placeholder="Enter keywords"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Genres & Subgenres</Form.Label>
                    <Form.Select
                      name="genre"
                      value={filters.genre}
                      onChange={handleFilterChange}
                    >
                      <option value="">-- Select Genre --</option>
                      <option value="Action">Action</option>
                      <option value="Drama">Drama</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Thriller">Thriller</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Rating Range</Form.Label>
                    <Form.Select
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                    >
                      <option value="">-- Select rating range --</option>
                      <option value="1-3">1 - 3</option>
                      <option value="4-6">4 - 6</option>
                      <option value="7-10">7 - 10</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Release Year</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          name="yearFrom"
                          value={filters.yearFrom}
                          onChange={handleFilterChange}
                          placeholder="From"
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          name="yearTo"
                          value={filters.yearTo}
                          onChange={handleFilterChange}
                          placeholder="To"
                        />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Button type="submit" className="w-100 btn bg-blue border-0">
                    Submit
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer/>
    </div>
  );
};

export default Movies;
