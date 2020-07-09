import React, {Component} from 'react';
import {Button, Card, Col, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import axios from 'axios';
import {message} from "antd";
import {connect} from "react-redux";
import {renderItems} from "../../store/actions/data";

class AdminItem extends Component {

    state = {
        modal: false,
        name: '',
        width: '',
        length: '',
        count: '',
        price: '',
        floats: []
    };

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

    deleteItem = async event => {
        event.preventDefault();
        try {
            await axios.delete(`https://floars-shop.firebaseio.com/floats/${this.props.id}.json`);
            this.props.renderItems();
            message.success('Item was successfully deleted');
        } catch (e) {
            console.log(e)
        }
    };

    editFloat = async () => {
        try  {
            await axios.put(`https://floars-shop.firebaseio.com/floats/${this.props.id}.json`, {
                name: this.state.name || this.props.name,
                width: this.state.width || this.props.width,
                length: this.state.length || this.props.length,
                count: this.state.count ||  this.props.count,
                price: this.state.price || this.props.price
            });
            this.setState({modal: false});
            message.success('Item was successfully edited');
            this.props.renderItems();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ShopItem">

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit the book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type={'text'} placeholder={'Enter name'} defaultValue={this.props.name} onChange={this.changeName} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Width</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter width'} defaultValue={this.props.width} onChange={this.changeWidth} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Length</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter length'} onChange={this.changeLength} defaultValue={this.props.length} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Count</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Count of pages'} onChange={this.changeCount} defaultValue={this.props.count} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type={'number'} placeholder={'Enter price'} onChange={this.changePrice} defaultValue={this.props.price} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.closeModal}>
                            Close
                        </Button>
                        <Button variant="success" onClick={this.editFloat}>
                            Edit book
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Card>
                    <Card.Header>
                        {this.props.name}
                    </Card.Header>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><b>{this.props.width}</b> width</ListGroupItem>
                            <ListGroupItem><b>{this.props.length}</b> length</ListGroupItem>
                            <ListGroupItem><b>{this.props.count}</b> count</ListGroupItem>
                        </ListGroup>
                        <Card.Text style={{paddingLeft: '1rem'}}>{this.props.price}</Card.Text>
                        <Card.Body>
                            <Button variant={'danger'} style={{marginRight: '1rem'}} onClick={this.deleteItem}>Delete</Button>
                            <Button variant={'primary'} onClick={this.openModal}>Edit</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.data.books
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminItem);