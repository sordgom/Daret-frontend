import {Nav} from "react-bootstrap";
import React, {useState} from "react";

export const Sidebar = props => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleMouseEnter = () => {
        setShowSidebar(true);
    };

    const handleMouseLeave = () => {
        setShowSidebar(false);
    };
    return (
        <>
            <Nav    
                className="d-none d-md-block sidebar"
                style={{ left: showSidebar ? '0' : '-200px' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                activeKey="/home"
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link href="/create-daret">Create a daret</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/create-campaign">Create a campaign</Nav.Link>
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
