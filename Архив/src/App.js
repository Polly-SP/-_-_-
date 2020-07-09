import React, {Component} from 'react';
import './styles/styles.scss';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RootRouter} from "./components/main/RootRouter";

class App extends Component {
    render() {
        return (
            <div className={'App'}>
                <RootRouter />
            </div>
        );
    }
}

export default App;