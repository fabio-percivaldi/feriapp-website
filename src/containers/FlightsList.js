import React from "react";
import './FlightsList.css'
import { Card, Container, Spinner, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

const renderFlight = (flight, index) => {
    const { originPlace, destinationPlace, price, referralLink, direct } = flight
    return <Card key={index} style={{ height: '25%', width: '100%', marginBottom: '5%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px' }}>
        <Card.Body className="flight-card-body">
            <Card.Title style={{ textAlign: 'center' }}>
                <h2 className="flight-card">
                    {`${originPlace.name} - ${destinationPlace.name}`}
                </h2>
            </Card.Title>
            <Card.Text style={{ textAlign: 'center', color: '#0b2d50', fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
                {`${direct ? 'Diretto' : 'Con scalo'} A/R a partire da: ${price}$`}
                <Button style={{ margin: 'auto' }} href={referralLink} rel="noopener noreferrer" target="_blank">Vedi Offerte<FontAwesomeIcon style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: '3%' }} icon={faPlaneDeparture}></FontAwesomeIcon></Button>
            </Card.Text>
        </Card.Body>
    </Card>
}
const mapStateToProps = state => {
    return { flights: state.flights, isFetching: state.isFetching };
};
const ConnectedFlightsList = ({ flights, isFetching }) => {
    if (isFetching) {
        return <Spinner className="flights-spinner" animation="border" role="status">
            <span className="sr-only">Caricamento...</span>
        </Spinner>
    }
    if (flights && flights.length === 0) {
        return <Container className="flights-container">
            <h2>Nessun volo trovato</h2>
        </Container>
    }
    // return <Container className="flights-container" style={{ flexDirection: 'column' }}>
    return <>
        {flights.map((flight, index) => renderFlight(flight, index))}
        </>
    // </Container>
}
const FlightsList = connect(mapStateToProps)(ConnectedFlightsList);
export default FlightsList 