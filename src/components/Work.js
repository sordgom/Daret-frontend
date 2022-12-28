import React from 'react';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import metabuild from "../assets/img/metabuild.png";
import nearImg from "../assets/img/near.jpg";
import hmcImg from "../assets/img/homecrowd.png"
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
export const Work = () => {

  //List of projects
  const work = [
    {
      title: "SeedIn",
      description: "Winner of NEARCON IRL HACKATHON - Future of Work track",
      imgUrl: nearImg,
      link: "https://devpost.com/software/seed-web3-career-hub"
    },
    {
      title: "SeedIn",
      description: "Participated in major hackathon MetaBuildIII",
      imgUrl: metabuild,
      link: "https://devpost.com/software/seed-web3-career-hub-dhrazk"
    },
    {
      title: "HomeCrowd",
      description: "I managed to develop the smart contracts and fully integrate them to the platform.",
      imgUrl: hmcImg,
      link: ""
    }
  ];

  return (
    <div className='main--work'>
      <NavBar/>
      <section className="work" id="work">
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                <div className= "">
                  <h2>Work & achievements</h2>
                  <p>This is a simple showcase of my projects and achievements</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content id="slideInUp" className="">
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            work.map((project, index) => {
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
                    </Tab.Content>
                  </Tab.Container>
                </div>
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
