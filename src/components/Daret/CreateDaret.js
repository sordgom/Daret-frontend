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
import {toast} from 'react-toastify';

export const CreateDaret = () => {
    let navigate = useNavigate();
    const web3 = new Web3(magic.rpcProvider);

    const [user, setUser] = useContext(UserContext);
    const [maxMembers, setMaxMembers] = useState(10);
    const [cycle, setCycle] = useState(1);
    const [feePercentage, setFeePercentage] = useState(1);
    const [admin, setAdmin] = useState('0xa485A768CB6DE1DE1e0Fc5AB2b93703a11615c1A');
    const [contribution, setContribution] = useState(10);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [invitees, setInvitees] = useState('');

    // Contract
    const contract = new web3.eth.Contract(  DARET_CONTRACT_ABI, { from: user });

    // Deploy the contract to the Ethereum network
    async function deploy() {
        try {
            //Add edit and checks to prevent the deployment from failing
            // members between 1-1000
            // cycle between 1/members and 10000/members
            // contribution between 1 and 1000000000000000000

            if (maxMembers < 2 || maxMembers > 1000) {
                toast.error("Members must be between 1 and 1000.", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
              }
          
              if (cycle < 1 / maxMembers || cycle > 10000 / maxMembers) {
                toast.error(`Cycle must be between ${1 / maxMembers} and ${10000 / maxMembers}.`, {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
              }
              
              let cont  = await usdToWei(contribution);
              if (cont < 1 || cont > 1000000000000000000) {
                toast.error("Contribution must be between 1wei and 1ether.", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
              }
             
          const newContractInstance = await contract
            .deploy({
              data: DARET_CONTRACT_BYTECODE,
              arguments: [cycle * maxMembers, maxMembers, feePercentage, admin, cont],
            })
            .send({
              from: user,
              value: cont,
            });
      
          console.log(newContractInstance.options.address); // instance with the new contract address
      
          const response = await postData(process.env.REACT_APP_SERVER_URL+"daret", {
            title: title,
            description: description,
            creator: user,
            completed: 0,
            address: newContractInstance.options.address,
            invitation_required: isPrivate ? 0 : 1,
          });
      
          console.log(response); // JSON data parsed by `data.json()` call
          navigate("/daret");
      
          return response;
        } catch (err) {
          console.log(err);
        }
      }
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

    async function usdToWei(usdAmount) {
        try {
            // Fetch the Ether (ETH) to USD exchange rate
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            const ethToUsdRate = data.ethereum.usd;

            // Convert USD to Ether
            const etherAmount = usdAmount / ethToUsdRate;

            // Calculate the Wei equivalent of the USD amount
            const weiAmount = Web3.utils.toWei(etherAmount.toFixed(18), 'ether');
            return weiAmount;
        } catch (error) {
          console.error('Error fetching ETH to USD rate:', error);
          return null;
        }
      }
      

    // New function to handle invite creation
    async function createInvite(daretId) {
        console.log(daretId,invitees)
        await fetch(process.env.REACT_APP_SERVER_URL+'daret/invite', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            daret_id: daretId,
            invitees: invitees.split(',').map((address) => address.trim()),
        }),
        });
    }

     async function handleSubmit(e) {
        e.preventDefault();
        const daretData = await deploy();
        if (isPrivate) {
            await createInvite(daretData.id);
        }
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
                                    How many times would you like the system to run? 
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Label>Contribution amount in USD</Form.Label>
                                <Form.  Control 
                                    type="feePercentage"
                                    id="feePercentage"
                                    name="feePercentage"
                                    value={contribution}    
                                    onChange={(e) => setContribution(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    Please enter the contribution amount in USD.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="form-group">
                                <Form.Check
                                    type="checkbox"
                                    label="Private Daret"
                                    checked={isPrivate}
                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                />
                                {isPrivate && (
                                    <div>
                                    <Form.Label>Invitee Addresses (separated by comma)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="invitees"
                                        name="invitees"
                                        value={invitees}
                                        onChange={(e) => setInvitees(e.target.value)}
                                    />
                                    <Form.Text className="text-muted">
                                        Enter the Ethereum addresses of the invitees, separated by commas.
                                    </Form.Text>
                                    </div>
                                )}
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
