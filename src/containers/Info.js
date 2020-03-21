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
                    <Row className="info-page-1" style={{ height: '90vh' }}>
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
                    <Row className="info-page-1" style={{ height: '85vh' }}>
                        <Col md={12} style={{height: '12%'}}>
                            <Row>
                                <h3>Optimize your holidays</h3>
                                <h4>Feriapp helps you to find the best days to go on vacation. Customize your research by entering the city where you work, your days off and your available leave days.</h4>
                            </Row>
                        </Col>
                        <Col md={12} style={{height: '88%'}}>
                            <Row style={{ height: '100%' }}>
                                <img className="info-mac" alt="" src="./macbook.png" />
                                {/* <img className="info-phone" alt="" src="./phone_with_travels.png" /> */}
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