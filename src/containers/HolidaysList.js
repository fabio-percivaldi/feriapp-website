import React from "react";
import './HolidaysList.css'
import { Card, Container, Col } from 'react-bootstrap'
import { connect } from "react-redux";

const renderHoliday = (holiday, index) => {
    const { caption, media_url } = holiday
    return <Card key={index} style={{ width: '15%', height: '300px', marginBottom: 'auto', marginTop: 'auto', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px' }}>
        <Card.Img style={{ height: '60%', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }} variant="top" src={`${media_url}`} />
        <Card.Body style={{display: 'flex'}}>
            <Card.Title style={{ textAlign: 'center', color: '#f87825', margin: 'auto' }}>{}</Card.Title>
            <Card.Text style={{ textAlign: 'center', color: '#0b2d50', margin: 'auto', fontWeight: 'bold' }}>
                {caption.split('#')[0]}
            </Card.Text>
        </Card.Body>
    </Card>
}
const mapStateToProps = state => {
    return { holidays: state.holidays, media: state.media };
};


const ConnectedHolidaysList = ({ holidays, media, fetchIGMedia }) => {
    return (
        <Col style={{ height: '100%' }}>
            <Container className="holidays-container">
                {media.map((holiday, index) => renderHoliday(holiday, index))}
            </Container>
        </Col>
    )
}
const HolidaysList = connect(
    mapStateToProps,
)(ConnectedHolidaysList);
export default HolidaysList 