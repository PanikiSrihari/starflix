import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigationbar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Handler for 'SIGN OUT'
    const signout = (e) => {
        e.preventDefault();
        navigate("/"); // Navigates to home or login page
    };

    // Handler for 'ACCOUNT'
    const navigateToAccount = () => {
        setIsDropdownOpen(false);
        navigate("/MyAccount");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll Logic for Fixed/Absolute Navbar
    useEffect(() => {
        const BANNER_HEIGHT_THRESHOLD = 600;

        const handleScroll = () => {
            if (window.scrollY > BANNER_HEIGHT_THRESHOLD) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsDropdownOpen((prev) => !prev);
    };

    const styles = {
        navbar: {
            padding: '12px 0',
            height: '104px',
            zIndex: 1030,
            transition: 'background-color 0.3s ease',
            top: 0,
            width: '100%',
            position: isSticky ? 'fixed' : 'absolute',
            backgroundColor: isSticky ? '#0a1a2a' : 'transparent',
        },
        navLink: {
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: '500',
            opacity: '0.8',
            marginRight: '25px',
            transition: 'opacity 0.2s',
        },
        logo: {
            height: '40px',
            width: 'auto',
            marginRight: '30px',
        },
        dropdownWrapper: {
            position: 'relative',
            marginLeft: '15px',
        },
        userIconContainer: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        userIcon: {
            width: '70%',
            height: '70%',
            objectFit: 'contain',
            borderRadius: '50%',
        },
        dropdownMenu: {
            position: 'absolute',
            top: '60px',
            right: 0,
            backgroundColor: '#0b1e3c',
            color: 'white',
            borderRadius: '5px',
            minWidth: '180px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
            fontSize: '0.9rem',
        },
        dropdownItem: {
            padding: '10px 15px',
            cursor: 'pointer',
            borderBottom: '1px solid #1e2a40',
        },
        dropdownItemLast: {
            padding: '10px 15px',
            cursor: 'pointer',
        },
    };

    return (
        <Navbar
            expand="lg"
            variant="dark"
            style={styles.navbar}
            className={isSticky ? 'bg-grayish' : ''}
        >
            <Container fluid className="px-5">
                {/* Logo */}
                <NavLink to="/Home">
                    <img src="/images/logo.png" alt="StarFlix Logo" style={styles.logo} />
                </NavLink>

                <Navbar.Toggle aria-controls="navbar-collapse" />

                <Navbar.Collapse id="navbar-collapse">
                    <Nav className="ms-auto align-items-center">
                        <NavLink to="/Home" style={styles.navLink}>HOME</NavLink>
                        <NavLink to="/Movies" style={styles.navLink}>MOVIES</NavLink>
                        <NavLink to="/TVshows" style={styles.navLink}>TV SHOWS</NavLink>
                        <NavLink to="/Newsandpopular" style={styles.navLink}>NEW & POPULAR</NavLink>

                        {/* Icon + dropdown */}
                        <div style={styles.dropdownWrapper} ref={dropdownRef}>
                            <div style={styles.userIconContainer} onClick={toggleDropdown}>
                                <img src="/images/digit_icon.png" alt="User Icon" style={styles.userIcon} />
                            </div>

                            {isDropdownOpen && (
                                <div style={styles.dropdownMenu} onClick={e => e.stopPropagation()}>
                                    <div style={styles.dropdownItem} onClick={navigateToAccount}>ACCOUNT</div>
                                    <div style={styles.dropdownItemLast} onClick={signout}>SIGN OUT OF STARFLIX</div>
                                </div>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
