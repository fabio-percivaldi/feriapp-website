import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
function Footer() {
    return <Row style={{ backgroundColor: '#FFFFFF', textAlign: 'center', justifyContent: 'space-around' }}>
            <Col md={12}>
                <h2 style={{ margin: 'auto' }}>Seguici sui social!</h2>
            </Col>
            <Col md={12} style={{ justifyContent: 'center' }}>
                <a style={{marginRight: '1%'}} href="https://www.instagram.com/feriappofficial/?hl=it" rel="noopener noreferrer" target="_blank">
                    <FontAwesomeIcon style={{height: '35px', width: '35px'}} color="#ababab" icon={faInstagram}></FontAwesomeIcon>
                </a>
                <a style={{marginLeft: '1%'}} href="https://www.facebook.com/feriappofficial/" rel="noopener noreferrer" target="_blank">
                    <FontAwesomeIcon style={{height: '35px', width: '35px'}} color="#ababab" icon={faFacebook}></FontAwesomeIcon>
                </a>
            </Col>
    </Row>
}


export default Footer