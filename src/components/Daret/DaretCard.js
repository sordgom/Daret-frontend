import React from 'react';
import { Col, Card, Nav } from "react-bootstrap";

export const DaretCard = ({  address, title, imgUrl }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={imgUrl} alt={`${title} image`} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Nav.Link href={`/daretpage/${address}`} className="text-white ">
            View Details
          </Nav.Link>
        </Card.Footer>
      </Card>
    </Col>
  )
}



