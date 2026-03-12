import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, placeOrder } = useCart();
    const navigate = useNavigate();

    const handleRemove = (id, name) => {
        removeFromCart(id);
        toast.error(`${name} removed from cart`);
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-[40px] mx-auto mb-8">
                    <ShoppingBag className="w-12 h-12 text-slate-300" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Your cart is empty</h2>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 px-10 py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-primary-dark transition-all shadow-xl active:scale-95"
                >
                    <span>Start Shopping</span>
                    <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-black text-slate-900 mb-12">Shopping Cart ({cartItems.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-50">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{item.category}</p>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                                <div className="flex items-center justify-center sm:justify-start space-x-4 mb-4">
                                    <span className="text-2xl font-black text-slate-900">₹{item.price.toLocaleString()}</span>
                                    <span className="text-sm text-slate-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-200">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-2 hover:bg-white rounded-xl transition-colors text-slate-500 hover:text-primary"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-2 hover:bg-white rounded-xl transition-colors text-slate-500 hover:text-primary"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.id, item.name)}
                                    className="p-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[40px] shadow-lg border border-slate-100 sticky top-24">
                        <h2 className="text-2xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-500">FREE</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Tax Estimate</span>
                                <span>₹{(subtotal * 0.18).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-slate-100 mb-10">
                            <span className="text-lg font-bold text-slate-900">Total Price</span>
                            <span className="text-3xl font-black text-primary">₹{(subtotal + subtotal * 0.18).toLocaleString()}</span>
                        </div>

                        <button 
                            onClick={handleCheckout}
                            className="w-full py-5 premium-gradient text-white rounded-[24px] font-black text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Checkout Now
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                            Secure 256-bit SSL Encrypted Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
