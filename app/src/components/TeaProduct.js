import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TeaProduct({ image, title, description, price, onAddToCart }) {
  // State for the quantity
  const [quantity, setQuantity] = useState(1);

  // Function to increment quantity
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrement quantity
  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <Card className="tea-product">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Button variant="outline-secondary" onClick={decrementQuantity} className="btn-sm">
            -
          </Button>
          <Form.Control 
            type="text" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
            className="mx-2 text-center" 
            style={{ width: '50px' }}
          />
          <Button variant="outline-secondary" onClick={incrementQuantity} className="btn-sm">
            +
          </Button>
        </div>

        <Button variant="success" onClick={onAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default TeaProduct;
