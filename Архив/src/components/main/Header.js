import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {NavLink, withRouter} from "react-router-dom";
import {logout} from "../../store/actions/auth";
import {loadData} from "../../store/actions/data";
import {connect} from "react-redux";

class Header extends Component {

    logout = () => {
        this.props.logout();
        this.props.history.push("/login");
    };

    // setWord = event => {
    //     this.props.history.push({
    //         pathname: '/',
    //         state: {
    //             word: event.target.value
    //         }
    //     })
    // };

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <NavLink to={'/'} className={'navbar-brand'}>Floats shop</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {localStorage.token === undefined ?
                            <>
                                <NavLink to={'/login'} className={'nav-link'}>Login</NavLink>
                                <NavLink to={'/reg'} className={'nav-link'}>Registration</NavLink>
                            </> :
                            <NavLink to={'/cabinet'} className={'nav-link'}>{this.props.person.name + ' ' + this.props.person.surname}</NavLink>
                        }
                        <NavLink to={'/'} exact className={'nav-link'}>Catalog</NavLink>
                    </Nav>
                    {window.location.pathname === '/cabinet' ?
                        <Button variant="dark" onClick={this.logout}>Logout</Button> :
                        <Form inline>
                            <FormControl type="text" placeholder="Search floats" className="mr-sm-2"/>
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return {
        personId: state.data.personId,
        person: state.data.person
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout()),
        loadData: () => dispatch(loadData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));