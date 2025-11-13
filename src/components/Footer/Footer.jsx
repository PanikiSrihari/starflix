import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
   
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
       
        <footer className="text-white pt-3 pb-2 mt-auto footer-with-bg z-index: 10 ">
            <Container>
                <Row className="align-items-center">
                    {/* Copyright Section */}
                    <Col xs={12} md={8} className="text-center text-md-start mb-2 mb-md-0">
                        &copy; {new Date().getFullYear()}  StarFlix . All rights reserved.
                    </Col>

                    {/* Back to Top Link */}
                    <Col xs={12} md={4} className="text-center text-md-end">
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                scrollToTop();
                            }}
                            className=" text-white text-decoration-none"
                        >
                            Back to Top <i className="bi bi-arrow-up-circle-fill"></i>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;