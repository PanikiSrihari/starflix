import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import Search from '../search/Search'; 
import "./MyAccount.css"; 
import Navigationbar from "../../components/NavigateBar/Navigationbar";

import { useNavigate } from "react-router-dom"; 

// --- Placeholder Components ---

const Avatar = ({ profileImage }) => (
    <div 
        style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'white',
            margin: '0 auto 15px auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#007bff',
            backgroundImage: `url(${profileImage || '/images/digiticon.png'})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
    />
);

const ProfileSidebar = ({ activeSection, setActiveSection, handleChangeAvatar, handleLogout, profileImage }) => (
    <div className="p-4 " style={{ backgroundColor: '#030d17', color: '#d1d1d1',border:' 2px solid #122131' }}>
        <Avatar profileImage={profileImage} />
        
        <Button 
            variant="info" 
            className="w-100 mb-4" 
            onClick={handleChangeAvatar}
            style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: 'white', borderRadius: '0.25rem' }}
        >
            CHANGE AVATAR
        </Button>
        
        <h6 className="text-uppercase mb-3" style={{ color: '#999' }}>Account Details</h6>
        
        <ul className="list-unstyled">
            {/* Link to show Profile Details form */}
            <li 
                className={`py-2 px-3 mb-1 ${activeSection === 'profile' ? 'active-link' : ''}`}
                onClick={() => setActiveSection('profile')}
                style={{ cursor: 'pointer', backgroundColor: activeSection === 'profile' ? '#1c222b' : 'transparent' }}
            >
                PROFILE
            </li>
            {/* Link to show Change Password form */}
            <li 
                className={`py-2 px-3 mb-1 ${activeSection === 'password' ? 'active-link' : ''}`}
                onClick={() => setActiveSection('password')}
                style={{ cursor: 'pointer', backgroundColor: activeSection === 'password' ? '#1c222b' : 'transparent' }}
            >
                CHANGE PASSWORD
            </li>
            <li 
                className="py-2 px-3 mb-1" 
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
            >
                LOG OUT
            </li>
        </ul>
    </div>
);

// --- Form Components ---

const ProfileDetailsForm = ({ profileData, setProfileData, handleProfileSave }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div >
            <h4 className="mb-4" style={{ color: '#d1d1d1' }}>01. PROFILE DETAILS</h4>
            <Form onSubmit={handleProfileSave}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Username</Form.Label>
                        <Form.Control type="text" name="username" value={profileData.username} readOnly 
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' }}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Email Address</Form.Label>
                        <Form.Control type="email" name="email" value={profileData.email} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' }}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" value={profileData.firstName} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor:'#122131', color: 'white' }}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" value={profileData.lastName} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' }}
                        />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Country</Form.Label>
                        <Form.Control type="text" name="country" value={profileData.country} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' }}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>State</Form.Label>
                        <Form.Control type="text" name="state" value={profileData.state} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' }}
                        />
                    </Col>
                </Row>
                <Button 
                    type="submit" 
                    variant="info" 
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: 'white' }}
                >
                    SAVE
                </Button>
            </Form>
        </div>
    );
};

const ChangePasswordForm = ({ passwordData, setPasswordData, handleChangePassword }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mt-0">
            <h4 className="mb-4" style={{ color: '#d1d1d1' }}>02. CHANGE PASSWORD</h4>
            <Form onSubmit={handleChangePassword}>
                {/* Apply justify-content-center to center the md={6} column horizontally */}
                <Row className="mb-3 justify-content-center">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Old Password</Form.Label>
                        <Form.Control type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor: '#122131', color: 'white' /* Optional: , textAlign: 'center' */ }}
                        />
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-center">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>New Password</Form.Label>
                        <Form.Control type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange}
                            style={{ backgroundColor:'#243a51', borderColor: '#122131', color: 'white' /* Optional: , textAlign: 'center' */ }}
                        />
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col md={6}>
                        <Form.Label style={{ color: '#999' }}>Confirm New Password</Form.Label>
                        <Form.Control type="password" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handleChange}
                            style={{ backgroundColor: '#243a51', borderColor:'#122131', color: 'white' /* Optional: , textAlign: 'center' */ }}
                        />
                    </Col>
                </Row>
                <Button 
                    type="submit" 
                    variant="info" 
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: 'white' }}
                >
                    CHANGE
                </Button>
            </Form>
        </div>
    );
};

// --- Main Component ---

const MyAccount = () => {
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('profile');
    const [profileImage, setProfileImage] = useState(null); 
    const fileInputRef = useRef(null); 

    const [profileData, setProfileData] = useState({
        username: 'DIGITIT', email: 'test@digitit.com', firstName: 'DIGIT',
        lastName: 'IT', country: 'Telangana', state: 'Hyderabad',
    });
    
    const [passwordData, setPasswordData] = useState({
        oldPassword: '', newPassword: '', confirmNewPassword: '',
    });

    // Opens the hidden file input dialog
    const handleChangeAvatar = () => {
        fileInputRef.current.click();
    };

    // Handles file selection and updates the profile image preview state
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (profileImage) URL.revokeObjectURL(profileImage); 
            
            const fileURL = URL.createObjectURL(file);
            setProfileImage(fileURL);
            console.log('File selected:', file.name);
            alert(`Avatar updated locally with: ${file.name}.`);
            e.target.value = null; 
        }
    };
    
    const handleProfileSave = (e) => {
        e.preventDefault();
        console.log('Saving Profile Details:', profileData);
        alert('Profile saved! Check the console for data.');
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert('New passwords do not match!');
            return;
        }
        console.log('Changing Password attempt.');
        alert('Password change simulated! Check the console.');
        setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    };

    // Logs out the user and navigates to the home route
    const handleLogout = () => {
        console.log('Logging out user and navigating to home (/)');
        alert('Logout simulated!');
        // Clear authentication tokens/session here
        navigate("/"); 
    };

    const TitleArea = () => (
        <Container className="text-center py-5" style={{ paddingTop: '50px', paddingBottom: '30px', color: 'white' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>MY ACCOUNT</h1>
            <p style={{ fontSize: '0.8rem' }}>HOME &gt; PROFILE</p>
        </Container>
    );

    return (
        <div>
            {/* Hidden File Input for Avatar upload */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
            />

            {/* Header/Banner Area */}
            <div className="hero"> 
                <div className="hero-content">
                    <Navigationbar />
                    <div className="pt-104 d-flex justify-content-center text-center">
                        {/* Search component would go here */}
                    </div> 
                    <TitleArea />
                </div>
            </div>

            {/* Main Content Area: Sidebar and Forms */}
            <div className="bg-lightblack w-100" style={{ minHeight: '80vh', padding: '50px 0' }}>
                <Container>
                    <Row>
                        {/* Sidebar */}
                        <Col md={3}>
                            <ProfileSidebar 
                                activeSection={activeSection} 
                                setActiveSection={setActiveSection} 
                                handleChangeAvatar={handleChangeAvatar}
                                handleLogout={handleLogout}
                                profileImage={profileImage}
                            />
                        </Col>

                        {/* Content Area - Conditional rendering based on activeSection */}
                        <Col md={9}>
                            <Card style={{ backgroundColor: '#0a1a2a', border: '2px solid #122131', padding: '30px' }}>
                                
                                {activeSection === 'profile' && (
                                    <ProfileDetailsForm 
                                        profileData={profileData} 
                                        setProfileData={setProfileData} 
                                        handleProfileSave={handleProfileSave} 
                                    />
                                )}
                                
                                {activeSection === 'password' && (
                                    <ChangePasswordForm 
                                        passwordData={passwordData} 
                                        setPasswordData={setPasswordData} 
                                        handleChangePassword={handleChangePassword} 
                                    />
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
};

export default MyAccount;