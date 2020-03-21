import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
function Footer() {
    return <Row style={{ backgroundColor: '#FFFFFF', textAlign: 'center', justifyContent: 'space-around' }}>
        {/* <Col md={{ span: 3, offset: 3 }} style={{ flexDirection: 'column', justifyContent: 'space-around', display: 'flex' }}>
            <Row>
                <h2 style={{ margin: 'auto' }}>Scarica l'app su App Store e Google Store!</h2>
            </Row>
            <Row style={{ justifyContent: 'space-evenly' }}>
                <a href='https://play.google.com/store/apps/details?id=it.feriapp' rel="noopener noreferrer" target="_blank"><img style={{ height: '40px' }} alt='Get it on Google Play' src='google_play.png' /></a>
                <a href='https://apps.apple.com/it/app/feriapp/id1488392565?l=en' rel="noopener noreferrer" target="_blank"><img style={{ height: '40px' }} alt='Download on the App Store' src='app_store.png' /></a>
            </Row>
        </Col> */}
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