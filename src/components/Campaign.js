import React from 'react';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { TeamCard } from "./TeamCard";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";

export const Campaign = () => {

  const team = [
    {
      title: "NodeX",
      description: "Founder",
      imgUrl: projImg1,

    },
    {
      title: "FazNode",
      description: "Core Team",
      imgUrl: projImg2,
    },
    {
      title: "Travis",
      description: "Core Team",
      imgUrl: projImg4,
    },   
    
    
  ];

  return (
    <div className="main--daret">
        <NavBar/>
        <section className="daret" id="daret">
        <Container>
            <Row>
            <Col size={12}>
                <TrackVisibility>
                {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                                 
                    <center><h2>Campaigns</h2>
                    <p>Welcome to the Campaign gallery!</p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    </Nav>
                    <Tab.Content id="slideInUp" 
                    className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first">
                        <Row>
                            {
                            team.map((team, index) => {
                                return (
                                <TeamCard
                                    key={index}
                                    {...team}
                                    />
                                )
                            })
                            }
                        </Row>
                        </Tab.Pane>
                    </Tab.Content>
                    </Tab.Container></center>
                </div>}
                </TrackVisibility>
            </Col>
            </Row>
        </Container>
        <img className="background-image-right" src={colorSharp2}></img>
        </section>
        <Footer/>
    </div>
    )
}
