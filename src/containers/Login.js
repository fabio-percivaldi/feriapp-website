import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, FormLabel, Modal, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import FacebookButton from "../components/FacebookButton";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      showModal: false
    };
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }
  handleShow = () => {
    this.setState({
      showModal: true
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.handleClose()
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <>
        <Button className="orange-button login" onClick={this.handleShow}>Login</Button>
        <Modal
          style={{ height: '85%' }}
          animation={false}
          show={this.state.showModal}
          onHide={this.handleClose}
          dialogClassName="login-modal"
          size="lg"
        >
          <Modal.Body>
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <FacebookButton
                  onLogin={this.handleFbLogin}
                />
                <hr />
                <FormGroup controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <LoaderButton
                  style={{ height: '40px', marginTop: '45px' }}
                  block
                  disabled={!this.validateForm()}
                  type="submit"
                  isLoading={this.state.isLoading}
                  text="Login"
                  loadingText="Logging in…"
                />
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
