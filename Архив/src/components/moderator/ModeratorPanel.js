import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Button, Form, Nav, Navbar, Table} from "react-bootstrap";
import axios from 'axios'

class ModeratorPanel extends Component {

    state = {
        userInfo: []
    };

    async componentDidMount() {
        try {
         const response = await axios.get('https://floars-shop.firebaseio.com/users.json');
            const users = Object.values(response.data).map((user) => {
                return {
                    ...user
                }
            });

            users.forEach(user => {
                const userData = Object.entries(user).map((userInfo) => {
                    console.log(userInfo[1]);
                    return {
                        userId: userInfo[0],
                        userData: userInfo[1]
                    }
                });
                this.setState({userInfo: userData})
            });
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'ModeratorPanel'}>
                <Navbar bg="light" expand="lg">
                    <NavLink to={'/admin/panel'} className={'navbar-brand'}>Floats shop Moderator</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to={'/'} exact className={'nav-link'}>Catalog</NavLink>
                            <NavLink to={'/dashboard'} className={'nav-link'}>Dashboard</NavLink>
                        </Nav>
                        <Form inline>
                            <Button variant="dark">Stats</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div className="ModeratorPanel__content">
                    <Table striped hover variant="light">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.userInfo.map((user, index) => {
                            return (
                                <tr key={user+index}>
                                    <th>{user.userId}</th>
                                    <th>{user.userData.name + ' ' + user.userData.surname}</th>
                                    <th>{user.userData.email}</th>
                                    <th>lol</th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ModeratorPanel;