import React, {Component} from 'react';
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {message} from "antd";

class ShopItem extends Component {

    buySuccess = () => {
        message.success('Success buy');
    };

    buyError = () => {
        message.error('Enter the system to buy');
    };

    render() {
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ShopItem">
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
                        <Card.Text style={{paddingLeft: '1rem', marginTop: '2rem'}}>{this.props.price}</Card.Text>
                        <Card.Body>
                            {localStorage.token === undefined ?
                                <Button variant="primary" onClick={this.buyError}>Buy</Button> :
                                <Button variant="primary" onClick={this.buySuccess}>Buy</Button>
                            }
                        </Card.Body>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default ShopItem;