import React from "react";
import {Nav} from "react-bootstrap";
import loginIcon from '../assets/img/login.svg';

export const Sidebar = props => {
    return (
        <>
            <Nav className="d-none d-md-block sidebar" activeKey="/home"
            //     onSelect={
            //         selectedKey => alert(`selected ${selectedKey}`)
            // }
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/create-daret">Create a daret</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/create-campaign">Create a campaign</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="logout" target="_blank"><img src={loginIcon} alt="Logout" /></a>
                        </div>
                        
                    </span>
                </Nav.Item>

                {/* <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item> */}
            </Nav>
        </>
    );
};
