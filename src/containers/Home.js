import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';
import BridgesList from './BridgesList';
import { connect } from "react-redux";
import { calculateBridges, changeSettings } from "../actions/bridges";
import LandingModal from "../components/LandingModal";

function mapDispatchToProps(dispatch) {
  return {
    calculateBridges: bridges => dispatch(calculateBridges(bridges)),
    changeSettings: settings => dispatch(changeSettings(settings))
  };
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
    if (!this.props.isAuthenticated) {
      return;
    }
  }
  increment = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays + 1
    })
    this.props.calculateBridges(this.state.dayOfHolidays + 1);
  }
  decrease = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays - 1
    })
    this.props.calculateBridges(this.state.dayOfHolidays - 1);
  }
  changeSettings = (newSettings) => {
    this.props.changeSettings(newSettings)
  }
  render() {
    return (
      <>
        <Col md={1} style={{ height: '100%' }}>
        </Col>
        <Col md={10} style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <LandingModal increment={this.increment} decrease={this.decrease} changeSettings={this.changeSettings} dayOfHolidays={this.state.dayOfHolidays} daysOff={this.state.daysOff} selectedNotWorkingDays={this.state.selectedNotWorkingDays}></LandingModal>
          <Container className="body-calendar">
            <Row style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', height: '15%' }}>
              <NavigationBar increment={this.increment} decrease={this.decrease} changeSettings={this.changeSettings} dayOfHolidays={this.state.dayOfHolidays} daysOff={this.state.daysOff} selectedNotWorkingDays={this.state.selectedNotWorkingDays}></NavigationBar>
            </Row>
            <Row style={{ height: '5%' }}>
            </Row>
            <Row style={{ height: '80%' }}>
              <Col md={3} style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', backgroundColor: '#ffff', height: '100%', display: 'flex', alignItems: 'center' }}>
                <BridgesList></BridgesList>
              </Col>
              <Col md={{span: 8, offset:1}} style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '5px', backgroundColor: '#ffff', height: '100%', display: 'flex', alignItems: 'center' }}>
                <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={1} style={{ height: '100%' }}>
        </Col>
      </>

    );
  }
}

const Home = connect(
  null,
  mapDispatchToProps
)(ConnectedHome);
export default Home;
