import React, {Component} from 'react';
import ShopItem from "./ShopItem";
import Header from "../main/Header";
import {connect} from "react-redux";
import {renderItems} from "../../store/actions/data";
import {withRouter} from "react-router-dom";

class Shop extends Component {


    componentDidMount() {
        this.props.renderItems();
    }

    render() {
        return (
            <div className={'Shop'}>
                <Header />
                <h2 style={{padding: '2rem 2rem 0 2rem'}}>Floats shop</h2>
                <div className="container-fluid">
                    <div className="row Shop__list">
                        {this.props.floats.map((float, index) => {
                            return (
                                <ShopItem
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
        floats: state.data.floats,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderItems: () => dispatch(renderItems()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shop));