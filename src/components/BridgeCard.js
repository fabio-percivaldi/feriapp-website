import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import './BridgeCard.css'
export default class BridgeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isBridge: false,
            dayOfTheMonth: '',
            month: ''
        }
    }
    render() {
        return (
            <li className={this.props.isBridge ? 'bridge' : 'defaultDay'} >
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