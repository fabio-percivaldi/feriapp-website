import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import './DayOnCalendar.css'
export default class DayOnCalendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBridge: props.isBridge,
            isHoliday: props.isHoliday,
            dayOfTheMonth: '',
            month: ''
        }
    }
    render() {
        console.log(this.props)
        let className = this.props.isWeekend ? 'weekend' : 'defaultDay'
        className = this.props.isHoliday ? 'holiday' : className
        className = this.props.isBridge ? 'bridge': className
        return (
            <li className={className} >
                <Col md={12}>
                    <Row style={{textAlign:'center'}}>
                        {this.props.month}
                    </Row>
                    <Row style={{textAlign:'center'}}>
                        {this.props.dayOfTheMonth}
                    </Row>
                </Col>

            </li>
        );
    }
}