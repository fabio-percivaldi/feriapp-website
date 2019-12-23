import React from "react";
import './BridgesList.css'
import { Card, ListGroup } from 'react-bootstrap'
import { connect } from "react-redux";
import moment from 'moment'
const renderSingleBridge = (singleBridge) => {
    return <ListGroup.Item >
        {`${moment(singleBridge.start).format('DD MMMM')} - ${moment(singleBridge.end).format('DD MMMM')}`}
    </ListGroup.Item>
}
const renderBridge = (bridge) => {
    const { years, bridges = [] } = bridge
    let yearsNormalized
    if (years) {
        yearsNormalized = years.join('-')
    }
    return <Card>
        <Card.Header>{yearsNormalized}</Card.Header>
        <ListGroup variant="flush">
            {bridges.map(renderSingleBridge)}
        </ListGroup>
    </Card>
}
const mapStateToProps = state => {
    return { bridges: state.bridges };
};
const ConnectedBridges = ({ bridges }) => (
    bridges.map(bridge => renderBridge(bridge))
)
const BridgesList = connect(mapStateToProps)(ConnectedBridges);
export default BridgesList 