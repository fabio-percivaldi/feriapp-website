import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import './BridgeCard.css'
import moment from 'moment'
import { selectBridge } from '../actions/bridges'
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        selectBridge: bridges => dispatch(selectBridge(bridges))
    };
  }

class ConnectedBridgeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridge: props.bridge
        }
    }

    handleMouseEnter = (event) => {
        this.props.selectBridge(this.state.bridge)
        event.target.style.background = 'orange';
    }
    handleMouseLeaver = (event) => {

        event.target.style.background = 'white';
    }
    render() {
        return (
            <ListGroup.Item onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeaver}>
                {`${moment(this.state.bridge.start).format('DD MMMM')} - ${moment(this.state.bridge.end).format('DD MMMM')}`}
            </ListGroup.Item>
        );
    }
}

const BridgeCard = connect(
    null,
    mapDispatchToProps
  )(ConnectedBridgeCard);
  export default BridgeCard;