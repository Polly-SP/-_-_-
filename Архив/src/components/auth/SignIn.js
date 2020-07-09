import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import {Alert} from "antd";

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    };

    sendInfo = (event) => {
        event.preventDefault();
        this.props.auth(
            this.state.email,
            this.state.password,
            true
        );
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
            <div className={'SignIn'}>
                {this.props.message !== '' ?
                    <Alert message={this.props.message} banner closable type="error" /> :
                    null
                }
                <h1>Login into account</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.setEmail} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.setPassword} />
                    </Form.Group>
                    <Button variant="dark" onClick={this.sendInfo}>
                        Sign In
                    </Button>
                </Form>
                {this.props.token ?
                    <Redirect to={'/cabinet'} /> :
                    <Redirect to={'/login'} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.auth.message,
        token: state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);