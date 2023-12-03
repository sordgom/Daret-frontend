import { Card, Col, Nav } from 'react-bootstrap';

<<<<<<< Updated upstream

export const DaretCard = ({ address, title, imgUrl, invitation_required }) => {
=======
export function DaretCard({ id, name, imgUrl }) {
>>>>>>> Stashed changes
  return (
    <Col xs={12} sm={6} md={4} className="mb-4">
      <Nav.Link href={`/daretpage/${id}`} className="text-white">
        <Card className="h-100 shadow-sm d-flex flex-column">
          <Card.Img variant="top" src={imgUrl} alt={`${name} image`} />
          <Card.Body className="flex-grow-1">
<<<<<<< Updated upstream
            <Card.Title>{invitation_required ? `${title} 🔒` : `${title}` }</Card.Title>
=======
            <Card.Title>{name}</Card.Title>
>>>>>>> Stashed changes
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
