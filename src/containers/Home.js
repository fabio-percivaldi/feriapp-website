import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./Home.css";
import BridgesCalendar from "./BridgesCalendar";
import NavigationBar from '../components/NavigationBar';
import BridgesList from './BridgesList';
import { connect } from "react-redux";
import { calculateBridges, changeSettings } from "../actions/bridges";

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
  changeSettings = (newSettings) => {
    this.props.changeSettings(newSettings)
  }
  render() {
    return (
      <>
      <Col md={2} style={{height: '100%'}}>
      </Col>
      <Col md={8} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
       <Container className="body-calendar">
          <Row style={{height:'20%'}}>
            <NavigationBar increment={this.increment} decrease={this.decrease} changeSettings={this.changeSettings} dayOfHolidays={this.state.dayOfHolidays}></NavigationBar>
          </Row>
          <Row style={{height:'80%', backgroundColor: 'red'}}>
           <Col md={4}>
             {/* <BridgesList></BridgesList> */}
           </Col>
           <Col md={8} >
               {/* <BridgesCalendar dayOfHolidays={this.state.dayOfHolidays}></BridgesCalendar> */}
           </Col>
         </Row>
       </Container>
      </Col>
      <Col md={2} style={{height: '100%'}}>
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
