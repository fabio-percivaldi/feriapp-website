import React from "react";
import './BridgesList.css'
import { Card, Container } from 'react-bootstrap'
import { connect } from "react-redux";


const renderHoliday = (holiday, index) => {
    const { imageUrl, days, holidayDescription } = holiday
    return <Card style={{ height: '31%', marginBottom: '5%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px'}}>
        <Card.Img style={{height: '60%', borderTopRightRadius: '7px', borderTopLeftRadius: '7px'}} variant="top" src={`${imageUrl}.jpg`} />
        <Card.Body>
            <Card.Title style={{textAlign: 'center', color: '#f87825'}}>{days}</Card.Title>
            <Card.Text style={{textAlign: 'center', color: '#0b2d50', fontWeight: 'bold'}}>
                {holidayDescription}
            </Card.Text>
        </Card.Body>
    </Card>
}
const mapStateToProps = state => {
    return { holidays: state.holidays };
};
const ConnectedHolidaysList = ({ holidays }) => (
    <Container style={{ height: '100%', overflowY: 'overlay' }}>
        {holidays.map((holiday, index) => renderHoliday(holiday, index))}
    </Container>
)
const HolidaysList = connect(mapStateToProps)(ConnectedHolidaysList);
export default HolidaysList 