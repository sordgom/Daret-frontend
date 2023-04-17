import React from 'react';
import {useState, useEffect, useContext} from "react";
import {Container, Row, Col, Form} from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";
import pic1 from "../assets/howitworks/1.1.png";
import pic2 from "../assets/howitworks/1.2.png";
import pic3 from "../assets/howitworks/1.3.png";
import pic4 from "../assets/howitworks/1.4.png";
import {UserContext} from '../lib/UserContext';
import Web3 from "web3";
import {magic} from "../lib/magicConnect";



export const Help = () => {
    return (
        <div className="main--help">
            <section className="help" id="help">
                <Container>
                    <Row>
                        <Col>
                            <h3>Introduction</h3>
                            <p>
                            Welcome to Daret, a blockchain-based platform for secure, transparent ROSCAs (Rotating Savings and Credit Associations). This tutorial covers joining, contributing, and claiming rewards in a Daret.                            </p>
                           
                        </Col>
                    </Row>

                    {/* Creating an Account */}
                    <Row>
                        <Col>
                            <h3>Creating an Account</h3>
                            <ol>
                                <li>Sign up and log in with the Magic Link emailed to you.</li>
                                {/* <img src={pic1} alt="pic1"/>
                                <img src={pic2} alt="pic2"/> */}
                                <li>Ensure your wallet has enough funds or purchase coins.</li>
                                {/* <img src={pic3} alt="pic3" style={{'width':'25%', 'height':'20%'}}/>
                                <img src={pic4} alt="pic4" style={{'width':'30%', 'height':'20%'}}/> */}
                            </ol>
                        </Col>
                    </Row>

                    {/* Joining or Creating a Daret */}
                    <Row>
                        <Col>
                            <h3>Joining or Creating a Daret</h3>
                            <ol>
                                <li>Select "Daret" in the main menu.</li>
                                <li>Browse and join an existing Daret, or create a new one with required details.</li>
                            </ol>
                        </Col>
                    </Row>

                    {/* Contributing to a Daret */}
                    <Row>
                        <Col>
                            <h3>Contributing to a Daret</h3>
                            <ol>
                                <li>Follow on-screen prompts to contribute.</li>
                                <li>The platform will securely and transparently handle all transactions using blockchain technology.</li>
                            </ol>
                        </Col>
                    </Row>

                    {/* Daret Rounds and Rewards */}
                    <Row>
                        <Col>
                            <h3>Daret Rounds and Rewards</h3>
                            <ol>
                                <li>Winners are determined after each round's deadline.</li>
                                <li>Claim rewards if you win and continue contributing until all rounds end.</li>
                            </ol>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
