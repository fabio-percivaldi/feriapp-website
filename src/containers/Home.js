import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: [],
    };
  }
  currentValue = 2

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }
  incrementNumber = () => {
    this.currentValue++
  }
  render() {
    return (
      <Grid>
        <Col>
          <Row>
            <NavigationBar></NavigationBar>
          </Row>
          <Row>
            <BridgesCalendar></BridgesCalendar>
          </Row>
        </Col>
      </Grid>
    );
  }
}
