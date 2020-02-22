import React from "react";
import './FlightsList.css'
import { Card, Container } from 'react-bootstrap'
import { connect } from "react-redux";


const renderFlight = (flight, index) => {
    const { OriginPlace, Quotes, Price } = flight
    const [firstQuote] = Quotes
    return <Card key={index} style={{ height: '25%', marginBottom: '5%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px' }}>
        <Card.Body>
            <Card.Title style={{ textAlign: 'center', color: '#f87825' }}>{`${OriginPlace.Name} - ${firstQuote.DestinationPlace.Name}`}</Card.Title>
            <Card.Text style={{ textAlign: 'center', color: '#0b2d50', fontWeight: 'bold' }}>
                {`A/R: ${Price}`}
            </Card.Text>
        </Card.Body>
    </Card>
}
const mapStateToProps = state => {
    return { flights: state.flights, isFetching: state.isFetching };
};
const ConnectedFlightsList = ({ flights }) => {
    return (
        <Container style={{ height: '100%', overflowY: 'overlay' }}>
            {flights.map((flight, index) => renderFlight(flight, index))}
        </Container>
    )
}
const FlightsList = connect(mapStateToProps)(ConnectedFlightsList);
export default FlightsList 