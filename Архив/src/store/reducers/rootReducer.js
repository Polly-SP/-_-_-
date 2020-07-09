import {combineReducers} from 'redux';
import auth from '../reducers/auth';
import data from '../reducers/data'

export default combineReducers({
    auth: auth,
    data: data
})