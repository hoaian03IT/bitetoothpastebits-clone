import { createContext, useReducer } from "react";

import {
    FETCH_DETAIL_PRODUCT_FAIL,
    FETCH_DETAIL_PRODUCT_REQUEST,
    FETCH_DETAIL_PRODUCT_SUCCESS,
    FETCH_FEATURED_PRODUCTS_FAIL,
    FETCH_FEATURED_PRODUCTS_REQUEST,
    FETCH_FEATURED_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
} from "./actions/productActions";

import { logger } from "~/logger";

export const ProductContext = createContext();

export const INIT_STATE = {
    product: {
        detailProduct: null,
        filteredProducts: [],
        featuredProducts: {},
        loading: false,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case FETCH_FEATURED_PRODUCTS_REQUEST:
        case FETCH_DETAIL_PRODUCT_REQUEST:
            return {
                ...state,
                product: {
                    ...state.product,
                    loading: true,
                },
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                product: {
                    ...state.product,
                    filteredProducts: action.payload,
                    loading: false,
                },
            };
        case FETCH_FEATURED_PRODUCTS_SUCCESS:
            return {
                ...state,
                product: {
                    ...state.product,
                    featuredProducts: action.payload,
                    loading: false,
                },
            };
        case FETCH_DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                product: {
                    ...state.product,
                    detailProduct: action.payload,
                    loading: false,
                },
            };

        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                product: {
                    ...state.product,
                    filteredProducts: [],
                    loading: false,
                },
            };

        case FETCH_FEATURED_PRODUCTS_FAIL:
            return {
                ...state,
                product: {
                    ...state.product,
                    featuredProducts: [],
                    loading: false,
                },
            };

        case FETCH_DETAIL_PRODUCT_FAIL:
            return {
                ...state,
                product: {
                    ...state.product,
                    detailProduct: null,
                    loading: false,
                },
            };

        default:
            return state;
    }
}

export const ProductProvider = (props) => {
    const [state, dispatch] = useReducer(logger(reducer), INIT_STATE);
    const value = { state, dispatch };

    return <ProductContext.Provider value={value}>{props.children}</ProductContext.Provider>;
};
