import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "../constants";
import Web3 from "web3";
import {UserContext} from '../../lib/UserContext';
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {magic} from '../../lib/magicConnect';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const CreateDaret = () => {
    let navigate = useNavigate();
    const web3 = new Web3(magic.rpcProvider);

    const [user, setUser] = useContext(UserContext);
    const [maxMembers, setMaxMembers] = useState(10);
    const [cycle, setCycle] = useState(1);
    const [feePercentage, setFeePercentage] = useState(1);
    const [admin, setAdmin] = useState('0xa485A768CB6DE1DE1e0Fc5AB2b93703a11615c1A');
    const [contribution, setContribution] = useState(100);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Contract
    const contract = new web3.eth.Contract(  DARET_CONTRACT_ABI, { from: user });

    // Deploy the contract to the Ethereum network
    async function deploy() {
        try {  
            await contract.deploy({
                data: DARET_CONTRACT_BYTECODE,
                arguments: [cycle * maxMembers, maxMembers, feePercentage,  admin, contribution]
            })  
            .send({
                from: user,
                value: contribution
            })
            .then(function(newContractInstance){
                console.log(newContractInstance.options.address) // instance with the new contract address
                postData('http://localhost:8080/daret', 
                {
                    title: title,
                    description:description,
                    creator: user,
                    completed: 0,
                    address: newContractInstance.options.address                   
                })
                //I can add later owner: walletAddress, amount: amount, maxRounds: maxRounds, list: list
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
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <h2>Create Daret</h2>

                            <Form.Group className="form-group" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="title"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Please enter the title  of the Daret.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="description"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Enter a description of the daret.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group" >
                                <Form.Label>Number of Members</Form.Label>
                                <Form.Control 
                                    type="maxMembers"
                                    id="maxMembers"
                                    name="maxMembers"
                                    value={maxMembers}
                                    onChange={(e) => setMaxMembers(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Please enter the number of members involved in the round.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group" >
                                <Form.Label>Number of cycles</Form.Label>
                                <Form.Control 
                                    type="maxMembers"
                                    id="maxMembers"
                                    name="maxMembers"
                                    value={cycle}
                                    onChange={(e) => setCycle(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    The number of cycles is how many rounds you want the Daret to go
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Contribution amount</Form.Label>
                                <Form.  Control 
                                    type="feePercentage"
                                    id="feePercentage"
                                    name="feePercentage"
                                    value={contribution}    
                                    onChange={(e) => setContribution(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Please enter the contribution amount .
                                </Form.Text>
                            </Form.Group>

                            <button  type="submit">
                                Submit
                            </button>
                        </Form>
                  
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
