import React from 'react';
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/2.png";
import { ArrowRightCircle, Quote } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";

export const Profile = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Node Runner", "Crypto Enthusiast" ];
  const period = 2000;
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  
  return (
    <div className="main--portfolio">
      <section className="portfolio" id="portfolio">
        <Container>
        <Row>
            <Col size={12}>
              <TrackVisibility>
                <div className="">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Wallet Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sord</td>
                        <td>0xC6A3dd9e9D73Eb3e66669534Ed21ee169aEd7f14</td>
                      </tr>
                    </tbody>
                  </table>
                
                  
                </div>
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className="">
                    <img src={projImg2} alt="Header Img"/>
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
