import axios from 'axios';
import {LOAD_DATA_SUCCESS, RENDER_ITEMS_SUCCESS} from "./actionTypes";

export function loadData() {
    return async dispatch => {
        try {
            const response = await axios.get(`https://floars-shop.firebaseio.com/users/${localStorage.userId}.json`);
            Object.entries(response.data).map((personData) => {
                return dispatch(loadDataSuccess(personData[0], personData[1]))
            });
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderItems() {
    return async dispatch => {
        try {
            const response = await axios.get('https://floars-shop.firebaseio.com/floats.json');
            const floats = Object.entries(response.data).map((book) => {
                return {
                    name: book[1].name,
                    id: book[0],
                    width: book[1].width,
                    length: book[1].length,
                    count: book[1].count,
                    price: book[1].price,
                }
            });
            return dispatch(renderItemsSuccess(floats));
        } catch (e) {
            console.log(e)
        }
    }
}

export function loadDataSuccess(personId, person) {
    return {
        type: LOAD_DATA_SUCCESS,
        personId,
        person
    }
}

export function renderItemsSuccess(floats) {
    return {
        type: RENDER_ITEMS_SUCCESS,
        floats
    }
}