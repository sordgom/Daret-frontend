import React from 'react';
import {useState, useEffect, useContext} from "react";
import {Container, Row, Col} from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";
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
                                Welcome to Daret, a platform that combines the power of blockchain technology with traditional ROSCAs (Rotating Savings and Credit Associations) to create a secure, transparent, and efficient way to save and invest money with a group of trusted participants.
                            </p>
                            <p>
                                In this tutorial, we'll walk you through the process of joining or creating a Daret, contributing, claiming rewards, and more!
                            </p>
                        </Col>
                    </Row>

                    {/* Creating an Account */}
                    <Row>
                        <Col>
                            <h3>Creating an Account</h3>
                            <ol>
                                <li>Visit our platform and sign up for an account.</li>
                                <li>Log in using the Magic Link sent to your email.</li>
                                <li>Ensure your Magic Link wallet has sufficient funds or purchase coins to participate in Darets.</li>
                            </ol>
                        </Col>
                    </Row>

                    {/* Joining or Creating a Daret */}
                    <Row>
                        <Col>
                            <h3>Joining or Creating a Daret</h3>
                            <ol>
                                <li>After logging in, choose the Daret option from the main menu.</li>
                                <li>To join an existing Daret, browse the available Darets and select the one you'd like to join.</li>
                                <li>To create a new Daret, click on the "Create a Daret" button and fill out the required details, such as the Daret name, total rounds, contribution amount, and start date.</li>
                            </ol>
                        </Col>
                    </Row>

                    {/* Contributing to a Daret */}
                    <Row>
                        <Col>
                            <h3>Contributing to a Daret</h3>
                            <ol>
                                <li>Once you've joined or created a Daret, contribute to the Daret by following the on-screen prompts.</li>
                                <li>The platform will securely and transparently handle all transactions using blockchain technology.</li>
                            </ol>
                        </Col>
                    </Row>

                    {/* Daret Rounds and Rewards */}
                    <Row>
                        <Col>
                            <h3>Daret Rounds and Rewards</h3>
                            <ol>
                                <li>After the contribution deadline for each round, the platform will determine the winner based on the Daret rules.</li>
                                <li>If you are the winner, you can claim the reward by following the on-screen prompts.</li>
                                <li>The next round will begin automatically, and you can continue contributing until all rounds are complete.</li>
                            </ol>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
