import React, { Component } from "react";
import { Row, Col, Button, DropdownButton, Dropdown } from "react-bootstrap";
import './DayOnCalendar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import moment from 'moment'
import { fetchBridges, addCustomHoliday } from "../actions/bridges";

function mapDispatchToProps(dispatch) {
    return {
        fetchBridges: settings => dispatch(fetchBridges(settings)),
        addCustomHoliday: dayOfHolidays => dispatch(addCustomHoliday(dayOfHolidays))
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
class ConnectedDayOnCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridgesOfTheDay: props.bridgesOfTheDay,
            dayOfTheMonth: '',
            month: '',
            isLocked: false,
            day: props.day,
            holidayName: props.holidayName
        }
    }
    toggleLock = () => {
        this.setState({
            isLocked: !this.state.isLocked
        })
        console.log('$$$$$$$$$$$$$$', this.state.isLocked)

        this.props.addCustomHoliday({
            date: moment(this.props.day).format('YYYY-MM-DD'),
            name: 'Custom Holiday'
        })
    }

    renderLockButton = () => {
        if (((!this.props.isHoliday && !this.props.isWeekend) || this.state.isLocked) && !this.isDayInThePast(this.props.day)) {
            return <Button title="Blocca il giorno come festivo" className={this.state.isLocked ? 'unlock-btn' : 'lock-btn'} style={{ marginBottom: 'auto' }} onClick={this.toggleLock}>
                <FontAwesomeIcon icon={this.state.isLocked ? faLock : faLockOpen}></FontAwesomeIcon>
            </Button>
        }
    }
    isDayInThePast = (day) => {
        return moment(day).isBefore(moment().subtract(1, 'days'))
    }
    render() {
        let className = this.props.isWeekend ? 'weekend' : 'defaultDay'
        className = this.props.isHoliday || this.state.isLocked ? 'holiday' : className
        if (this.isDayInThePast(this.props.day)) {
            className += ' past-day'
        }
        return (
            <Col className={className} style={{ display: 'flex', textAlign: 'center', flexDirection: 'column' }}>
                <Row title={this.props.holidayName} style={{ height: '100%', justifyContent: 'space-around' }}>

                <DropdownButton className={this.props.bridgesOfTheDay.length > 0 ? 'bridge-cirle' : 'calendar-day'} drop="up" id="dropdown-item-button" title={this.props.dayOfTheMonth}>
                    <Dropdown.Item onClick={this.toggleLock} as="button">{this.state.isLocked ? 'Sblocca giorno' :'Blocca giorno come festivo'}</Dropdown.Item>
                </DropdownButton>
                </Row>
            </Col>
        );
    }
}

const DayOnCalendar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedDayOnCalendar);
export default DayOnCalendar;
