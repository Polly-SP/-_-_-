import React, {Component} from 'react';
import Header from "../main/Header";
import {NavLink, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {loadData} from "../../store/actions/data";
import {Button} from "react-bootstrap";

class Cabinet extends Component {

    componentDidMount() {
        this.props.loadData();
    }

    render() {
        return (
            <div className={'Cabinet'}>
                <Header />
                <div className="Cabinet__content">
                    <h3>{this.props.person.name + ' ' + this.props.person.surname}</h3>
                    <p>{this.props.person.email}</p>
                    <NavLink to={'/'}><Button variant={'dark'}>Go to shop</Button></NavLink>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        person: state.data.person
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => dispatch(loadData())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cabinet));