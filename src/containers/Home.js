import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';

export default class Home extends Component {
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

    this.setState({ isLoading: false });
  }
  increment = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays + 1 
    })
  }
  decrease = () => {
    this.setState({
      dayOfHolidays: this.state.dayOfHolidays - 1
    })
  }
  render() {
    return (
      <Grid>
        <Col>
          <Row>
            <NavigationBar increment={this.increment} decrease={this.decrease} dayOfHolidays={this.state.dayOfHolidays}></NavigationBar>
          </Row>
          <Row>
            <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar>
          </Row>
        </Col>
      </Grid>
    );
  }
}
