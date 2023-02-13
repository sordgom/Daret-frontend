import React from 'react';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import elder from "../assets/img/elder.png";
import agora from "../assets/img/agora.png";
import nft from "../assets/img/nft.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
export const Projects = () => {

  //List of projects
  const blockchain_projects = [
    {
      title: "Agora DAO",
      description: "DAO for ideas",
      imgUrl: agora,
      link: "https://dao2-eight.vercel.app/"
    },
    {
      title: "NFT Gallery",
      description: "Create and display your NFTs",
      imgUrl: nft,
      link: "https://nfts-roan.vercel.app/",
    },
    {
      title: "Mental health of Elderly in Malaysia",
      description: "Apply data mining techniques on 'Mental health on Elderly' in Malaysia dataset",
      imgUrl: elder,
      link: "https://shorturl.at/quF56"
    }
  ];

  // const data_science_projects = [
  //   {
  //     title: "Mental health of Elderly in Malaysia",
  //     description: "Apply data mining techniques on 'Mental health on Elderly' in Malaysia dataset",
  //     imgUrl: projImg2,
  //     link: "https://shorturl.at/quF56"
  //   }
  // ]

  return (
    <div className="main--project">
      <NavBar/>
      <section className="project" id="project">
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                <div className= "">
                  <h2>Projects</h2>
                  <p>This is a simple showcase of my projects and achievements</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    {/* <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Blockchain</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Data science</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Variety</Nav.Link>
                      </Nav.Item>
                    </Nav> */}
                    <Tab.Content id="slideInUp" className="">
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            blockchain_projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                  />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      {/* <Tab.Pane eventKey="second">
                      <Row>
                          {
                            data_science_projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                  />
                              )
                            })
                          }
                        </Row>                    
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Coming soon...</p>
                      </Tab.Pane> */}
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  )
}
