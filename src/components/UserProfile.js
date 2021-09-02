import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuth0 } from "@auth0/auth0-react";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <FontAwesomeIcon style={{ color: '#f87825', height: '30', width: '30' }} onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }} icon={faUserCircle} />
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it



const UserProfile = () => {
    const openGestioneOre = () => {
        window.location.href = '/gestione-ore'
    }
    const { logout } = useAuth0();
    const { NODE_ENV } = process.env
    const redirectLocation = NODE_ENV === 'development' ? '/holidays' : '/bridges/holidays'
    return <Dropdown drop="start" className="auth-button" >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Custom toggle
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item eventKey="1" onClick={openGestioneOre}>Gestione Ore</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => logout({ returnTo: `${window.location.origin}${redirectLocation}` })}>
                Logout
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
};

export default UserProfile;