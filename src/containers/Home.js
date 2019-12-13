import React, { Component } from "react";
import { EventCalendar, eventTypes } from '@jfschmiechen/react-event-calendar';
import "./Home.css";
import NavigationBar from "../components/NavigationBar";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

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
      <Layout className="layout">
        <Header>
          <NavigationBar></NavigationBar>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <EventCalendar items={parsedEvents} month={5} year={2019} config={config} />
        </Content>
      </Layout>
    );
  }
}
