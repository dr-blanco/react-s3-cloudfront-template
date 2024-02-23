import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import these from react-bootstrap

function TeaProductsContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {React.Children.map(children, child => (
          <Col xs={12} sm={6} md={4} lg={3}>
            {child}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TeaProductsContainer;
