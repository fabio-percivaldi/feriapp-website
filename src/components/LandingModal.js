import React, { useState } from "react";
import { Button, Modal, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useCookies } from 'react-cookie'
import NavigationBar from './NavigationBar'
import './LandingModal.css'
function RenderModal(props) {
    const [cookies, setCookie] = useCookies(['cookie-name']);
    const [show, setShow] = useState(true);
    // const [show, setShow] = useState(cookies.firstVisit !== undefined ? cookies.firstVisit === 'true' : true);
    const handleClose = () => {
        setCookie('firstVisit', false)
        setShow(false);
    }
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>
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
                    <Form>
                        <NavigationBar increment={props.increment} decrease={props.decrease} changeSettings={props.changeSettings} dayOfHolidays={props.dayOfHolidays}></NavigationBar>
                    </Form>
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