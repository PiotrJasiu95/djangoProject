import {
    GET_MENU,
    DELETE_DISH,
    ADD_DISH,
    LOGIN,
    LOGOUT,
    PLACE_ORDER,
    REMOVE_ORDER,
    MAKE_ORDER,
    CLEAR_ORDER,
    GET_ORDER, UPDATE_ORDER,DELETE_ORDER
} from '../actions/types.js';

const initialState = {
    menu: [],
    order: [],
    active_order: [],
    jwt: null,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MENU:
            return {
                ...state,
                menu: action.payload,
            };
        case MAKE_ORDER:
            return {
                ...state,
            };
        case DELETE_DISH:
            return {
                ...state,
                menu: state.menu.filter((menu) => menu.id !== action.payload),
            };
        case ADD_DISH:
            return {
                ...state,
                menu: [...state.menu, action.payload],
            };
        case PLACE_ORDER:
            return {
                ...state,
                order: [...state.order, action.payload],
            };
        case REMOVE_ORDER:
            return {
                ...state,
                order: state.order.filter((e) => e !== action.payload),
            };
        case LOGIN:
            return {
                ...state,
                jwt: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                jwt: null
            };
        case CLEAR_ORDER:
            return {
                ...state,
                order: []
            };
        case GET_ORDER:
            return {
                ...state,
                active_order: action.payload,
            };
        case UPDATE_ORDER:
            return {
                ...state,
            };
        case DELETE_ORDER:
            return {
                ...state,
            };

        // case CLEAR_MENU:
        //   return {
        //     ...state,
        //     menu: [],
        //   };
        //
        default:
            return state;
    }
}
