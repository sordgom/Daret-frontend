import React from 'react';
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/2.png";
import { ArrowRightCircle, Quote } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";

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
    <div className="main--campaign">
      <section className="campaign" id="campaign">
        <Container>
        <Row>
            <Col size={12}>
              <TrackVisibility>
                <div className="">
                  <h2>Who am I?</h2>
                  <p>
                  My name is Aymane Igmiden. I am a Moroccan student studying computer systems in my third year.
I first became interested in blockchain and was able to learn certain essential skills, like Solidity, Javascript, Blockchain technology, React JS, and RESTful APIs.
In addition to this arsenal, my university courses covered the majority of the fundamental competencies, including object oriented programming, data structures, system architecture, data science and web programming.
The prospect of expanding my work experience and taking on new challenges excites me. I forward hearing from you.
                  </p>
                </div>
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className="">
                    <img src={headerImg} alt="Header Img"/>
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
