import './Landing.css'
import Login from './Login'
import Signup from './Signup'
import Select from 'react-select';
import { connect } from "react-redux";
import React, { Component } from "react";
import Geosuggest from 'react-geosuggest';
import { Row, Form, Button, Col } from 'react-bootstrap'
import { changeSettings, fetchBridges, fetchHolidays, changeDayOfHolidays } from "../actions/bridges";

const { COUNTRY_LABEL, WEEK_DAYS } = require('../constants')

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

class ConnectedLanding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedNotWorkingDays: props.selectedNotWorkingDays,
            dayOfHolidays: 1,
            daysOff: props.daysOff,
            defaultLocation: { country: 'IT', city: 'Milano' },
        }
    }

    handleDayOffChange = selectedOption => {
        let daysOff = []
        if (selectedOption) {
            daysOff = selectedOption.map(day => {
                return day.value
            })
        }
        this.props.changeSettings({
            daysOff,
            ...this.props.currentCity
        })
    };
    changeLocation = location => {
        const country = location.gmaps.address_components.find(address => address.types.includes(COUNTRY_LABEL))
        const city = location.gmaps.name

        this.props.changeSettings({
            daysOff: this.state.daysOff,
            country: country.short_name,
            city
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
    
        return "unknown";
      }
    handleDownloadApp = () => {
        const clientType = this.getMobileOperatingSystem()
        if (clientType === 'iOS') {
          window.location.href = 'https://apps.apple.com/it/app/feriapp/id1488392565'
        }
        if (clientType === 'Android') {
          window.location.href = 'https://play.google.com/store/apps/details?id=it.feriapp&gl=IT'
        }
    }
    handleDiscoveryClick = () => {
        this.props.fetchBridges({
            city: this.props.currentCity.city,
            daysOff: this.props.daysOff,
            customHolidays: [],
            dayOfHolidays: this.props.dayOfHolidays
        })
        this.props.history.push('/home')
    }
    handleDayOfHolidaysChange = (event) => {
        this.formValue = event.target.value
        this.props.changeDayOfHolidays(event.target.value)
    }
    formValue = "2"
    render() {

        return (
            <Row className="landing-container" style={{ backgroundSize: 'cover', backgroundImage: 'url("landing.jpg")' }}>
                <Col md={12}>
                    <Row style={{ height: '8%' }}>
                        <Col style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <img
                                id="logo"
                                alt=""
                                src="./feriapp_round_icon.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top landing"
                            />
                        </Col>
                        <Col style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <Login></Login>
                            <Signup></Signup>
                        </Col>
                    </Row>
                    <Row style={{ height: '90%' }}>
                        <div className="landing-form">
                            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', marginTop: '2%' }}>Trova i migliori ponti</h1>
                            <Form>
                                <Form.Group style={{ marginBottom: '5%' }} controlId="formBasicEmail">
                                    <Form.Label>In che città vivi?</Form.Label>
                                    <Geosuggest
                                        className="landing"
                                        onSuggestSelect={this.changeLocation}
                                        initialValue={this.props.currentCity.city}
                                    />
                                </Form.Group>

                                <Form.Group style={{ marginBottom: '5%' }} controlId="formBasicPassword">
                                    <Form.Label>In quali giorni ti riposi?</Form.Label>
                                    <Select
                                        className="landing"
                                        onChange={this.handleDayOffChange}
                                        options={WEEK_DAYS}
                                        closeMenuOnSelect={false}
                                        isMulti={true}
                                        defaultValue={[WEEK_DAYS[5], WEEK_DAYS[6]]}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Quanti giorni di ferie al massimo vuoi usare?</Form.Label>
                                    <Form.Control
                                        name="dayOfHolidays"
                                        onChange={this.handleDayOfHolidaysChange}
                                        value={this.formValue}
                                        as="select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Control>
                                </Form.Group>
                                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                <Button onClick={this.handleDiscoveryClick} variant="primary">
                                    Scopri ponti
                                </Button>
                                <Button className="download-btn" onClick={this.handleDownloadApp} variant="primary">
                                    Scarica l'app
                                </Button>
                                </div>
                            </Form>
                        </div>
                        <h2 id="landingInfo">The first site that allows you to find the best bridge deals in the year</h2>
                    </Row>
                </Col>
            </Row>
        )
    }
}
const Landing = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedLanding);
export default Landing