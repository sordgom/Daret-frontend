import React from 'react';
import { Col, Nav } from "react-bootstrap";

export const CampaignCard = ({ id, address, title, imgUrl}) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <Nav.Link href={`/campaignpage/${address}`}>{id}</Nav.Link>
        </div>
      </div>
      <h4>{title}</h4>
    </Col>
  )
}
