import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class AdminLogin extends Component {

    loginAdmin = () => {
        this.props.history.push('/admin/panel')
    };

    render() {
        return (
            <div className={'AdminLogin'}>
                <h1>Welcome, Admin</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="info" onClick={this.loginAdmin}>
                        Enter
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(AdminLogin);