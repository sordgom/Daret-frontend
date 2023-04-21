import React, {useState, useEffect, useContext} from "react";
import {CAMPAIGN_CONTRACT_ABI, CAMPAIGN_CONTRACT_ADDRESS, CAMPAIGN_CONTRACT_BYTECODE} from "../constants";
import Web3 from "web3";
import {UserContext} from '../../lib/UserContext';
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {magic} from '../../lib/magicConnect';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

export const CreateCampaign = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();
    const web3 = new Web3(magic.rpcProvider);
    const [user, setUser] = useContext(UserContext);
    const [goal, setGoal] = useState(1000);
    const [duration, setDuration] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [admin, setAdmin] = useState('0xa485A768CB6DE1DE1e0Fc5AB2b93703a11615c1A');

    //contract
    const contract = new web3.eth.Contract(  CAMPAIGN_CONTRACT_ABI,  CAMPAIGN_CONTRACT_ADDRESS, { from: user });

     // Deploy the contract to the Ethereum network
    async function deploy() {
        try {  
            await contract.deploy({
                data: CAMPAIGN_CONTRACT_BYTECODE,
                arguments: [goal, duration, admin]
            })  
            .send({
                from: user,
            })
            .then(function(newContractInstance){
                console.log(newContractInstance.options.address) // instance with the new contract address
                postData(process.env.REACT_APP_SERVER_URL+'campaign', 
                {
                    title: title,
                    description:description,
                    creator: user,
                    completed: 0,
                    address: newContractInstance.options.address                   
                })
                .then((data) => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    navigate('/campaign');
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
                        <h2>{t('Create Campaign')}</h2>

                        <Form.Group className="form-group" >
                        <Form.Label>{t('Title')}</Form.Label>
                        <Form.Control 
                            type="title"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            {t('Please enter the title  of the crowdfund.')}
                        </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group" >
                        <Form.Label>{t('Description')}</Form.Label>
                        <Form.Control 
                            type="description"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            {t('Enter a description of the crowdfund.')}
                        </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="form-group" >
                        <Form.Label>{t('Goal')}</Form.Label>
                        <Form.Control 
                            type="goal"
                            id="goal"
                            name="goal"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            {t('Please enter the goal of the crowdfund.')}
                        </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group" >
                        <Form.Label>{t('Duration')}</Form.Label>
                        <Form.Control 
                            type="duration"
                            id="duration"
                            name="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            {t('Please enter the duration of the crowdfund in days.')}
                        </Form.Text>
                        </Form.Group>

                        <button variant="light" type="submit">
                        {t('Submit')}
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
