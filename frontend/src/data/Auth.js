import Cookies from "js-cookie";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { LOGIN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "~/constants";
import {
    USER_FETCH_REFRESH_TOKEN_FAIL,
    USER_FETCH_REFRESH_TOKEN_REQUEST,
    USER_FETCH_REFRESH_TOKEN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "~/data/actions/userActions";

import { logger } from "~/logger";
import { fetchAccessTokenApi } from "../api";
import { getError } from "~/utils";

export const StoreContext = createContext();

export const INIT_STATE = {
    user: {
        email: null,
        accessToken: null,
        loading: false,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
        case USER_LOGIN_REQUEST:
        case USER_FETCH_REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true,
                },
            };
        case USER_REGISTER_SUCCESS:
        case USER_LOGIN_SUCCESS:
            Cookies.set(REFRESH_TOKEN_KEY, action.payload.refreshToken, { expires: 7 });
            localStorage.setItem(LOGIN_KEY, JSON.stringify(true));
            localStorage.setItem(
                USER_KEY,
                JSON.stringify({ id: action.payload.id, email: action.payload.email, admin: action.payload.isAdmin })
            );
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.email,
                    accessToken: action.payload.accessToken,
                    loading: false,
                },
            };

        case USER_FETCH_REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    accessToken: action.payload.accessToken,
                },
            };

        case USER_REGISTER_FAIL:
        case USER_LOGIN_FAIL:
        case USER_FETCH_REFRESH_TOKEN_FAIL:
            toast.error(action.payload);
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                },
            };

        case USER_LOGOUT:
            Cookies.remove(REFRESH_TOKEN_KEY);
            localStorage.removeItem(LOGIN_KEY);
            localStorage.removeItem(USER_KEY);
            window.location.reload();
            return {
                ...state,
                user: INIT_STATE.user,
            };

        default:
            return state;
    }
}

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(logger(reducer), INIT_STATE);
    const isLogged = JSON.parse(localStorage.getItem(LOGIN_KEY));
    const value = { state, dispatch, isLogged };

    useEffect(() => {
        const fetchAccessToken = async () => {
            const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

            if ((!localStorage.getItem(USER_KEY) || !refreshToken) && isLogged) {
                dispatch({ type: USER_LOGOUT });
            } else {
                if (isLogged) {
                    dispatch({ type: USER_FETCH_REFRESH_TOKEN_REQUEST });
                    try {
                        const res = await fetchAccessTokenApi({ refreshToken });
                        dispatch({ type: USER_FETCH_REFRESH_TOKEN_SUCCESS, payload: res.data });
                    } catch (error) {
                        dispatch({ type: USER_FETCH_REFRESH_TOKEN_FAIL, payload: getError(error) });
                    }
                    setTimeout(() => fetchAccessToken(), 24 * 60 * 60 * 1000);
                }
            }
        };

        fetchAccessToken();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
};
