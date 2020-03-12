import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import DayOffHolidays from './DayOffHoliday'

import Select from 'react-select';
import Geosuggest from 'react-geosuggest';
import './NavigationBar.css'
const COUNTRY_LABEL = 'country'
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
            selectedNotWorkingDays: props.selectedNotWorkingDays,
            daysOff: props.daysOff,
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
            { selectedNotWorkingDays: selectedOption }
        );
        let daysOff = []
        if (selectedOption) {
            daysOff = selectedOption.map(day => {
                return day.value
            })
        }
        this.setState({
            daysOff
        })
        this.props.changeSettings({
            daysOff,
            ...this.state.defaultLocation
        })
    };
    changeLocation = location => {
        const country = location.gmaps.address_components.find(address => address.types.includes(COUNTRY_LABEL))
        const city = location.gmaps.name
        this.setState({
            defaultLocation: { country: country.short_name, city }
        })

        this.props.changeSettings({
            daysOff: this.state.daysOff,
            country: country.short_name,
            city
        })
    }
    render() {
        return (
            <>
                <DayOffHolidays
                    message="Quanti giorni di ferie vuoi usare?"
                    dayOfHolidays={this.props.dayOfHolidays}
                    decreaseDayOfHolidays={this.decreaseDayOfHolidays}
                    incrementDayOfHolidays={this.incrementDayOfHolidays}></DayOffHolidays>
                <Col style={{ backgroundColor: '#ffff', height: '100%' }}>
                    <Row style={{ height: '50%', justifyContent: 'center' }}>
                        <h2 style={{ margin: 'auto' }}>In quali giorni ti riposi?</h2>
                    </Row>
                    <Row style={{ paddingTop: '5px', alignItems: 'flex-start', justifyContent: 'center', height: '50%' }}>
                        <Select
                            onChange={this.handleChange}
                            options={weekDays}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            defaultValue={[weekDays[5], weekDays[6]]}
                        />
                    </Row >
                </Col>
                <Col style={{ backgroundColor: '#ffff', height: '100%' }}>
                    <Row style={{ height: '50%', justifyContent: 'center' }}>
                        <h2 style={{ margin: 'auto' }}>In che città vivi?</h2>
                    </Row>
                    <Row style={{ paddingTop: '5px', alignItems: 'flex-start', justifyContent: 'center', height: '50%' }}>
                    <Geosuggest onSuggestSelect={this.changeLocation}/>
                    </Row >
                </Col>
            </>
        );
    }
}