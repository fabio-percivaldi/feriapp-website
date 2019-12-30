import React, { Component } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';

import './NavigationBar.css'
const weekDays = [
    {
        "label": "Lunedi",
        "value": 1
    },
    {
        "label": "Martedì",
        "value": 2
    },
    {
        "label": "Mercoledì",
        "value": 3
    },
    {
        "label": "Giovedì",
        "value": 4
    },
    {
        "label": "Venerdì",
        "value": 5
    },
    {
        "label": "Sabato",
        "value": 6
    },
    {
        "label": "Domenica",
        "value": 0
    }
]
export default class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayOfHolidays: props.dayOfHolidays,
            show: true,
            size: 'large',
            selectedNotWorkingDays: [
                {
                    "label": "Sabato",
                    "value": 6
                },
                {
                    "label": "Domenica",
                    "value": 0
                }
            ],
            defaultLocation: { country: 'IT', city: 'Milano' }
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
    handleChange = selectedOption => {
        this.setState(
          { selectedNotWorkingDays: selectedOption}         
        );
        let daysOff = []
        if(selectedOption) {
            daysOff = selectedOption.map(day => {
                return day.value
            })
        }
        this.props.changeSettings({
            daysOff,
            ...this.state.defaultLocation
        })
      };
    render() {
        return (
            <Container>
                <Col md={4}>
                    <Row>
                        <Col md={12} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                            Quanti giorni di ferie vuoi fare?
                    </Col>
                    </Row>
                    <Row style={{ paddingTop: '5px' }}>
                        <Col md={3} ></Col>
                        <Col md={6} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                            <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.decreaseDayOfHolidays}>
                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </Button>
                            {this.state.show ? <h2>{this.props.dayOfHolidays}</h2> : ''}
                            <Button variant="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.incrementDayOfHolidays} >
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </Col>
                        <Col md={3}></Col>
                    </Row >
                </Col>
                <Col md={4}>
                    <Row>
                        <Col md={12} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                            In quali giorni ti riposi?
                    </Col>
                    </Row>
                    <Row style={{ paddingTop: '5px' }}>
                        <Col md={12} >
                            <Select
                                onChange={this.handleChange}
                                options={weekDays}
                                closeMenuOnSelect={false}
                                isMulti={true}
                                defaultValue={[weekDays[5], weekDays[6]]}
                            />
                        </Col>
                    </Row >
                </Col>
                <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                    In che città vivi?
                </Col>
            </Container>
        );
    }
}