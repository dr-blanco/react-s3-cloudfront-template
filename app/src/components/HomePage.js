import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav} from 'react-bootstrap';
import TeaCarousel from './TeaCarousel';
import teaVideo from '../TeaFinal.mp4'; 
//import tea from '../tea.png'
import words from '../chaichaiword.png'
import logo from '../chaichai.png'
//import productImg from '../tea-package.png'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import chocImg from '../chocolate.jpg'; // Make sure the path is correct
import hibImg from '../hibiscus.jpg'; // Make sure the path is correct
import lemonImg from '../lemon.jpg'; // Make sure the path is correct
import mensImg from '../menshealth.jpg'; // Make sure the path is correct
import TeaProductsContainer from './TeaProductsContainer';
import TeaProduct from './TeaProduct'; // Make sure the path is correct
import React, { useState } from 'react';



//import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import HeaderNav from './HeaderNav'
import Modal from 'react-bootstrap/Modal';





function HomePage() {

    // State to control the visibility of the modal
    const [showModal, setShowModal] = useState(false);

    // Event handler for "Add to Cart" button click
    const handleAddToCartClick = () => {
      setShowModal(true);
    };
  
    // Close modal handler
    const handleCloseModal = () => {
      setShowModal(false);
    };
  


  return (
    <>
    <HeaderNav />
     

      <Card className="video-card" >
            <Card.Body>
            <Alert style={{ marginTop: "0%" }}  key="success" variant="success" >
      100% Natural Tea
      </Alert>

              <Card.Title>Discover Premium Tea from Around the World</Card.Title>
              <Card.Text>
              <img src={logo} alt="Description" />
              <p>Immerse in the serenity of nature with ChaiChai's 100% natural tea selection. Sourced from the finest gardens across the globe, our teas promise an unrivaled, authentic experience in every sip. Embrace the purity and richness of nature with every cup.</p>
              </Card.Text>
              <Button variant="success">Available Soon</Button>
            </Card.Body>
          </Card>


      <header className="App-header">
        <Container>

          <video autoPlay loop muted>
            <source src={teaVideo} type="video/mp4"/>
            Your browser does not support the video tag. 
          </video>
          

          <Card className="video-card" >
<Card.Body>
              <Card.Title>Teas</Card.Title>
              <Card.Text>
              <TeaCarousel />
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </header>

      <div id="products">
      <TeaProductsContainer>
        <TeaProduct image={chocImg} title="Chocolate Tea"description="Black Tea, Ashwagandha, Nutmeg, Tulsi, Red Rose Petals, Ginder, Star Anise" price="10.99" 
           onAddToCart={handleAddToCartClick} />
        <TeaProduct image={hibImg} title="Chocolate Tea" 
           description="Black Tea, Ashwagandha, Nutmeg, Tulsi, Red Rose Petals, Ginder, Star Anise" price="10.99" onAddToCart={handleAddToCartClick} />
        <TeaProduct image={lemonImg} title="Chocolate Tea"description="Black Tea, Ashwagandha, Nutmeg, Tulsi, Red Rose Petals, Ginder, Star Anise" price="10.99" 
           onAddToCart={handleAddToCartClick} />
        <TeaProduct image={mensImg} title="Chocolate Tea"description="Black Tea, Ashwagandha, Nutmeg, Tulsi, Red Rose Petals, Ginder, Star Anise" price="10.99" 
           onAddToCart={handleAddToCartClick} />
        {/* Add more TeaProduct components as needed */}
      </TeaProductsContainer>
      </div>

            {/* Modal component */}
            <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>We do not have inventory at the moment. Please try again soon!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <footer id="footer" className="text-center footer">
  <img src={words} alt="ChaiChai logo" style={{ height: '50px' }} />
  <div>
    <p>Contact Us:</p>
    <p>Email: <a href="mailto:contact@chaichaitea.com">contact@chaichaitea.com</a></p>
  </div>
  <Container>
    <p>&copy; {new Date().getFullYear()} ChaiChai Tea</p>
  </Container>
  <Container>
    <p>Items Ship out within 3 days of purchase and arrive within 7 days of purchase.</p>
    <p>We do not share your data with any third party.</p>
    {/* Links for the policies */}
    <Nav className="justify-content-center">
  <Nav.Item>
    <Link to="/privacy-policy" className="nav-link">Privacy Policy</Link>
  </Nav.Item>
  <Nav.Item>
    <Link to="/refund-policy" className="nav-link">Refund Policy</Link>
  </Nav.Item>
</Nav>

  </Container>
</footer>

    </>
  );
}

export default HomePage;
