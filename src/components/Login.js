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

  const [user, setUser] = useContext(UserContext);

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
    let user;
      web3.eth.getAccounts().then((accounts) => {
        user= accounts ?. [0];
        setUser(user);
      }).then(() => {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
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
      setUser(null);
  };

  // Redirect to / if the user is logged in
  useEffect(() => {
    console.log(user)
  }, [user]);


  return (
    <div className='main--login'>
      <NavBar/>
      <section className="login" id="login">
        <div>
          <h2 className="h2">Magic Connect</h2>
          {!user && (
          <button onClick={login}>
                Sign In
            </button>
          )}
          {user && (
          <>
           
            <button onClick={sendTransaction}>
                Send Transaction
            </button>
            <button onClick={signMessage}>
                Sign Message
            </button>
            <button onClick={showWallet}>
                Show Wallet
            </button>
            <button onClick={disconnect}>
                Sign Out
            </button>
            </>
          )}
        </div>
      </section>
      <Footer/>
    </div>
  )
}
