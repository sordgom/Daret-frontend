import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import navIcon1 from '../assets/img/discord.svg';
import navIcon2 from '../assets/img/github.svg';
import navIcon3 from '../assets/img/twitter.svg';
import 'animate.css';

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6} />
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://discord.com/users/400084054852239361" target="_blank" rel="noreferrer"><img src={navIcon1} alt="Discord" /></a>
              <a href="https://github.com/sordgom" target="_blank" rel="noreferrer"><img src={navIcon2} alt="Github" /></a>
              <a href="https://twitter.com/sordgom" target="_blank" rel="noreferrer"><img src={navIcon3} alt="Twitter" /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
