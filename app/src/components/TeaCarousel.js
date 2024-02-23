import React from 'react';
import { Carousel } from 'react-bootstrap';
import leaf from '../leaf-background.png'
import tea from '../ChocolateBlacktea.png'

const teas = [
  {
    name: "Energy Booster Tea",
    description: "Enjoy a natural boost of energy to get through the day!",
    image: leaf
  },
  {
    name: "Romantic Teas",
    description: "Our Chocolate and Mens Health tea are great for intimate nights.",
    image: tea
  },
  // Add more tea objects here
];

function TeaCarousel() {
  return (
    <Carousel>
      {teas.map((tea, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={tea.image}
            alt={tea.name}
          />
          <Carousel.Caption>
            <h3 style={{ color: 'black', opacity: 1 }} >{tea.name}</h3>
            <p style={{ color: 'black', opacity: 1 }} >{tea.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TeaCarousel;
