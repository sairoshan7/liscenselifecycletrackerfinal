


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Home.css"; // Import custom CSS for additional styling
 

import lifecycleImage from '../images/lifecycle.jpg';
import complianceImage from '../images/compliance.jpg';
import userInterfaceImage from '../images/user-interface.jpg';

import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const [expandedFeatures, setExpandedFeatures] = useState({
    'Lifecycle Management': false,
    'Compliance and Reporting': false,
    'User-Friendly Interface': false
  });

  const toggleFeature = (feature) => {
    setExpandedFeatures(prevState => ({
      ...prevState,
      [feature]: !prevState[feature]
    }));
  };

  const features = [
    {
      title: "Lifecycle Management",
      image: lifecycleImage,
      description: "Track devices and software throughout their lifecycle."
    },
    {
      title: "Compliance and Reporting",
      image: complianceImage,
      description: "Ensure compliance and generate reports."
    },
    {
      title: "User-Friendly Interface",
      image: userInterfaceImage,
      description: "Intuitive user interface for ease of use."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to License Lifecycle Tracker</h1>
          <p>Efficiently manage and monitor the lifecycle of licenses for network devices and software.</p>
          <button className="btn" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <div className="features-section">
          {/* Feature 1: Lifecycle Management */}
          <div className={`feature ${expandedFeatures['Lifecycle Management'] ? 'expanded' : ''}`} onClick={() => toggleFeature('Lifecycle Management')}>
            <img src={features[0].image} alt={features[0].title} className="feature-image" />
            <div className="feature-text">
              <h2 className="feature-title">Lifecycle Management</h2>
              <p className="feature-description">{features[0].description}</p>
            </div>
            {expandedFeatures['Lifecycle Management'] && (
              <div className="expanded-description">
                <p>Implement full lifecycle management for both hardware devices and software licenses.</p>
              </div>
            )}
          </div>

          {/* Feature 2: Compliance and Reporting */}
          <div className={`feature ${expandedFeatures['Compliance and Reporting'] ? 'expanded' : ''}`} onClick={() => toggleFeature('Compliance and Reporting')}>
            <img src={features[1].image} alt={features[1].title} className="feature-image" />
            <div className="feature-text">
              <h2 className="feature-title">Compliance and Reporting</h2>
              <p className="feature-description">{features[1].description}</p>
            </div>
            {expandedFeatures['Compliance and Reporting'] && (
              <div className="expanded-description">
                <p>Ensure compliance with licensing terms and provide detailed reporting features.</p>
              </div>
            )}
          </div>

          {/* Feature 3: User-Friendly Interface */}
          <div className={`feature ${expandedFeatures['User-Friendly Interface'] ? 'expanded' : ''}`} onClick={() => toggleFeature('User-Friendly Interface')}>
            <img src={features[2].image} alt={features[2].title} className="feature-image" />
            <div className="feature-text">
              <h2 className="feature-title">User-Friendly Interface</h2>
              <p className="feature-description">{features[2].description}</p>
            </div>
            {expandedFeatures['User-Friendly Interface'] && (
              <div className="expanded-description">
                <p>Admin and user level access controls to ensure secure and efficient management.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today to start managing your licenses with ease.</p>
        <button className="btn" onClick={() => navigate('/register')}>Sign Up Now</button>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 License Lifecycle Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;