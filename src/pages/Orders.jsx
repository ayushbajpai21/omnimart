import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { 
    ShoppingBag, ChevronRight, Package, Calendar, 
    CreditCard, MapPin, Truck, Landmark, Info
} from "lucide-react";

const Orders = () => {
    const { orders } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    // Filter orders for the current user
    const userOrders = orders.filter(order => order.userId === user?.uid);

    if (userOrders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-[40px] mx-auto mb-8">
                    <Package className="w-12 h-12 text-slate-300" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">No orders yet</h2>
                <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg">
                    When you place an order, it will appear here.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 px-10 py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-primary-dark transition-all shadow-xl active:scale-95"
                >
                    <span>Start Shopping</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Order History</h1>
                    <p className="text-slate-500 font-medium text-lg">Manage and track your recent purchases</p>
                </div>
                <div className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-slate-500 font-bold mr-2 uppercase tracking-widest text-xs">Total Orders:</span>
                    <span className="text-xl font-black text-slate-900">{userOrders.length}</span>
                </div>
            </div>

            <div className="space-y-12">
                {userOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                        {/* Order Header */}
                        <div className="bg-slate-50/50 p-6 md:p-8 border-b border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="flex items-center text-slate-400 font-bold uppercase tracking-[0.15em] text-[10px] mb-2">
                                    <Calendar className="w-3 h-3 mr-1.5" />
                                    Order Date
                                </div>
                                <p className="text-slate-900 font-black">
                                    {new Date(order.date).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center text-slate-400 font-bold uppercase tracking-[0.15em] text-[10px] mb-2">
                                    <CreditCard className="w-3 h-3 mr-1.5" />
                                    Total Amount
                                </div>
                                <p className="text-primary font-black">₹{order.total.toLocaleString()}</p>
                            </div>
                            <div>
                                <div className="flex items-center text-slate-400 font-bold uppercase tracking-[0.15em] text-[10px] mb-2">
                                    <Package className="w-3 h-3 mr-1.5" />
                                    Order ID
                                </div>
                                <p className="text-slate-900 font-bold text-sm truncate">#{order.id.split('_')[1]}</p>
                            </div>
                            <div className="flex items-center justify-end">
                                <span className="px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest">
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Items & Details */}
                        <div className="p-6 md:p-10">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Items List */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Package className="w-5 h-5 text-primary" />
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Ordered Items</h4>
                                    </div>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6 group">
                                            <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">{item.name}</h4>
                                                <p className="text-slate-500 font-bold text-sm">Quantity: {item.quantity}</p>
                                                <p className="text-primary font-black mt-1">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shipping & Payment Details */}
                                <div className="lg:col-span-1 space-y-8">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Delivery Details</h4>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="font-black text-slate-900 mb-1">{order.shippingDetails?.fullName}</p>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                                {order.shippingDetails?.address}<br />
                                                {order.shippingDetails?.city} - {order.shippingDetails?.zipCode}<br />
                                                Contact: {order.shippingDetails?.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Info className="w-5 h-5 text-primary" />
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Transaction Info</h4>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                                {order.paymentMethod === 'card' && <CreditCard className="w-6 h-6" />}
                                                {order.paymentMethod === 'upi' && <Landmark className="w-6 h-6" />}
                                                {order.paymentMethod === 'cod' && <Truck className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-400 mb-0.5 uppercase tracking-tighter">Method</p>
                                                <p className="font-black text-slate-900 capitalize">{order.paymentMethod || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
