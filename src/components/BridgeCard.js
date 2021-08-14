import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import './BridgeCard.css'
import moment from 'moment'
import { selectBridge, fetchFlights } from '../actions/bridges'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function mapDispatchToProps(dispatch) {
    return {
        selectBridge: bridges => dispatch(selectBridge(bridges)),
        fetchFlights: (selectedBridge, currentCity) => dispatch(fetchFlights(selectedBridge, currentCity))
    };
  }
const mapStateToProps = state => {
    return { currentCity: state.currentCity };
};
class ConnectedBridgeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridge: props.bridge,
            isSelected: props.isSelected,
            isTop: props.isTop,
        }
    }

    handleBridgeSelection = (event) => {
        this.props.selectBridge({
            ...this.state.bridge,
            isSelected: !this.props.isSelected
        })
        if(!this.props.isSelected) {
            this.props.fetchFlights(this.state.bridge, this.props.currentCity)
        }
    }

    render() {
        const backgroundColor = this.props.isSelected ? '#e2e2e2' : 'hsl(0,0%,100%)'
        return (
            <ListGroup.Item 
            className="bridge-card"
            style={{backgroundColor, fontSize: '0.7em'}}
            key={`${moment(this.state.bridge.start).format('YYYY-MM-DD')}-${moment(this.state.bridge.end).format('YYYY-MM-DD')}`} 
            onClick={this.handleBridgeSelection}>
                {`${moment(this.state.bridge.start).format('DD MMMM')} - ${moment(this.state.bridge.end).format('DD MMMM')}`}
                {this.state.isTop ? <div className="top-badge"><FontAwesomeIcon color="#f87825" icon={faStar}></FontAwesomeIcon><h5 style={{fontSize: '1.1rem', margin: 'auto'}}>TOP</h5></div> : <></>}
            </ListGroup.Item>
        );
    }
}

const BridgeCard = connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedBridgeCard);
  export default BridgeCard;