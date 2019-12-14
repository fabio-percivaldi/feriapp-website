import React, { Component } from "react";
import { Button, Col, Row, Grid } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './NavigationBar.css'
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
        return (
            <Grid>
                <Row>
                    <Col md={12} style={{ display: 'inline-flex', justifyContent: 'space-around' }}>
                        Quanti giorni di ferie vuoi fare?
                    </Col>
                </Row>
                <Row>
                    <Col md={4} ></Col>
                    <Col md={4} style={{ display: 'inline-flex', justifyContent: 'space-between' }}>
                        <Button bsStyle="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.DecreaseItem}>
                            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                        </Button>
                        {this.state.show ? <h2>{this.state.dayOfHolidays}</h2> : ''}
                        <Button bsStyle="primary" className={'btnCircle'} style={{ marginTop: 'auto', marginBottom: 'auto' }} onClick={this.IncrementItem} >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col md={4}></Col>
                </Row >
            </Grid>
        );
    }
}