import React from "react";
import './BridgesList.css'
import { Container, Spinner, Accordion, Row } from 'react-bootstrap'
import { connect } from "react-redux";
import BridgeCard from '../components/BridgeCard'

const renderSingleBridge = (singleBridge, yearsNormalized) => {
    const { isTop, id, isSelected } = singleBridge
    return <Accordion.Body key={id}>
        <BridgeCard isTop={isTop} key={id} isSelected={isSelected} bridge={singleBridge}></BridgeCard>
    </Accordion.Body>

}

const renderBridge = (bridge, index) => {
    const { years, bridges = [] } = bridge
    let yearsNormalized
    if (years) {
        yearsNormalized = years.join('-')
    }
    return <Accordion style={{ marginBottom: '5%' }} defaultActiveKey="0">
        <Accordion.Item eventKey={yearsNormalized}>
            <Accordion.Header style={{ marginTop: '0px' }}>{yearsNormalized}</Accordion.Header>
            {bridges.map(singleBridge => renderSingleBridge(singleBridge, yearsNormalized))}
        </Accordion.Item>
    </Accordion>
}
const mapStateToProps = state => {
    return { bridges: state.bridges, isFetchingBridges: state.isFetchingBridges };
};
const ConnectedBridges = ({ bridges, isFetchingBridges }) => {
    if (isFetchingBridges) {
        return <Spinner className="bridges-spinner" animation="border" role="status">
            <span className="sr-only">Caricamento...</span>
        </Spinner>
    }
    return <Container style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px', backgroundColor: '#ffff', height: '100%', overflowY: 'overlay' }}>
        <Row style={{ height: '50px', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ width: 'auto' }}>Ponti Consigliati</h2>
        </Row>

        {bridges.map((bridge, index) => renderBridge(bridge, index))}
    </Container>
}
const BridgesList = connect(mapStateToProps)(ConnectedBridges);
export default BridgesList