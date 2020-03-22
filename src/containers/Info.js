import './Info.css'
import Login from './Login'
import Signup from './Signup'
import { connect } from "react-redux";
import React, { Component } from "react";
import { Row, Button, Col, Modal, Form } from 'react-bootstrap'
import axios from 'axios'
import config from "../config";
import { withSnackbar } from 'notistack';
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
            userEmail: ''
        }
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
            email: this.state.userEmail
        }).then(response => {
            this.props.enqueueSnackbar('Successfully fetched the data.', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
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
                        <Form onSubmit={this.betaSubscribe}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={this.handleEmailChange}
                                    value={this.state.userEmail}
                                    placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Button type="submit">
                                Subscribe
                            </Button>
                        </Form>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        
                    </Modal.Footer> */}
                </Modal>

                <Col>
                    <Row className="info-header">
                        <Col style={{ marginLeft: '18%', display: 'flex', justifyContent: 'flex-start' }}>
                            <img
                                id="logo"
                                alt=""
                                src="./feriapp_round_icon.png"
                                className="landing"
                            />
                        </Col>
                        <Col style={{ marginRight: '11%', display: 'flex', justifyContent: 'flex-end' }} >
                            <Login></Login>
                            <Signup></Signup>
                        </Col>
                    </Row>
                    <Row className="info-page">
                        <Col md={5} sm={12} xs={12}>
                            <Row style={{ height: '100%', marginTop: '3%', flexDirection: 'column', justifyContent: 'center' }}>
                                <Col md={{ span: 7, offset: 5 }}>
                                    <Row>
                                        <h1>Feriapp</h1>
                                        <h2>The first site that allows you to find the best holidays in the year</h2>
                                        <div className="beta-btn-container">
                                            <Button onClick={this.handleBetaClick} className="beta-btn">Request Beta Access</Button>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={7} sm={12} xs={12}>
                            <Row style={{ height: '100%', marginTop: '3%' }}>
                                <img className="info-bean" alt="" src="./illustration.png" />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-1">
                        <Col md={12} id="col-1">
                            <Row>
                                <h3 className="info-1">Optimize your holidays</h3>
                                <h4 className="info-1">Feriapp helps you find the best days to go on vacation. Customize the research with your city, days off and available leave days.</h4>
                            </Row>
                        </Col>
                        <Col md={12} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <img className="info-mac" alt="" src="./macbook.png" />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-2">
                        <Col md={6} xs={12} id="col-1">
                            <Row>
                                <h3 className="info-2">Find out the best flights</h3>
                                <h4 className="info-2">Once you have selected your preferred holidays, discover the cheapest flights!</h4>
                            </Row>
                        </Col>
                        <Col md={6} xs={12} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <img className="info-phone" id="flights" alt="" src="./phone_with_travels.png" />
                            </Row>
                        </Col>
                    </Row>
                    <Row className="info-page" id="info-page-3">
                        <Col md={{ span: 6, order: 1 }} xs={{ span: 12, order: 2 }} id="col-2">
                            <Row style={{ height: '100%' }}>
                                <img className="info-phone" id="profile" alt="" src="./profile.png" />
                            </Row>
                        </Col>
                        <Col md={{ span: 6, order: 2 }} xs={{ spane: 12, order: 1 }} id="col-1">
                            <Row>
                                <h3 className="info-3">Keep track of your leave days</h3>
                                <h4 className="info-3">In your profile you will always have under control your available leave days</h4>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="banner" id="info-page-4">
                        <Col>
                            <Row>
                                <h1>Become a beta tester now!</h1>
                            </Row>
                            <Row>
                                <Button onClick={this.handleBetaClick} className="beta-btn">Request Beta Access</Button>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
const Info = connect()(ConnectedInfo);
export default withSnackbar(Info)