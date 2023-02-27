import React from 'react';
import { Col, Nav } from "react-bootstrap";

export const CampaignCard = ({ id, campaignId,  imgUrl }) => {
  console.log(id, campaignId)
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} />
        <div className="proj-txtx">
          <Nav.Link href={`/campaignpage/${campaignId}`}>{campaignId}</Nav.Link>
        </div>
      </div>
     
    </Col>
  )
}
