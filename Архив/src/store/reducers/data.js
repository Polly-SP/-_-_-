import {LOAD_DATA_SUCCESS, RENDER_ITEMS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    floats: [],
    personId: '',
    person: {}
};

export default function mainReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_DATA_SUCCESS:
            return {
                ...state,
                personId: action.personId,
                person: action.person
            };
        case RENDER_ITEMS_SUCCESS:
            return {
                ...state,
                floats: action.floats
            };
        default:
            return state;
    }
}