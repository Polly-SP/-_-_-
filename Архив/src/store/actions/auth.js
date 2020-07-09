import axios from 'axios';
import {AUTH_FALSE, AUTH_LOGOUT, AUTH_SUCCESS, REG_FALSE, REG_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin, name, surname) {
    return async dispatch => {
        const displayName = `${name} ${surname}`;
        const authData = {
            email,
            password,
            returnSecureToken: true,
            displayName
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbwN-Hyl2yTIUV98EyUFdpGyszxR3ReUk';

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbwN-Hyl2yTIUV98EyUFdpGyszxR3ReUk';
            try {
                const response = await axios.post(url, authData);
                const data = response.data;
                const expDate = new Date(new Date().getTime() + data.expiresIn * 3000);
                localStorage.setItem('token', data.idToken);
                localStorage.setItem('userId', data.localId);
                localStorage.setItem('userName', data.displayName);
                localStorage.setItem('expirationDate', expDate);

                dispatch(authSuccess(data.idToken));
                dispatch(autoLogout(data.expiresIn))
            } catch {
                const errorMessage = 'Invalid Email or password';
                dispatch(authFalse(errorMessage))
            }
        } else {
            try {
                const response = await axios.post(url, authData);
                const data = response.data;
                await axios.post(`https://floars-shop.firebaseio.com/users/${data.localId}.json`, {
                    name,
                    surname,
                    email
                });
                const isReg = true;
                dispatch(regSuccess(isReg))
            } catch {
                const errorMessage = 'This Email is already exists';
                dispatch(regFalse(errorMessage))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authFalse(message) {
    return {
        type: AUTH_FALSE,
        message
    }
}

export function regFalse(message) {
    return {
        type: REG_FALSE,
        message
    }
}

export function regSuccess(isReg) {
    return {
        type: REG_SUCCESS,
        isReg
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 3000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}