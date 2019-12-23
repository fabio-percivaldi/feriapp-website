import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';
import BridgesList from './BridgesList';
import { connect } from "react-redux";
import { calculateBridges } from "../actions/bridges";

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
