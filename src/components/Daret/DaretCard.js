import { Card, Col, Nav } from 'react-bootstrap';

export function DaretCard({ id, name, imgUrl }) {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Nav.Link href={`/daretpage/${id}`} className="text-white">
        <Card className="h-100 shadow-sm d-flex flex-column">
          <Card.Img variant="top" src={imgUrl} alt={`${name} image`} />
          <Card.Body className="flex-grow-1">
            <Card.Title>{name}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <Nav.Link href={`/daretpage/${id}`} className="text-white mx-auto">
              View Details
            </Nav.Link>
          </Card.Footer>
        </Card>
      </Nav.Link>
    </Col>
  );
}
