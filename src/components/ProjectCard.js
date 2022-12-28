import React from 'react';
import { Col, Nav } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <Nav.Link href={link} target="_blank"  >{description}</Nav.Link>
        </div>
      </div>
      <div className="proj-imgbx-desc">
        <p>{description} </p>
      </div>
    </Col>
  )
}
