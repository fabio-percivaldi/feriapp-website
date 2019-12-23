import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';
import BridgesList from './BridgesList';
import { connect } from "react-redux";
import { calculateBridges } from "../actions/bridges";
import moment from 'moment';
import * as Kazzenger from '../kazzenger-core/kazzenger'
import deepEqual from 'deep-equal'



function mapDispatchToProps(dispatch) {
  return {
    calculateBridges: bridges => dispatch(calculateBridges(bridges))
  };
}

class ConnectedHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayOfHolidays: 2
    };
  }
  defaultLocation = { country: 'IT', city: 'Milano' }
  defaultDaysOff = [0, 6]
  defaultKazzengerSettings = {
    ...this.defaultLocation,
    daysOff: this.defaultDaysOff,
  }
  _kazzenger = null
  _kazzengerSettings = null
  getKazzenger = (settings) => {
    if (!this._kazzenger || (settings && !deepEqual(settings, this._kazzengerSettings))) {
      this._kazzengerSettings = settings || this.defaultKazzengerSettings
      this._kazzenger = new Kazzenger.default(this._kazzengerSettings)
      console.log('creted new Kazzenger')
    }
    return this._kazzenger
  }
  bridges = (kazzenger, dayOfHolidays) => {
    //  const now = new Date('2019-01-01T00:00:00Z')
    const now = new Date()
    return kazzenger
      .bridgesByYears({
        start: now,
        end: new Date(`${now.getFullYear() + 2}-12-31T12:00:00Z`),
        maxHolidaysDistance: 4,
        maxAvailability: dayOfHolidays,
      })
      .map(years => {
        const scores = []
        years.bridges.forEach(bridge => {
          bridge.rate = kazzenger.rateBridge(bridge)
          if (bridge.rate > 70) {
            scores.push(bridge.rate)
          }
        })
        scores.sort().reverse()
        years.bridges.forEach(bridge => {
          const index = scores.indexOf(bridge.rate)
          bridge.isTop = index >= 0 && index < 2
        })
        return years
      })
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }
  increment = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays + 1
    })
    const bridges = this.bridges(this.getKazzenger(), this.state.dayOfHolidays)
    this.props.calculateBridges({ bridges });
  }
  decrease = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays - 1
    })
    const bridges = this.bridges(this.getKazzenger(), this.state.dayOfHolidays)
    this.props.calculateBridges({ bridges });
  }
  render() {
    return (
      <Container>
        <Col md={4}>
          <BridgesList></BridgesList>
        </Col>
        <Col md={8}>
          <Row>
            <NavigationBar increment={this.increment} decrease={this.decrease} dayOfHolidays={this.state.dayOfHolidays}></NavigationBar>
          </Row>
          <Row>
            <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar>
          </Row>
        </Col>

      </Container>
    );
  }
}

const Home = connect(
  null,
  mapDispatchToProps
)(ConnectedHome);
export default Home;
