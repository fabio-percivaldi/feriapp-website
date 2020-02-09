import React from "react";
import './BridgesList.css'
import { Card, ListGroup, Container, Accordion, Button, Row } from 'react-bootstrap'
import { connect } from "react-redux";
import BridgeCard from '../components/BridgeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const renderSingleBridge = (singleBridge) => {
    return <BridgeCard isTop={singleBridge.isTop} key={singleBridge.id} isSelected={singleBridge.isSelected} bridge={singleBridge}></BridgeCard>
}

const renderBridge = (bridge, index) => {
    const { years, bridges = [] } = bridge
    let yearsNormalized
    if (years) {
        yearsNormalized = years.join('-')
    }
    return <Accordion key={yearsNormalized} defaultActiveKey="0">
        <Card>
            <Card.Header style={{ backgroundColor: '#f87825', color: '#fffde7', display: 'flex', justifyContent: 'space-between' }}>{yearsNormalized}
                <Accordion.Toggle as={Button} eventKey={index.toString()}><FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
            <ListGroup variant="flush">
                {bridges.map(renderSingleBridge)}
            </ListGroup>
            </Accordion.Collapse>
        </Card>
    </Accordion>
}
const mapStateToProps = state => {
    return { bridges: state.bridges };
};
const ConnectedBridges = ({ bridges }) => (
    <Container style={{ height: '90%', overflowY: 'overlay' }}>
        <Row style={{height: '50px', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2>Ponti Consigliati</h2>
        </Row>
        {bridges.map((bridge, index) => renderBridge(bridge, index))}
    </Container>
)
const BridgesList = connect(mapStateToProps)(ConnectedBridges);
export default BridgesList 