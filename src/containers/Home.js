import "./Home.css";
import Login from './Login'
import Signup from './Signup'
import { connect } from "react-redux";
import BridgesList from './BridgesList';
import FlightsList from "./FlightsList";
import HolidaysList from "./HolidaysList";
import BridgesCalendar from "./BridgesCalendar";
import React, { Component, Fragment } from "react";
import NavigationBar from '../components/NavigationBar';
import { Col, Row, Button, Navbar } from "react-bootstrap";
import { fetchHolidays, changeSettings, fetchFlights, selectBridge, fetchIGMedia, fetchBridges, changeDayOfHolidays } from "../actions/bridges";
const { WEEK_DAYS } = require('../constants')

function mapDispatchToProps(dispatch) {
  return {
    fetchHolidays: city => dispatch(fetchHolidays(city)),
    fetchIGMedia: () => dispatch(fetchIGMedia()),
    fetchBridges: settings => dispatch(fetchBridges(settings)),
    selectBridge: bridges => dispatch(selectBridge(bridges)),
    changeSettings: settings => dispatch(changeSettings(settings)),
    fetchFlights: (selectedBridge, currentCity) => dispatch(fetchFlights(selectedBridge, currentCity)),
    changeDayOfHolidays: dayOfHolidays => dispatch(changeDayOfHolidays(dayOfHolidays))
  };
}
function mapStateToProps(state) {
  return {
    bridges: state.bridges,
    currentCity: state.currentCity,
    dayOfHolidays: state.dayOfHolidays,
    daysOff: state.daysOff,
    customHolidays: state.customHolidays
  }
}
class ConnectedHome extends Component {
  constructor(props) {
    super(props);
    const defaultNotWorkingDays = this.props.daysOff.map(day => {
      const weekDay = WEEK_DAYS.find(weekDay => weekDay.value === day)
      return {
        "label": weekDay ? weekDay.label : '',
        "value": day
      }
    })
    this.state = {
      selectedNotWorkingDays: defaultNotWorkingDays
    };
  }

  async componentDidMount() {
    this.props.fetchHolidays(this.props.currentCity.city)
    this.props.fetchIGMedia()
  }
  increment = () => {
    this.props.changeDayOfHolidays(this.props.dayOfHolidays + 1)
    this.props.fetchBridges({ dayOfHolidays: (this.props.dayOfHolidays + 1), daysOff: this.props.daysOff, city: this.props.currentCity.city, customHolidays: this.props.customHolidays })
  }
  decrease = () => {
    this.props.changeDayOfHolidays(this.props.dayOfHolidays - 1)
    this.props.fetchBridges({ dayOfHolidays: (this.props.dayOfHolidays - 1), daysOff: this.props.daysOff, city: this.props.currentCity.city, customHolidays: this.props.customHolidays })
  }
  changeSettings = (newSettings) => {
    this.props.changeSettings(newSettings)
  }
  render() {
    return (
      <>
        <Row>
        <Navbar style={{ backgroundColor: '#ffff', width: '100%', marginBottom: '0', borderBottom: '1px solid transparent' }}>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="./feriapp_round_icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Feriapp
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {this.state.isAuthenticated ? (
              <Button onClick={this.handleLogout}>Logout</Button>
            ) : (
                <Fragment>
                  <Signup></Signup>
                  <Login userHasAuthenticated={this.userHasAuthenticated}></Login>
                </Fragment>
              )}
          </Navbar.Collapse>
        </Navbar>
        </Row>
        <Row className="body-container" style={{ minHeight: '80vh', marginTop: '2%' }}>
          {/* <LandingModal
            increment={this.increment}
            decrease={this.decrease}
            changeSettings={this.changeSettings}
            dayOfHolidays={this.props.dayOfHolidays}
            daysOff={this.state.daysOff}
            selectedNotWorkingDays={this.state.selectedNotWorkingDays}>
          </LandingModal> */}
            <Col md={{span: 8, offset: 1}} sx={12} style={{display: 'flex', flexDirection: 'column'}}>
              <Row className="navigation-bar" style={{ minHeight: '15%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px' }}>
                <NavigationBar 
                increment={this.increment} 
                decrease={this.decrease} 
                changeSettings={this.changeSettings} 
                daysOff={this.state.daysOff} 
                selectedNotWorkingDays={this.state.selectedNotWorkingDays}
                ></NavigationBar>
              </Row>
              <Row className="spacing-row" style={{ height: '5%' }}>
              </Row>
              <Row style={{ height: '80%' }}>
                <Col md={4} xs={12} id="bridgesList" className="xs-margin-top" style={{ display: 'flex', alignItems: 'center', paddingLeft: '0', paddingRight: '3%', maxHeight: '100%' }}>
                    <BridgesList></BridgesList>
                </Col>
                <Col md={8} xs={12} className="xs-margin-top" style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px', backgroundColor: '#ffff', display: 'flex', alignItems: 'center' }}>
                  <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar>
                </Col>
              </Row>
            </Col>
            <Col md={2} xs={12} id="fligthsList" className="xs-margin-top" style={{ paddingLeft: '2%', paddingRight: '0%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FlightsList></FlightsList>
            </Col>
        </Row>
        <Row style={{ marginTop: '2%', marginBottom: '2%'}}>
          <HolidaysList></HolidaysList>
        </Row>
        </>
    );
  }
}


const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHome);
export default Home;
