import React, { Component } from "react";
import { EventCalendar, eventTypes } from '@jfschmiechen/react-event-calendar';
import { Grid, Row } from "react-bootstrap";

import "./Home.css";
import NavigationBar from "../components/NavigationBar";
let parsedEvents = [];

let colors = {
  primaryColor: 'slateblue',
  secondaryColor: 'lightslategray'
};

let config = {
  colors,
  onEventClick: (e, event, eventArray) => console.log(event.type === eventTypes.SINGLE_DAY_TYPE),
  onTileClick: (e, eventArray) => console.log(eventArray),
  onPlusMoreClick: (e, eventArray) => console.log(eventArray),
  width: '100%'
};
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Grid className="layout" style={{heigth: '100vh'}}>
          <NavigationBar></NavigationBar>
          <Row>
            <EventCalendar items={parsedEvents} month={5} year={2019} config={config} />
          </Row>
      </Grid>
    );
  }
}
