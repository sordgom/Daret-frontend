import React, {useState, useEffect, useContext} from "react";
import {Container, Row, Col} from "react-bootstrap";
import {ethers} from "ethers";
import {useTranslation} from 'react-i18next';
import {toast} from 'react-toastify';
import {UserContext} from '../lib/UserContext';

export const Faucet = () => {
    const {t} = useTranslation();
    const [user, setUser] = useContext(UserContext);

    const requestTokens = async () => {
        toast.info("Processing...", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

        try { 
            // Make a request to the backend to send the tokens
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "faucet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': '*'
                },
                body: JSON.stringify({
                    address: user
                })
            });

            const data = await response.json();
            console.log(data)
            toast.info(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } catch (error) {
            console.log(error)
            toast.error("Invalid Address.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    };

    return (
        <div className="main--banner">
            <section className="banner" id="banner">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12}
                            md={8}
                            lg={6}>
                            <h1 className="text-center">Optimism Goerli Faucet</h1>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block"
                                    onClick={requestTokens}>
                                    {
                                    t('Request tokens')
                                } </button>
                                <br/>
                                <p className="text-center">{t("0.005 ETH or ~10USD will be sent to your wallet")}</p>
                                <p className="text-center">{t("Please wait around 3 mins for the process to be completed")}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
