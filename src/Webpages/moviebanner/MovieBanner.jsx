import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MovieData from "../../utils/MovieData";

const MovieBanner = () => {
  return (
    <div className="position-relative w-100" style={{ height: '700px' }}>
      
      {/* Overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"
        style={{ zIndex: 1 }}
      ></div>

      <Carousel
        className="position-relative h-100"
        indicators={false}
        controls={true}
        style={{ zIndex: 2 }}
      >
        {MovieData.map((movie, index) => (
          <Carousel.Item
            key={movie.id || index}
            className="h-100 d-flex align-items-center"
            interval={movie.interval || 3000}
          >
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                
                {/* Left Text */}
                <div
                  className="col-md-6 text-white"
                  style={{ maxHeight: '600px', overflowY: 'auto' }}
                >
                  <ul className="list-unstyled d-flex flex-wrap gap-2 mb-3">
                    {movie.genres?.map((genre, i) => (
                      <li key={i}>
                        <span className="badge bg-primary">{genre}</span>
                      </li>
                    ))}
                  </ul>

                  <h2>{movie.title}</h2>
                  <p style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {movie.description.length > 400
                      ? movie.description.slice(0, 400) + '...'
                      : movie.description}
                  </p>

                  <ul className="list-unstyled d-flex gap-3 flex-wrap mb-3">
                    <li>
                      <a
                        href={movie.trailer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                      >
                        WATCH TRAILER
                      </a>
                    </li>
                    <li><a href="#" className="text-white">ADD TO FAVORITE</a></li>
                    <li><a href="#" className="text-white">SHARE</a></li>
                  </ul>

                  <ul className="list-unstyled d-flex gap-3 flex-wrap mb-3">
                    <li>⭐ {movie.rating}/10</li>
                    <li>⏱ {movie.duration}</li>
                    <li>{movie.certificate}</li>
                  </ul>

                  <button type="button" className="btn btn-primary btn-lg mt-2">
                    MORE DETAILS
                  </button>
                </div>

                {/* Right Image */}
                <div className="col-md-6 text-center">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="img-fluid rounded shadow"
                    style={{ maxHeight: '600px', objectFit: 'contain' }}
                  />
                </div>

              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieBanner;
