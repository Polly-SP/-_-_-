import React, {Component} from 'react';
import AdminItem from "./AdminItem";
import {Button, Col, Form, Modal, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {message} from "antd";
import {renderItems} from "../../store/actions/data";
import axios from 'axios'

class AdminPanel extends Component {

    state = {
        modal: false,
        name: '',
        width: '',
        length: '',
        count: '',
        price: '',
        floats: []
    };

    componentDidMount() {
        this.props.renderItems()
    }

    openModal = () => {
        this.setState({modal: true})
    };

    closeModal = () => {
        this.setState({modal: false})
    };

    changeName = event => {
        this.setState({name: event.target.value});
    };
    changeWidth = event => {
        this.setState({width: event.target.value});
    };
    changeLength = event => {
        this.setState({length: event.target.value});
    };
    changeCount = event => {
        this.setState({count: event.target.value});
    };
    changePrice = event => {
        this.setState({price: event.target.value});
    };

    addFloat = async () => {
        try  {
            await axios.post('https://floars-shop.firebaseio.com/floats.json', {
                name: this.state.name,
                author: this.state.author,
                descr: this.state.descr,
                pages: this.state.pages,
                year: this.state.year,
                price: this.state.price
            });
            this.setState({modal: false});
            message.success('Item was successfully add');
            this.props.renderItems();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        return (
            <div className={'AdminPanel'}>

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type={'text'} placeholder={'Enter name'} onChange={this.changeName} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Width</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter width'} onChange={this.changeWidth} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Length</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter length'} onChange={this.changeLength} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Count of pages'} onChange={this.changeCount} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} onChange={this.changePrice} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="success" onClick={this.addFloat}>
                            Add new book
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Navbar bg="light" expand="lg">
                    <NavLink to={'/admin/panel'} className={'navbar-brand'}>Floats shop Admin</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to={'/'} exact className={'nav-link'}>Catalog</NavLink>
                            <NavLink to={'/dashboard'} className={'nav-link'}>Dashboard</NavLink>
                        </Nav>
                        <Form inline>
                            <Button variant="dark" onClick={this.openModal}>Add new</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container-fluid AdminPanel__content">
                    <div className="row">
                        {this.props.floats.map((float, index) => {
                            return (
                                <AdminItem
                                    key={index+float}
                                    id={float.id}
                                    name={float.name}
                                    width={float.width}
                                    length={float.length}
                                    count={float.count}
                                    price={float.price}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        floats: state.data.floats
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);