import React, {useState, useEffect, useContext} from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { CampaignCard } from "./CampaignCard";
import projImg1 from "../../assets/img/nodex.png";
import projImg2 from "../../assets/img/faz.png";
import projImg3 from "../../assets/img/team9.png";
import projImg4 from "../../assets/img/team7.png";
import projImg5 from "../../assets/img/team6.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

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
  {
    title: "FazNode",
    description: "Core Team",
    imgUrl: projImg3,
  },
  {
    title: "Travis",
    description: "Core Team",
    imgUrl: projImg5
  },  
];

export const CompletedCampaign = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(process.env.REACT_APP_SERVER_URL+'campaign');
      const data = await response.json();
      setData(data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="main--campaign">
        <section className="campaign" id="campaign">
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
                            data.map((val, key) => {
                                return val?.completed === 1 ? (
                                  <CampaignCard 
                                    key={key}
                                    {...val}
                                    imgUrl = {team[key%5].imgUrl}
                                  />
                                ) : null;
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
        </section>
    </div>
    )
}
