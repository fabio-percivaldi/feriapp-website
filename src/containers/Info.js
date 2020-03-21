import './Info.css'
import Login from './Login'
import Signup from './Signup'
import { connect } from "react-redux";
import React, { Component } from "react";
import { Row, Button, Col } from 'react-bootstrap'
import { changeSettings, fetchBridges, fetchHolidays, changeDayOfHolidays } from "../actions/bridges";

const mapStateToProps = state => {
    return {
        holidays: state.holidays,
        media: state.media,
        currentCity: state.currentCity,
        dayOfHolidays: state.dayOfHolidays,
        daysOff: state.daysOff,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBridges: settings => dispatch(fetchBridges(settings)),
        changeSettings: settings => dispatch(changeSettings(settings)),
        fetchHolidays: city => dispatch(fetchHolidays(city)),
        changeDayOfHolidays: dayOfHolidays => dispatch(changeDayOfHolidays(dayOfHolidays))
    }
}

class ConnectedInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedNotWorkingDays: props.selectedNotWorkingDays,
            dayOfHolidays: 1,
            daysOff: props.daysOff,
            defaultLocation: { country: 'IT', city: 'Milano' },
        }
    }
    render() {

        return (
            <Row className="info-container">
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
                                            <Button className="beta-btn">Request Beta Access</Button>
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
                </Col>
            </Row>
        )
    }
}
const Info = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedInfo);
export default Info