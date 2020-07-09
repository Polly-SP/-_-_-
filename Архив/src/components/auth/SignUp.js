import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import {Alert} from "antd";

class SignUp extends Component {

    state = {
        name: '',
        surname: '',
        email: '',
        password: ''
    };


    sendInfo = event => {
        event.preventDefault();
        this.props.auth(
            this.state.email,
            this.state.password,
            false,
            this.state.name,
            this.state.surname
        );
    };

    setName = event => {
        this.setState({
            name: event.target.value
        })
    };

    setSurname = event => {
        this.setState({
            surname: event.target.value
        })
    };

    setEmail = event => {
        this.setState({
            email: event.target.value
        })
    };

    setPassword = event => {
        this.setState({
            password: event.target.value
        })
    };

    render() {
        return (
            <div className={'SignUp'}>
                {this.props.message !== '' ?
                    <Alert message={this.props.message} banner closable type="error" /> :
                    null
                }
                <h1>Reg in application</h1>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={this.setName} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="surname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" placeholder="Enter surname" onChange={this.setSurname} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.setEmail} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={this.sendInfo}>
                        Sign Up
                    </Button>
                </Form>
                {this.props.isReg === true ?
                    <Redirect to={'/login'} /> :
                    null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReg: state.auth.isReg,
        message: state.auth.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin, name, surname) => dispatch(auth(email, password, isLogin, name, surname))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);