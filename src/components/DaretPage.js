import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "./constants";
import Web3 from "web3";
import {magic} from '../lib/magicConnect';
import { UserContext } from '../lib/UserContext';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import 'animate.css';

export const DaretPage = () => {
  let { address } = useParams();
  let navigate = useNavigate();

  const web3 = new Web3(magic.rpcProvider);
  const [user, setUser] = useContext(UserContext);
  // Round list variable
  const [round, setRound] = useState(null);
  const [owner, setOwner] = useState(null);
  // Contract
  const contract = new web3.eth.Contract(  DARET_CONTRACT_ABI, address, { from: user });

  useEffect(() => {
        getProperties();    
        getOwner();   
        removeFromDb(); 
    }, [user]); 

    const getProperties = async () => {
        try {
            let a = await contract.methods.rounds(1).call();
            setRound(a);
        } catch (error) {
            console.error(error);
        }
    };

    const getOwner = async () => {
      try {
          let a = await contract.methods.owner().call();
          setOwner(a);
      } catch (error) {
          console.error(error);
      }
    };

    const removeFromDb = async () => {
      try {
          let a = await contract.methods.state().call();
          if(a==3)
          {
            fetch('http://localhost:8080/daret/'+address, {
              method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              navigate('/daret');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          }
        } catch (error) {
          console.error(error);
      }
    };

    const start = async () => {
      try {
        await contract.methods.startRound()
        .send({
          from: user
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch (error) {
        console.log(error);
      }
    };

    //Must meet the min contribution of 1000000 wei
    const join  = async () => {
      try {
        await contract.methods.joinRound()
        .send({
          from: user,
          value: 1000000
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    //Must meet the min contribution of 1000000 wei && already joined
    const contribute  = async () => {
      try {
        await contract.methods.addContribution()
        .send({
          from: user,
          value: 1000000
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch (error) {
        console.log(error);
      }
    };

    //Check requirements:
    //1. Round must be closed
    //2. total contributions must be greater than payout...
    
    const complete  = async () => {
      try {
        await contract.methods.completeRound(user)
        .send({
          from: user
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch (error) {
        console.log(error);
      }
    };

    const close  = async () => {
      try {
        await contract.methods.closeContract()
        .send({
          from: user
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="main--campaign">
      <section className="campaign" id="campaign">
        <Container>
        <Row>
            <Col size={12}>
                <div className="">
                    <h3>Daret</h3>
                      {owner == user && 
                      <Row>
                        <Button onClick={start}>
                            Start Round
                        </Button>
                        <Button onClick={complete}>
                            Complete Round
                        </Button>
                        <Button onClick={close}>
                            Close Round
                        </Button>
                      </Row>
                        }
                    <Row>
                      <Button onClick={join}>
                          Join Round
                      </Button>
                      <Button onClick={contribute}>
                          Contribute
                      </Button>
                    </Row>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
