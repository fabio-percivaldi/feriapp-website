import './Info.css'
import { connect } from "react-redux";
import React, { Component } from "react";
import { Row, Button, Col, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import config from "../config";
import { withSnackbar } from 'notistack';
import BulletElement from '../components/BulletElement'
import Emoji from '../components/Emoji'
import {
    withRouter
  } from 'react-router-dom'
const { URL: API_GATEWAY_URL, KEY: API_KEY } = config.apiGateway
const apiGatewayClient = axios.create({
    baseURL: API_GATEWAY_URL,
    headers: {
        'x-api-key': API_KEY
    }
})

class ConnectedInfo extends Component {
    constructor(props) {
        super(props)
        this.userEmail = ""
        this.state = {
            show: false,
            userEmail: '',
            userOS: 'iOS'
        }
        this.featuresRef = React.createRef();
    }
    handleBetaClick = () => {
        this.openModal()
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    betaSubscribe = (event) => {
        this.setState({
            show: false
        })
        apiGatewayClient.post('/betaSubscribe', {
            email: this.state.userEmail,
            os: this.state.userOS
        }).then(response => {
            this.props.enqueueSnackbar('Successfully subscribed to beta, you will receive news from us soon', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            })
            window.gtag('event', "beta-subscription");
            this.setState({
                userEmail: '',
                os: ''
            })
        })
    }
    openModal = () => {
        this.setState({
            show: true
        })
    }
    handleEmailChange = (event) => {
        this.setState({ userEmail: event.target.value });
    }
    handleOSChange = (event) => {
        this.setState({ userOS: event.target.value });
    }
    scrollToRef = (ref) => {
        if (ref.current) {
            window.scrollTo(0, ref.current.offsetTop - 100)
        }
    }
    scrollToFeatures = () => {
        this.scrollToRef(this.featuresRef)
    }
    scrollToBeta = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }
    scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    openContactUsForm = () => {
        const newWindow = window.open('https://docs.google.com/forms/d/e/1FAIpQLSdzq7xgCA8aaVCZYYOdTNcJYug0p9YMFEDwmK-U3nr0MpaMVw/viewform', '_blank');
        newWindow.focus()
    }
    openBridges = () => {
        this.props.history.push('/holidays')
    }
    redirectToSkyscanner = () => {
        const newWindow = window.open('https://clk.tradedoubler.com/click?p=224455&a=3147401&g=24649338', '_blank');
        newWindow.focus()
    }
    render() {

        return (
            <Row className="info-container">
                <Modal
                    animation={false}
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}
                    dialogClassName="landing-modal">
                    <Modal.Header closeButton>
                        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
                            <h1 style={{ margin: 'auto' }}>
                                <b>Try out our beta</b>
                            </h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={this.handleEmailChange}
                                    value={this.state.userEmail}
                                    placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    Your email will be used to grant you the beta access.
                                Find out more in our <a href="/privacy">Privacy</a> section.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Operating System</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={this.handleOSChange}
                                    value={this.state.userOS}
                                    as="select" >
                                    <option value="ios">iOS</option>
                                    <option value="android">Android</option>
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={this.betaSubscribe}>
                                Subscribe
                            </Button>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        
                    </Modal.Footer> */}
                </Modal>

                <Col>
                    <Row className="info-header">
                        <Col className="logo-col" style={{ paddingLeft: '13%' }}>
                            <Row>
                                <img
                                    style={{ cursor: 'pointer', margin: '3% 0% 3% 5%' }}
                                    onClick={this.scrollToTop}
                                    id="logo"
                                    alt=""
                                    src="./feriapp_round_icon-80.png"
                                    className="landing"
                                />
                            </Row>
                        </Col>
                        <Col className="link-col" style={{ paddingRight: '11%' }} >
                            <Row style={{ height: '100%' }}>
                                <button style={{ marginRight: '5%' }} className="anchor-link" onClick={this.scrollToFeatures}>Features</button>
                                <button style={{ marginRight: '5%' }} className="anchor-link" onClick={this.scrollToBeta}>Beta</button>
                                <button style={{ marginRight: '5%' }} className="anchor-link" onClick={this.openBridges}>Browse Bridges</button>
                                <button className="anchor-link" onClick={this.openContactUsForm}>Contact us</button>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="title">
                        <Col className="col-1" md={{ span: 4, offset: 1 }} sm={12} xs={12}>
                            <Row id="title-row">
                                <h1>Feriapp</h1>
                                <h2>Plan your vacation in a smart way</h2>
                                <div className="beta-btn-container">
                                    <Button onClick={this.handleBetaClick} className="beta-btn">Request Beta Access</Button>
                                </div>
                            </Row>
                        </Col>
                        <Col className="col-2" md={6} sm={12} xs={12}>
                            <div className="info-bean" alt="" />
                        </Col>
                    </Row>
                    <Row className="info-page" style={{ backgroundColor: '#f5f5f5' }} ref={this.featuresRef} id="info-page-1">
                        <Col md={12} id="col-1">
                            <Row>
                                <h3 style={{textAlign: 'center' }} className="info-1">Turn your annual leave into the longest vacation</h3>
                            </Row>
                            <Row>
                                <div className="info-balance" alt="" />
                            </Row>
                            <Row>
                                <h4 className="info-1">
                                    Feriapp helps you to maximize the length of your vacation by optimizing your annual leave, taking advantage of the bank holidays in your country. Moreover, thanks to the integration with Skyscanner, the app suggests you the cheapest flights for your vacation!</h4>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-profile">
                        <Col md={{ span: 5, order: 1, offset: 1 }} xs={{ span: 12, order: 2 }} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <div className="info-phone" id="profile" alt="" />
                            </Row>
                        </Col>
                        <Col md={{ span: 5, order: 2 }} xs={{ span: 12, order: 1 }} id="col-1">
                            <Row style={{ height: '100%' }}>
                                <h3 className="info-profile">Check your available annual leave</h3>
                                <h4 className="info-profile">
                                    On your profile page you will always have a clear overview of all your days off work. The app automatically updates the calculation. </h4>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-bridges">
                        <Col md={{ span: 5, offset: 1 }} xs={12} id="col-1">
                            <Row style={{ padding: '2%', height: '100%' }}>
                                <h3 className="info-bridges">Discover the longest vacation you can take </h3>
                                <h4 className="info-bridges">
                                    Insert the number of vacation days you want to use and discover the longest vacations in the year.</h4>
                            </Row>
                        </Col>
                        <Col md={5} xs={12} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <div className="info-phone" id="bridges" alt="" />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-2">
                        <Col md={{ span: 5, order: 1, offset: 1 }} xs={{ span: 12, order: 2 }} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <div className="info-phone" id="flights" alt="" />
                            </Row>
                        </Col>
                        <Col md={{ span: 5, order: 2 }} xs={{ span: 12, order: 1 }} id="col-1">
                            <Row style={{ height: '100%' }}>
                                <h3 className="info-flights">Find out the cheapest flight for your holiday with
                                <img alt="" id="skyscanner-logo-mini" style={{ cursor: 'pointer', marginLeft: '3%' }} onClick={this.redirectToSkyscanner} src="https://impfr.tradedoubler.com/imp?type(img)g(24649338)a(3147401)" /></h3>
                                <h4 className="info-flights">
                                    Thanks to the Skyscanner integration, the app suggests you the cheapest flight for the selected time period of your vacation.</h4>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="banner" id="info-page-4">
                        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Row>
                                <h1>Become beta tester!</h1>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="info-page" id="info-page-5">
                        <Col>
                            <h3 className="info-5">Why to become a beta tester?</h3>
                            {['To become part of the feriapp community',
                                'To get the premium version for free',
                                'To be able to use it to optimize your vacation before it becomes public on app stores',
                                'To be the first to receive the app updates',
                                'To be able to take part in developing the app by giving us valuable feedback'].map((value, index) => <BulletElement key={index} value={value}></BulletElement>)}
                            <Row style={{ marginTop: '2%' }}>
                                <Button onClick={this.handleBetaClick} className="beta-btn">Request Beta Access</Button>
                            </Row>
                            <h5 className="info-footer">To join feriapp Beta Community click the button and insert your email. We will send you the beta version. It’s free <Emoji symbol="😃" label="smiling-face"></Emoji> </h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
const Info = connect()(ConnectedInfo);
export default withRouter(withSnackbar(Info))