import React, {useState, useEffect, useContext} from "react";
import {CAMPAIGN_CONTRACT_ABI, CAMPAIGN_CONTRACT_ADDRESS, CAMPAIGN_CONTRACT_BYTECODE} from "./constants";
import Web3 from "web3";
import {ethers} from "ethers";
import {UserContext} from '../lib/UserContext';
import {useNavigate} from "react-router-dom";
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
import {magic} from '../lib/magicConnect';

const initialList = ['0xC6A3dd9e9D73Eb3e66669534Ed21ee169aEd7f14'];
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
export const CreateCampaign = () => {
    let navigate = useNavigate();
    const web3 = new Web3(magic.rpcProvider);
   
    const [user, setUser] = useContext(UserContext);
    const [goal, setGoal] = useState(1000);
    const [duration, setDuration] = useState(1);
    
    //contract
    const contract = new web3.eth.Contract(  CAMPAIGN_CONTRACT_ABI,  CAMPAIGN_CONTRACT_ADDRESS, { from: user });

    useEffect(() => {
    }, []);

     // Deploy the contract to the Ethereum network
     async function deploy() {
        try {
            await contract.methods.launch(goal,  duration)
            .send({
              from: user
            })
            .on('receipt', function(receipt){
                // receipt example
                let id = receipt?.events?.Launch?.returnValues?.id;
                console.log(id);
                postData('http://localhost:8080/campaign', 
                    {campaignId: id})
                    .then((data) => {
                        console.log(data); // JSON data parsed by `data.json()` call
                        navigate('/');
                    });
            });
        } catch (err) {
            console.log(err)
        }
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    function handleSubmit(e) {
        e.preventDefault();
        deploy();
    } 

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
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Create Campaign</h2>
                        <div className="form-group">
                            <label htmlFor="email">Goal</label>
                            <input
                            type="goal"
                            id="goal"
                            name="goal"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Duration</label>
                            <input
                            type="duration"
                            id="duration"
                            name="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                        <button type="submit">Submit
                        </button>
                    </form>
                   
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
