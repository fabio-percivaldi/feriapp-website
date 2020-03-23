import React from "react";
import { Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
function Footer() {
    return <Row style={{ height: '10vh', background: 'rgba(252, 58, 50, 1)', justifyContent: 'center' }}>
        <a style={{ marginRight: '1%', height: '50%', marginTop: 'auto', marginBottom: 'auto' }} href="https://www.instagram.com/feriappofficial/?hl=it" rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon style={{ height: '35px', width: '35px' }} color="#ababab" icon={faInstagram}></FontAwesomeIcon>
        </a>
        <a style={{ marginLeft: '1%',height: '50%', marginTop: 'auto', marginBottom: 'auto' }} href="https://www.facebook.com/feriappofficial/" rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon style={{ height: '35px', width: '35px' }} color="#ababab" icon={faFacebook}></FontAwesomeIcon>
        </a>
    </Row>
}


export default Footer