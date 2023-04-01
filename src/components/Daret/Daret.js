import React, {useState, useEffect, useContext} from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { DaretCard } from "./DaretCard";
import projImg1 from "../../assets/img/nodex.png";
import projImg2 from "../../assets/img/faz.png";
import projImg3 from "../../assets/img/team9.png";
import projImg4 from "../../assets/img/team7.png";
import projImg5 from "../../assets/img/team6.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {UserContext} from '../../lib/UserContext';

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

export const Daret = () => {

  const [data, setData] = useState([]);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      if(user){
          const response = await fetch(`http://localhost:8080/daret?userAddress=${user}`);
          const data = await response.json();
          setData(data.data);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="main--daret">
        <section className="daret" id="daret">
        <Container>
            <Row>
            <Col size={12}>
                <TrackVisibility>
                {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                                 
                    <center>
                    <h2>Daret</h2>
                    <p>Welcome to the Money Circle fair!</p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    </Nav>
                    <Tab.Content id="slideInUp" 
                    className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first">
                        <Row>
                            {
                               
                                data.map((val, key) => {
                                      
                                      return val?.completed === 0 ? (
                                        <DaretCard 
                                          key={key}
                                          {...val}
                                          imgUrl = {team[key%5].imgUrl}
                                        />
                                      ) : null ;
                                                             
                                })
                              
                            }
                        </Row>
                        </Tab.Pane>
                    </Tab.Content>
                    </Tab.Container>
                    </center>
                </div>}
                </TrackVisibility>
            </Col>
            </Row>
        </Container>
        </section>
    </div>
    )
}
