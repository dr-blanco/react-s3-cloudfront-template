import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Navbar, Nav, Form, Modal, Button } from 'react-bootstrap';
import cartImg from '../cart.png';
import words from '../chaichaiword.png';

function HeaderNav() {
  const [showCartModal, setShowCartModal] = useState(false);
  const location = useLocation();

  const handleShowCartModal = () => setShowCartModal(true);
  const handleCloseCartModal = () => setShowCartModal(false);

  const getHref = (target) => {
    return location.pathname !== '/' ? '/' : target;
  };

  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container fluid className="d-flex justify-content-between">
          {/* Left-aligned links */}
          <Nav className="me-auto">
            <Nav.Link href={getHref("#products")}>Products</Nav.Link>
            <Nav.Link href={getHref("#footer")}>Contact</Nav.Link>
          </Nav>

          {/* Centered logo */}
          <Navbar.Brand href="/" className="mx-auto">
            <img
              alt="CHAICHAI"
              src={words}
              className="d-inline-block align-top"
              style={{ maxHeight: '30px' }}
            />
          </Navbar.Brand>

          {/* Right-aligned cart */}
          <Form className="d-flex">
            <Nav.Link onClick={handleShowCartModal} className="d-flex align-items-center">
              Cart
              <img
                alt="Cart"
                src={cartImg}
                className="d-inline-block align-top"
                style={{ maxHeight: '30px', marginLeft: '5px' }}
              />
            </Nav.Link>
          </Form>
        </Container>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={handleCloseCartModal}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your cart is empty. Start adding some amazing tea to it!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCartModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HeaderNav;
