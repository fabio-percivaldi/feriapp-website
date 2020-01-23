import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import './BridgeCard.css'
import moment from 'moment'
import { selectBridge } from '../actions/bridges'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function mapDispatchToProps(dispatch) {
    return {
        selectBridge: bridges => dispatch(selectBridge(bridges))
    };
  }

class ConnectedBridgeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridge: props.bridge,
            isSelected: props.isSelected,
            isTop: props.isTop
        }
    }

    handleBridgeSelection = (event) => {
        this.props.selectBridge({
            ...this.state.bridge,
            isSelected: !this.props.isSelected
        })
    }

    render() {
        const backgroundColor = this.props.isSelected ? '#e2e2e2' : 'hsl(0,0%,100%)'
        return (
            <ListGroup.Item 
            className="bridge-card"
            style={{backgroundColor}}
            key={`${moment(this.state.bridge.start).format('YYYY-MM-DD')}-${moment(this.state.bridge.end).format('YYYY-MM-DD')}`} 
            onClick={this.handleBridgeSelection}>
                {`${moment(this.state.bridge.start).format('DD MMMM')} - ${moment(this.state.bridge.end).format('DD MMMM')}`}
                {this.state.isTop ? <div className="top-badge"><FontAwesomeIcon color="#ffa000" icon={faStar}></FontAwesomeIcon><h5 style={{fontSize: '1.1rem', margin: 'auto'}}>TOP</h5></div> : <></>}
            </ListGroup.Item>
        );
    }
}

const BridgeCard = connect(
    null,
    mapDispatchToProps
  )(ConnectedBridgeCard);
  export default BridgeCard;