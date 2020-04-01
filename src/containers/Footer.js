import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'
function Footer() {
    const redirectToSkyscanner = () => {
        const newWindow = window.open('https://clk.tradedoubler.com/click?p=224455&a=3147401&g=24649344', '_blank');
        newWindow.focus()
    }
    return <Row className="footer">
        <Col>
            <Row className="privacy">
                <a href="/privacy">Privacy</a>
            </Row>
        </Col>
        <Col>
            <Row className="social">
                <a href="https://www.facebook.com/feriappofficial/" rel="noopener noreferrer" target="_blank">
                    <FontAwesomeIcon color="#ffff" icon={faFacebook}></FontAwesomeIcon>
                </a>
                <a href="https://www.instagram.com/feriappofficial/?hl=it" rel="noopener noreferrer" target="_blank">
                    <FontAwesomeIcon color="#ffff" icon={faInstagram}></FontAwesomeIcon>
                </a>
                <a href="https://twitter.com/feriappofficial" rel="noopener noreferrer" target="_blank">
                    <FontAwesomeIcon color="#ffff" icon={faTwitter}></FontAwesomeIcon>
                </a>
            </Row>
        </Col>
        <Col>
            <Row className="skyscanner">
            <div id="skyscanner-img" onClick={redirectToSkyscanner}></div> 
            </Row>
        </Col>

    </Row>
}


export default Footer