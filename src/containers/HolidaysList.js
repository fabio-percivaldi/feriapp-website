import React from "react";
import './HolidaysList.css'
import { Card, Col } from 'react-bootstrap'
import { connect } from "react-redux";

const renderHoliday = (holiday, index) => {
    const { caption, mediaUrl, permaurl } = holiday
    return <a key={index} className="holiday-card" href={permaurl} rel="noopener noreferrer" target="_blank">
        <Card className='grow' style={{ height: '100%', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)', borderRadius: '7px' }}>
            <Card.Img style={{ height: '75%', borderTopRightRadius: '7px', borderTopLeftRadius: '7px' }} variant="top" src={`${mediaUrl}`} />
            <Card.Body style={{ display: 'flex' }}>
                <Card.Text style={{ textAlign: 'center', color: '#0b2d50', margin: 'auto', fontWeight: 'bold' }}>
                    {caption.split('?')[0]}
                </Card.Text>
            </Card.Body>
        </Card>
    </a>
}
const mapStateToProps = state => {
    return { holidays: state.holidays, media: state.media };
};


const ConnectedHolidaysList = ({ holidays, media, fetchIGMedia }) => {
    return (
        <Col className="holidays-container">
                {media.map((holiday, index) => renderHoliday(holiday, index))}
        </Col>
    )
}
const HolidaysList = connect(
    mapStateToProps,
)(ConnectedHolidaysList);
export default HolidaysList 