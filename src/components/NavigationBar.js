import React, { Component } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './NavigationBar.css'
export default class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayOfHolidays: props.dayOfHolidays,
            show: true,
            size: 'large'
        };
    }

    incrementDayOfHolidays = () => {
        this.props.increment()
    }
    decreaseDayOfHolidays = () => {
        this.props.decrease()
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={12} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                        Quanti giorni di ferie vuoi fare?
                    </Col>
                </Row>
                <Row>
                    <Col md={4} ></Col>
                    <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.decreaseDayOfHolidays}>
                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </Button>
                        {this.state.show ? <h2>{this.props.dayOfHolidays}</h2> : ''}
                        <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.incrementDayOfHolidays} >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col md={4}></Col>
                </Row >
            </Container>
        );
    }
}