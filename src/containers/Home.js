import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';
import BridgesList from './BridgesList';
import { connect } from "react-redux";
import { changeSettings, fetchFlights, selectBridge, fetchIGMedia, fetchBridges, changeDayOfHolidays } from "../actions/bridges";
import LandingModal from "../components/LandingModal";
import FlightsList from "./FlightsList";

function mapDispatchToProps(dispatch) {
  return {
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

    this.state = {
      dayOfHolidays: 2,
      daysOff: [0, 6],
      selectedNotWorkingDays: [
        {
          "label": "Sabato",
          "value": 6
        },
        {
          "label": "Domenica",
          "value": 0
        }
      ]
    };
  }

  async componentDidMount() {
    this.props.selectBridge({
      ...this.props.bridges[0].bridges[0],
      isSelected: true
    })
    this.props.fetchIGMedia()
    this.props.fetchFlights(this.props.bridges[0].bridges[0], this.props.currentCity)
  }
  increment = () => {
    this.props.changeDayOfHolidays(this.props.dayOfHolidays + 1)
    this.props.fetchBridges({ dayOfHolidays: (this.props.dayOfHolidays + 1), daysOff: this.props.daysOff, city: this.props.currentCity.city, customHolidays: this.props.customHolidays})
  }
  decrease = () => {
    this.props.changeDayOfHolidays(this.props.dayOfHolidays - 1)
    this.props.fetchBridges({ dayOfHolidays: (this.props.dayOfHolidays - 1), daysOff: this.props.daysOff, city: this.props.currentCity.city, customHolidays: this.props.customHolidays})
  }
  changeSettings = (newSettings) => {
    this.props.changeSettings(newSettings)
  }
  render() {
    return (
      <>
        <Col md={12} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <LandingModal increment={this.increment} decrease={this.decrease} changeSettings={this.changeSettings} dayOfHolidays={this.props.dayOfHolidays} daysOff={this.state.daysOff} selectedNotWorkingDays={this.state.selectedNotWorkingDays}></LandingModal>
          <Container className="body-calendar">
            <Col md={9} style={{ height: '100%', alignItems: 'center' }}>
              <Row style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', height: '15%' }}>
                <NavigationBar increment={this.increment} decrease={this.decrease} changeSettings={this.changeSettings} daysOff={this.state.daysOff} selectedNotWorkingDays={this.state.selectedNotWorkingDays}></NavigationBar>
              </Row>
              <Row style={{ height: '5%' }}>
              </Row>
              <Row style={{ height: '80%' }}>
                <Col md={4} style={{ paddingLeft: '0', paddingRight: '3%', maxHeight: '100%' }}>
                  <Col md={12} style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', backgroundColor: '#ffff', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <BridgesList></BridgesList>
                  </Col>
                </Col>
                <Col md={8} style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', backgroundColor: '#ffff', height: '100%', display: 'flex', alignItems: 'center' }}>
                  <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar>
                </Col>
              </Row>
            </Col>
            <Col md={3} style={{ paddingLeft: '3%', paddingRight: '0%', height: '100%', display: 'flex', alignItems: 'center' }}>
              <FlightsList></FlightsList>
            </Col>
          </Container>
        </Col>
      </>

    );
  }
}


const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHome);
export default Home;
