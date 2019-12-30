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

    handleBridgeSelection = (event) => {
        this.props.selectBridge(this.state.bridge)
        event.target.style.background = event.target.style.background ===  'orange' ? 'white' : 'orange';
    }

    render() {
        return (
            <ListGroup.Item key={`${moment(this.state.bridge.start).format('YYYY-MM-DD')}-${moment(this.state.bridge.end).format('YYYY-MM-DD')}`} onClick={this.handleBridgeSelection}>
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