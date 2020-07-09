import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class ModeratorLogin extends Component {

    moderLogin = () => {
        this.props.history.push('/moderator/panel')
    };

    render() {
        return (
            <div className={'ModeratorLogin'}>
                <h1>Welcome, Moderator</h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="info" onClick={this.moderLogin}>
                        Enter
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(ModeratorLogin);