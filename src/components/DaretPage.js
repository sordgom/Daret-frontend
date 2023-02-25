import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "./constants";
import Web3 from "web3";
import {magic} from '../lib/magicConnect';
import { UserContext } from '../lib/UserContext';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import 'animate.css';

export const DaretPage = () => {
  let { address } = useParams();
  const web3 = new Web3(magic.rpcProvider);
  const [user, setUser] = useContext(UserContext);
  // Round list variable
  const [round, setRound] = useState(null);
  // Contract
  const contract = new web3.eth.Contract(  DARET_CONTRACT_ABI, address, { from: user });

  useEffect(() => {
        getProperties();        
        console.log(round)
    }, [user]); 

    const getProperties = async () => {
        try {
            let a = await contract.methods.rounds(1).call()
            setRound(a);
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

    const join  = async () => {
      try {
        await contract.methods.joinRound()
        .send({
          from: user
        })
        .on('receipt', function(receipt){
            // receipt example
            console.log(receipt);
        })
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    const contribute  = async () => {
      try {
        await contract.methods.addContribution()
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

    const complete  = async () => {
      try {
        await contract.methods.completeRound()
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
                    <Button onClick={start}>
                        Start Round
                    </Button>
                    <Button onClick={join}>
                        Join Round
                    </Button>
                    <Button onClick={contribute}>
                        Contribute
                    </Button>
                    <Button onClick={close}>
                        Close Round
                    </Button>
                    <Button onClick={complete}>
                        Complete Round
                    </Button>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
