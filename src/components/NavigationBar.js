import React, { Component } from "react";
import { Button, Row, Col } from 'antd';


export default class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dayOfHolidays: 2,
            show: true,
            size: 'large'
        };
    }

    IncrementItem = () => {
        this.setState({ dayOfHolidays: this.state.dayOfHolidays + 1 });
    }
    DecreaseItem = () => {
        this.setState({ dayOfHolidays: this.state.dayOfHolidays - 1 });
    }
    ToggleClick = () => {
        this.setState({ show: !this.state.show });
    }
    render() {
        const { size } = this.state;
        return (
            <div>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8} style={{'display': 'inline-flex', 'flex-direction': 'row', 'justify-content': 'space-between'}}>
                        <Button onClick={this.DecreaseItem} type="primary" shape="circle" icon="left" size={size} />
                        {this.state.show ? <h2>{this.state.dayOfHolidays}</h2> : ''}
                        <Button onClick={this.IncrementItem} type="primary" shape="circle" icon="right" size={size} />
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        );
    }
}