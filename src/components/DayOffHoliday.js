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
            <Col style={{ height: '100%' }}>
                <Row style={{ height: '50%', justifyContent: 'center' }}>
                    <h2 style={{ margin: 'auto', textAlign: 'center' }}>{this.props.message}</h2>
                </Row>
                <Row style={{ paddingTop: '5px', alignItems: 'flex-start', justifyContent: 'center', height: '50%' }}>
                    <Col md={3} ></Col>
                    <Col md={6} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.props.decreaseDayOfHolidays}>
                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </Button>
                        <h2>{this.props.dayOfHolidays}</h2>
                        <Button className="orange-button" style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.props.incrementDayOfHolidays} >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col md={3}></Col>
                </Row >
            </Col>
        )
    }
}
