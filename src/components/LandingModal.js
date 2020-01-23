import React, { useState } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useCookies } from 'react-cookie'
import DayOffHolidays from './DayOffHoliday'

import './LandingModal.css'
function RenderModal(props) {
    const [cookies, setCookie] = useCookies(['cookie-name']);
    const [show, setShow] = useState(cookies.firstVisit !== undefined ? cookies.firstVisit === 'true' : true);
    const handleClose = () => {
        setCookie('firstVisit', false)
        setShow(false);
    }

    return (
        <Container style={{ display: 'none' }}>
            <Button variant="primary">
                Launch demo modal
        </Button>

            <Modal
                animation={false}
                show={show}
                onHide={handleClose}
                dialogClassName="landing-modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
                        <h1 style={{ margin: 'auto' }}>
                            <b>Benvenuto in Feriapp</b>
                        </h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        <DayOffHolidays
                            message="Scegli quanti giorni di ferie vuoi fare e scopri i migliori ponti dell'anno!"
                            dayOfHolidays={props.dayOfHolidays}
                            decreaseDayOfHolidays={props.decrease}
                            incrementDayOfHolidays={props.increment}></DayOffHolidays>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Continua
            </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

const mapStateToProps = state => {
    return { bridges: state.bridges };
};
const ConnectedLandingPage = (props) => {
    return RenderModal(props)
}
const LandingPage = connect(mapStateToProps)(ConnectedLandingPage);
export default LandingPage