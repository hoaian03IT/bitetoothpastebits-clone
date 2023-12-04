import { createContext, useState } from "react";

export const CartContext = createContext();

const CART_KEY = "cartItems";

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem(CART_KEY) || []);

    const handleAddToCart = (item) => {
        let isDupl = false;
        const newCartItems = cartItems.map((cartItem) => {
            if (item._id === cartItem._id) {
                isDupl = true;
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });

        if (!isDupl) setCartItems((prev) => [item, ...prev]);
        else setCartItems(newCartItems);
        localStorage.setItem(CART_KEY, cartItems);
    };

    const handleRemoveFromCart = (id, quantityRemove = 0) => {
        let newCartItems;
        if (quantityRemove > 0) {
            newCartItems = cartItems.map((item) => {
                if (item._id === id) {
                    const newQuantity = item.quantity - quantityRemove >= 0 ? item.quantity - quantityRemove : 0;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        } else {
            newCartItems = cartItems.filter((item) => item._id !== id);
        }
        newCartItems && setCartItems(newCartItems);
        localStorage.setItem(CART_KEY, cartItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
