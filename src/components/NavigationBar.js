import './NavigationBar.css'
import Select from 'react-select';
import { connect } from "react-redux";
import React, { Component } from "react";
import Geosuggest from 'react-geosuggest';
import { Col, Row } from "react-bootstrap";
import DayOffHolidays from './DayOffHoliday'
import { changeSettings, fetchBridges, fetchHolidays } from "../actions/bridges";
const {COUNTRY_LABEL, WEEK_DAYS} = require('../constants')

function mapDispatchToProps(dispatch) {
    return {
        fetchBridges: settings => dispatch(fetchBridges(settings)),
        changeSettings: settings => dispatch(changeSettings(settings)),
        fetchHolidays: city => dispatch(fetchHolidays(city))
    };
}
function mapStateToProps(state) {
    return {
        bridges: state.bridges,
        currentCity: state.currentCity,
        dayOfHolidays: state.dayOfHolidays,
        daysOff: state.daysOff,
        customHolidays: state.customHolidays
    }
}
class ConnectedNavigationBar extends Component {
    constructor(props) {
        super(props);
        console.log('((((((((((((((((((', props.selectedNotWorkingDays)
        this.state = {
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
        this.props.fetchBridges({ dayOfHolidays: this.props.dayOfHolidays, daysOff, city: this.props.currentCity.city, customHolidays: this.props.customHolidays })
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
        this.props.fetchHolidays(city)
        this.props.fetchBridges({ dayOfHolidays: this.props.dayOfHolidays, daysOff: this.props.daysOff, city, customHolidays: this.props.customHolidays })
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
                            options={WEEK_DAYS}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            defaultValue={this.state.selectedNotWorkingDays}
                        />
                    </Row >
                </Col>
                <Col style={{ backgroundColor: '#ffff', height: '100%' }}>
                    <Row style={{ height: '50%', justifyContent: 'center' }}>
                        <h2 style={{ margin: 'auto' }}>In che città vivi?</h2>
                    </Row>
                    <Row style={{ paddingTop: '5px', alignItems: 'flex-start', justifyContent: 'center', height: '50%' }}>
                        <Geosuggest 
                        onSuggestSelect={this.changeLocation} 
                        initialValue={this.props.currentCity.city}
                        />
                    </Row >
                </Col>
            </>
        );
    }
}

const NavigationBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedNavigationBar);
export default NavigationBar