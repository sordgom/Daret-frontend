import React, {useState, useEffect, useContext} from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import metabuild from "../assets/img/metabuild.png";
import nearImg from "../assets/img/near.jpg";
import hmcImg from "../assets/img/homecrowd.png"
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import {UserContext} from '../lib/UserContext';
import {useNavigate} from "react-router-dom";
import Web3 from "web3";
import {magic} from "../lib/magicConnect";

const web3 = new Web3(magic.rpcProvider);

export const Login = () => {

  const [account, setAccount] = useContext(UserContext);

  let navigate = useNavigate();

  const sendTransaction = async () => {
      const publicAddress = (await web3.eth.getAccounts())[0];
      const txnParams = {
          from: publicAddress,
          to: publicAddress,
          value: web3.utils.toWei("0.01", "ether"),
          gasPrice: web3.utils.toWei("30", "gwei")
      };
      web3.eth.sendTransaction(txnParams).on("transactionHash", (hash) => {
          console.log("the txn hash that was returned to the sdk:", hash);
      }).then((receipt) => {
          console.log("the txn receipt that was returned to the sdk:", receipt);
      }).catch((error) => {
          console.log(error);
      });
  };

  const login = async () => {
      web3.eth.getAccounts().then((accounts) => {
          setAccount(accounts ?. [0]);
      }).catch((error) => {
          console.log(error);
      });
  };

  const signMessage = async () => {
      const publicAddress = (await web3.eth.getAccounts())[0];
      const signedMessage = await web3.eth.personal.sign("My Message", publicAddress, "").catch((e) => console.log(e));
      console.log(signedMessage);
  };

  const showWallet = () => {
      magic.connect.showWallet().catch((e) => {
          console.log(e);
      });
  };

  const disconnect = async () => {
      await magic.connect.disconnect().catch((e) => {
          console.log(e);
      });
      setAccount(null);
  };

  // Redirect to / if the user is logged in
  useEffect(() => {
    console.log(account)
  }, [account]);


  return (
    <div className='main--daret'>
      <NavBar/>
      <section className="daret" id="daret">
        <div>
          <h2 className="h2">Magic Connect</h2>
              {
                //figure out account.loading
              (!account || account?.loading) && (
                  <button onClick={login}
                      className="button-row">
                      Sign In
                  </button>
              )
          }
              {
              (account && !account?.loading) && (
                  <>
                      <button onClick={showWallet}>
                          Show Wallet
                      </button>
                      <button onClick={sendTransaction}>
                          Send Transaction
                      </button>
                      <button onClick={signMessage}>
                          Sign Message
                      </button>
                      <button onClick={disconnect}>
                          Disconnect
                      </button>
                  </>
              )
          } </div>
        <img className="background-image-right" src={colorSharp2}></img>
      </section>
      <Footer/>
    </div>
  )
}
