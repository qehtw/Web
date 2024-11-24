import {UPDATE_CART_ITEM_COUNT, ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART } from "./actionTypes";

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return { ...state, cartItems: action.payload };

        case ADD_TO_CART:
            const existingItemIndex = state.cartItems.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.category === action.payload.category &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedType === action.payload.selectedType
            );

            let updatedCartItems;
            if (existingItemIndex >= 0) {
                
                updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].count += action.payload.count;
            } else {
            
                updatedCartItems = [...state.cartItems, action.payload];
            }
            return { ...state, cartItems: updatedCartItems };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) =>
                        !(item.id === action.payload.id &&
                        item.category === action.payload.category &&
                        item.selectedSize === action.payload.selectedSize &&
                        item.selectedType === action.payload.selectedType)
                ),
            };

        case CLEAR_CART:
            return { ...state, cartItems: [] };


        case UPDATE_CART_ITEM_COUNT: {
            console.log('Reducer updating cart item count:', action.payload);
            const updatedCartItems = state.cartItems.map((item) => {
                const isMatchingItem =
                    String(item.id).trim() === String(action.payload.id).trim() &&
                    String(item.category).trim().toLowerCase() === String(action.payload.category).trim().toLowerCase() &&
                    String(item.selectedSize).trim().toLowerCase() === String(action.payload.selectedType).trim().toLowerCase() &&
                    String(item.selectedType).trim().toLowerCase() === String(action.payload.selectedSize).trim().toLowerCase();
        
                console.log('Detailed check:', {
                    itemSelectedSize: item.selectedSize,
                    payloadSelectedSize: action.payload.selectedSize,
                    sizeMatch: item.selectedSize === action.payload.selectedSize,
                    itemSelectedType: item.selectedType,
                    payloadSelectedType: action.payload.selectedType,
                    typeMatch: item.selectedType === action.payload.selectedType,
                    isMatchingItem,
                });
        
                return isMatchingItem
                    ? { ...item, count: action.payload.newCount }
                    : item;
            }).filter((item) => item.count > 0);
            console.log('Updated cart items:', updatedCartItems);
            return { ...state, cartItems: updatedCartItems };
        }
            
            
            
        default:
            return state;
    }
};

export default cartReducer