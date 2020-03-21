import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Download.css'

class Footer extends Component {
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    getMobileOperatingSystem = () => {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
        }
    
        if (/android/i.test(userAgent)) {
          return "Android";
        }
    
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
        }
    
        return null;
      }
    getLink = () => {
        const clientType = this.getMobileOperatingSystem()
        if (clientType === 'iOS') {
          return 'https://apps.apple.com/it/app/feriapp/id1488392565'
        }
        if (clientType === 'Android') {
          return 'https://play.google.com/store/apps/details?id=it.feriapp&gl=IT'
        }
    }
    isMobile = () => {
        return Boolean(this.getMobileOperatingSystem())
    }
    state = { 
        show: this.isMobile(),
        link: this.getLink()
    };
    render() {
        const { show } = this.state;
        return show ? (
            <Row className="download-banner">
                <Col xs={1}>
                    <Row style={{ height: '60px', justifyContent: 'space-evenly' }}>
                        <Button style={{ paddingLeft: '5px' }} id="close-btn" onClick={this.handleClose}>
                            <FontAwesomeIcon style={{ height: '20px', width: 'auto' }} color="#ababab" icon={faTimes}></FontAwesomeIcon>
                        </Button>
                    </Row>
                </Col>
                <Col xs={1}>
                    <Row style={{ height: '60px', justifyContent: 'flex-start' }}>
                        <img
                            alt=""
                            src="./feriapp_round_icon.png"
                            width="30"
                            height="30"
                            className="download"
                        />{' '}
                    </Row>
                </Col>
                <Col xs={7}>
                    <Row style={{height: '50%'}}>
                        <h2 style={{ fontWeight: 'bold', textAlign: 'left', marginTop: 'auto', marginBottom: 'auto', marginLeft: '4%' }}>Feriapp</h2>
                    </Row>
                    <Row>
                        <h5 style={{ textAlign: 'left', marginLeft: '4%' }}>L'app che ti aiuta a pianificare al meglio le tue ferie</h5>
                    </Row>
                </Col>
                <Col xs={3} style={{ justifyContent: 'center' }}>
                    <Row style={{height: '60px', justifyContent: 'flex-end'}}>
                        <a className="download-link" href={this.state.link} rel="noopener noreferrer" target="_blank">Download</a>
                    </Row>
                </Col>
            </Row>) : null
    }
}


export default Footer