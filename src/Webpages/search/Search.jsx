import React, { useState } from 'react';
import { Form, InputGroup, Dropdown, Button, Container } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import "./Search.css";
const Search = () => {
  const [selectedCategory, setSelectedCategory] = useState("TV SHOW");

  const handleSelect = (eventKey) => {
    setSelectedCategory(eventKey.toUpperCase());
  };

  return (
    <Container className="my-3">
      <div className="p-3 rounded">
        <InputGroup>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="text-light bg-greenish border-0 px-3 py-2 shadow-none"
            >
              {selectedCategory}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="movie">Movie</Dropdown.Item>
              <Dropdown.Item eventKey="celebrity">Celebrity</Dropdown.Item>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            type="text"
            placeholder="Search for a movie, TV Show or celebrity"
            aria-label="Search query"
           className="search-input bg-greenish px-3 py-2 border-0 shadow-none"
          />

          <Button className="px-3 bg-greenish border-0 shadow-none">
            <BsSearch size={20} className="text-white" />
          </Button>
        </InputGroup>
      </div>
    </Container>
  );
};

export default Search;
