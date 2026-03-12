import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("omnimart_orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("omnimart_orders", JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const placeOrder = (userId, orderDetails) => {
        if (cartItems.length === 0) return;
        
        const newOrder = {
            id: `ORD_${Date.now()}`,
            userId: userId,
            items: [...cartItems],
            subtotal: subtotal,
            tax: subtotal * 0.18,
            total: subtotal + subtotal * 0.18,
            date: new Date().toISOString(),
            status: 'Processing',
            shippingDetails: orderDetails.shippingDetails,
            paymentMethod: orderDetails.paymentMethod,
        };

        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder.id;
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const value = {
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        subtotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
