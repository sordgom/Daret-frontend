import React from 'react';
import {useState, useEffect} from "react";
import {Container, Row, Col, Nav} from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import {ArrowRightCircle, Quote} from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

import {NavBar} from "./NavBar";
import { Banner } from "./Banner";
import { Testnet } from "./Testnet";
import { Profile } from "./Profile";
import { Team } from "./Team";
import { Footer } from "./Footer";
import { Projects } from "./Projects";
import { Work } from "./Login";
import Sidebar from "./SideBar";

export const Home = () => {
    return(
        <div className="main">
            <NavBar/>
            <Sidebar />
            <Banner/>
            <Footer/>
        </div>
    )
}
