import React, { Component } from "react";
import './BridgesList.css'
import {Card} from 'react-bootstrap'
export default class BridgeList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bridges: ['pippo', 'paperino']
        }
    }
    renderBridge(text) {
        return <Card>
                    <Card.Body key={text}>{text}</Card.Body>
                </Card>
    }
    render() {
        return (
            this.state.bridges.map(bridge => this.renderBridge(bridge))
        );
    }
}