import axios from 'axios';
import {
    GET_MENU,
    DELETE_DISH,
    ADD_DISH,
    LOGIN,
    LOGOUT,
    MAKE_ORDER,
    PLACE_ORDER,
    REMOVE_ORDER,
    CLEAR_ORDER,
    GET_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    ADD_INGREDIENT,
} from "./types";

export const getMenu = () => (dispatch) => {
    axios
        .get('/get_menu/')
        .then((res) => {
            dispatch({
                type: GET_MENU,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

// export const deleteDish = (id) => (dispatch) => {
//   axios
//     .delete(`/delete_dish/${id}`)
//     .then((res) => {
//       dispatch(createMessage({ deleteDish: 'Dish Deleted' }));
//       dispatch({
//         type: DELETE_DISH,
//         payload: id,
//       });
//     })
//     .catch((err) => console.log(err));
// };

export const deleteDish = (id) => (dispatch) => {
    axios
        .post(`/delete_dish/`, {id: id}, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: DELETE_DISH,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

export const addDish = (dish,tmp,price) => (dispatch) => {

    console.log(dish)
    axios
        .post('/post_dish/', {"name": dish, "menu": 1,"tmp":tmp,"price":price})
        .then((res) => {
            dispatch({
                type: ADD_DISH,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const login = (username, password) => (dispatch) => {
    console.log(username, password)
    axios
        .post('/api/token/', {"username": username, "password": password})
        .then((res) => {
            console.log(res.data.access)
            localStorage.setItem("JWT", res.data.access)

            dispatch({
                type: LOGIN, payload: res.data.access,
            });
        })
        .catch((err) => console.log(err));
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("JWT")
    dispatch({
        type: LOGOUT,
    });

};

export const register = (username, password) => (dispatch) => {
    console.log(username, password)
    axios
        .post('/create_user/', {"username": username, "password": password})
        .then((res) => {
            console.log(res.data.access)
            localStorage.setItem("JWT", res.data.access)

            dispatch({
                type: LOGIN,
            });
        })
        .catch((err) => console.log(err));
};

export const place_order = (id) => (dispatch) => {
    dispatch({
        type: PLACE_ORDER,
        payload: id,

    });

};

export const remove_order = (id) => (dispatch) => {

    dispatch({
        type: REMOVE_ORDER,
        payload: id,
    });

};

export const clear_order = () => (dispatch) => {

    dispatch({
        type: CLEAR_ORDER,
    });

};


export const postOrder = (description, adres_1, adres_2, dish) => (dispatch) => {
    axios
        .post(`/create_order/`, {
            description: description,
            adres_1: adres_1,
            adres_2: adres_2,
            dish: dish,


        }, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: MAKE_ORDER
            });
        })
        .catch((err) => console.log(err));
};

export const getOrder = () => (dispatch) => {
    axios
        .get('/get_order/',{
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: GET_ORDER,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err));
};

export const updateOrder = (id, status) => (dispatch) => {
    axios
        .post(`/update_order/`, {
            status: status,
            id: id,



        }, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: UPDATE_ORDER

            });
        })
        .catch((err) => console.log(err));
};

export const deleteOrder = (id) => (dispatch) => {
    axios
        .post(`/delete_order/`, {
            id: id,



        }, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: DELETE_ORDER

            });
        })
        .catch((err) => console.log(err));
};


export const postIngriedent = (name,id) => (dispatch) => {
    axios
        .post(`/post_ingredient/`, {
            ingredient: name,
            dish:id


        }, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("JWT")

            }
        })
        .then((res) => {
            dispatch({
                type: ADD_INGREDIENT
            });
        })
        .catch((err) => console.log(err));
};