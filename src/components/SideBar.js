import React from "react";
import {Nav} from "react-bootstrap";

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
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
};
