import React from "react";
import './BridgesList.css'
import { Card, ListGroup, Container } from 'react-bootstrap'
import { connect } from "react-redux";
import BridgeCard from '../components/BridgeCard'
const renderSingleBridge = (singleBridge) => {
    return <BridgeCard key={singleBridge.id} isSelected={singleBridge.isSelected} bridge={singleBridge}></BridgeCard>
}

const renderBridge = (bridge) => {
    const { years, bridges = [] } = bridge
    let yearsNormalized
    if (years) {
        yearsNormalized = years.join('-')
    }
    return <Card key={yearsNormalized}>
        <Card.Header style={{backgroundColor: '#ffa000', color: '#fffde7'}}>{yearsNormalized}</Card.Header>
        <ListGroup variant="flush">
            {bridges.map(renderSingleBridge)}
        </ListGroup>
    </Card>
}
const mapStateToProps = state => {
    return { bridges: state.bridges };
};
const ConnectedBridges = ({ bridges }) => (
    <Container style={{height: '90%', overflowY: 'overlay'}}>
        {bridges.map(bridge => renderBridge(bridge))}
    </Container>
)
const BridgesList = connect(mapStateToProps)(ConnectedBridges);
export default BridgesList 