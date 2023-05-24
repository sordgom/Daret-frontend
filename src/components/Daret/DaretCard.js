import React from 'react';
import { Col, Card, Nav } from "react-bootstrap";


export const DaretCard = ({ address, title, imgUrl, invitation_required }) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Nav.Link href={`/daretpage/${address}`} className="text-white">
        <Card className="h-100 shadow-sm d-flex flex-column">
          <Card.Img variant="top" src={imgUrl} alt={`${title} image`} />
          <Card.Body className="flex-grow-1">
            <Card.Title>{invitation_required ? `${title} 🔒` : `${title}` }</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Nav.Link href={`/daretpage/${address}`} className="text-white mx-auto">
              View Details
            </Nav.Link>
          </Card.Footer>
        </Card>
      </Nav.Link>
    </Col>
  )
}

