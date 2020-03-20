import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './DayOffHoliday'

export default class DayOffHolidays extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayOfHolidays: props.dayOfHolidays,
        };
    }

    render() {
        return (
            <Col className="navigation-bar-col left" xs={12} md={4} style={{ backgroundColor: '#ffff' }}>
                <Row style={{ padding: '2%', height: '100%' }}>
                    <Col xs={6} md={12} style={{ display: 'flex', height: '50%' }}>
                        <h2 style={{ margin: 'auto', textAlign: 'center' }}>{this.props.message}</h2>
                    </Col>
                    <Col xs={6} md={12} style={{ display: 'flex', height: '50%', justifyContent: 'space-evenly' }}>
                        <Button className="circular-btn" style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.props.decreaseDayOfHolidays}>
                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </Button>
                        <h2 style={{ marginTop: 'auto', marginBottom: 'auto' }}>{this.props.dayOfHolidays}</h2>
                        <Button className="circular-btn" style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.props.incrementDayOfHolidays} >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>

                </Row>
            </Col>
        )
    }
}
