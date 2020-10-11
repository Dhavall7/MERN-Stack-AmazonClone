import React, { useState, useEffect } from 'react'
export const initialState = {
    basket: [],
    username: [],
    UserCartValue: ''
};

export const getBasketTotal = (UserCartValue) =>
    UserCartValue.reduce((amount, item) => item.price + amount, 0);

export default function reducer(state, action) {

    console.log("action", action);
    switch (action.type) {
        case 'ADD_NAME':
            //localStorage.setItem('username', JSON.stringify(action.item)) 
            return {
                ...state,
                username: action.item
            }
        case 'STORE_USER_CARTVALUE':
            //localStorage.setItem('username', JSON.stringify(action.item)) 
            return {
                ...state,
                UserCartValue: action.item.UserCartValue
            }
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'REMOVE_NAME':
            let username = [...state.username]
            username.splice(index, 1)
            return {
                ...state,
                username: username
            }
        case 'Logout_BasketValue':
            //localStorage.setItem('username', JSON.stringify(action.item)) 
            return {
                ...state,
                UserCartValue: ''
            }
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket];

            let index = state.basket.findIndex((basketItem) => (basketItem.id === action.id));

            if (index >= 0) {
                newBasket.splice(index, 1)
            }
            else {
                console.warn("There is no such id of product to remove");
            }
            return {
                ...state, basket: newBasket
            }

        case 'REMOVE_FROM_BASKET_API':
            debugger
            let newBasketApi = [...state.UserCartValue];

            let indexApi = state.UserCartValue.findIndex((basketItem) => (basketItem._id === action.id));

            if (indexApi >= 0) {
                newBasketApi.splice(indexApi, 1)
            }
            else {
                console.warn("There is no such id of product to remove");
            }
            return {
                ...state, UserCartValue: newBasketApi
            }

        default:
            return state;
    }
}