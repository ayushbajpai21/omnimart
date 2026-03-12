import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronRight, MapPin, CreditCard, CheckCircle2, 
    ArrowLeft, Loader2, Landmark, Truck, ShieldCheck 
} from "lucide-react";
import toast from "react-hot-toast";

const Checkout = () => {
    const [step, setStep] = useState(1);
    const { cartItems, subtotal, placeOrder } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        paymentMethod: "card",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && step !== 5) {
            navigate("/cart");
        }
        if (!user) {
            toast.error("Please login to checkout");
            navigate("/login");
        }
    }, [cartItems, navigate, user, step]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleProcessPayment = () => {
        setIsProcessing(true);
        // Simulate real processing delay
        setTimeout(() => {
            const orderId = placeOrder(user.uid, {
                shippingDetails: {
                    fullName: formData.fullName,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode,
                    phone: formData.phone
                },
                paymentMethod: formData.paymentMethod
            });
            
            if (orderId) {
                setIsProcessing(false);
                setStep(5);
                toast.success("Order Placed Successfully!");
            }
        }, 3000);
    };

    const steps = [
        { id: 1, title: "Shipping", icon: MapPin },
        { id: 2, title: "Payment", icon: CreditCard },
        { id: 3, title: "Verification", icon: ShieldCheck },
        { id: 4, title: "Review", icon: CheckCircle2 }
    ];

    const totalPrice = subtotal + subtotal * 0.18;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                {step < 5 && (
                    <div className="mb-12">
                        <div className="flex justify-between items-center relative">
                            {steps.map((s, idx) => (
                                <React.Fragment key={s.id}>
                                    <div className="flex flex-col items-center z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                            step >= s.id ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-white text-slate-400 border border-slate-200'
                                        }`}>
                                            <s.icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${
                                            step >= s.id ? 'text-primary' : 'text-slate-400'
                                        }`}>{s.title}</span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className="flex-1 h-0.5 mx-4 bg-slate-200 relative overflow-hidden">
                                            <motion.div 
                                                className="absolute inset-0 bg-primary origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: step > s.id ? 1 : 0 }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {/* Step 1: Shipping Address */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center space-x-3">
                                <div className="p-3 bg-indigo-50 text-primary rounded-2xl"><Truck className="w-6 h-6" /></div>
                                <span>Shipping Address</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                                    <input 
                                        name="fullName" value={formData.fullName} onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                    <input 
                                        name="phone" value={formData.phone} onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Full Address</label>
                                    <textarea 
                                        name="address" value={formData.address} onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="Building, Street, Area"
                                        rows="3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">City</label>
                                    <input 
                                        name="city" value={formData.city} onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="Mumbai"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Zip Code</label>
                                    <input 
                                        name="zipCode" value={formData.zipCode} onChange={handleInputChange}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        placeholder="400001"
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={nextStep}
                                disabled={!formData.fullName || !formData.address || !formData.phone}
                                className="w-full mt-12 py-5 bg-primary text-white rounded-[24px] font-black text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center space-x-3"
                            >
                                <span>Continue to Payment</span>
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Payment Method */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center space-x-3">
                                <div className="p-3 bg-rose-50 text-secondary rounded-2xl"><CreditCard className="w-6 h-6" /></div>
                                <span>Payment Method</span>
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { id: 'card', title: 'Credit / Debit Card', icon: CreditCard, desc: 'Secure payment via SSL encrypted portal' },
                                    { id: 'upi', title: 'UPI / QR Code', icon: Landmark, desc: 'Pay instantly using GooglePay or PhonePe' },
                                    { id: 'cod', title: 'Cash on Delivery', icon: Truck, desc: 'Pay when your package arrives' },
                                ].map((method) => (
                                    <div 
                                        key={method.id}
                                        onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                                        className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center space-x-6 ${
                                            formData.paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                                        }`}
                                    >
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                                            formData.paymentMethod === method.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            <method.icon className="w-7 h-7" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-slate-900">{method.title}</p>
                                            <p className="text-xs text-slate-400 font-bold">{method.desc}</p>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            formData.paymentMethod === method.id ? 'border-primary' : 'border-slate-200'
                                        }`}>
                                            {formData.paymentMethod === method.id && <div className="w-3 h-3 bg-primary rounded-full" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-4 mt-12">
                                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[24px] font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center space-x-2">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back</span>
                                </button>
                                <button 
                                    onClick={nextStep}
                                    className="flex-[2] py-5 bg-primary text-white rounded-[24px] font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
                                >
                                    <span>Continue</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Card Details or Summary */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100"
                        >
                            {formData.paymentMethod === 'card' ? (
                                <>
                                    <h2 className="text-3xl font-black text-slate-900 mb-8">Card Information</h2>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Cardholder Name</label>
                                            <input 
                                                name="cardName" value={formData.cardName} onChange={handleInputChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Card Number</label>
                                            <input 
                                                name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Expiry (MM/YY)</label>
                                                <input 
                                                    name="expiry" value={formData.expiry} onChange={handleInputChange}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                                    placeholder="12/28"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">CVV</label>
                                                <input 
                                                    name="cvv" value={formData.cvv} onChange={handleInputChange}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                                    placeholder="•••"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-4">Secure Verification</h2>
                                    <p className="text-slate-500 font-medium">Ready to confirm your order with {formData.paymentMethod.toUpperCase()}</p>
                                </div>
                            )}
                            <div className="flex space-x-4 mt-12">
                                <button onClick={prevStep} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[24px] font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center space-x-2">
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back</span>
                                </button>
                                <button 
                                    onClick={nextStep}
                                    className="flex-[2] py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2"
                                >
                                    <span>Review Order</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Final Review */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-slate-100"
                        >
                            <h2 className="text-3xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6">Final Summary</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Deliver To</p>
                                        <div className="p-4 bg-slate-50 rounded-2xl">
                                            <p className="font-bold text-slate-900">{formData.fullName}</p>
                                            <p className="text-sm text-slate-500">{formData.address}</p>
                                            <p className="text-sm text-slate-500">{formData.city} - {formData.zipCode}</p>
                                            <p className="text-sm text-slate-500">{formData.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Payment</p>
                                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center space-x-3">
                                            {formData.paymentMethod === 'card' && <CreditCard className="w-5 h-5 text-primary" />}
                                            {formData.paymentMethod === 'upi' && <Landmark className="w-5 h-5 text-primary" />}
                                            {formData.paymentMethod === 'cod' && <Truck className="w-5 h-5 text-primary" />}
                                            <p className="font-bold text-slate-900 capitalize">{formData.paymentMethod} Payment</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price Breakdown</p>
                                    <div className="flex justify-between text-slate-500 font-bold">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-bold">
                                        <span>GST (18%)</span>
                                        <span>₹{(subtotal * 0.18).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-500 font-bold pt-4 border-t border-slate-50">
                                        <span>Delivery Fee</span>
                                        <span>FREE</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-900 p-6 rounded-[24px] text-white mt-6">
                                        <span className="font-black">Total Payable</span>
                                        <span className="text-2xl font-black">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleProcessPayment}
                                disabled={isProcessing}
                                className="w-full mt-12 py-5 premium-gradient text-white rounded-[24px] font-black text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:scale-100"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Processing Transaction...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Complete Order</span>
                                        <ShieldCheck className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {/* Step 5: Success State */}
                    {step === 5 && (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-12 md:p-20 rounded-[50px] shadow-2xl border border-slate-100 text-center"
                        >
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[30px] flex items-center justify-center mx-auto mb-10 rotate-12">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Cheers! It's Ordered.</h2>
                            <p className="text-lg text-slate-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed">
                                We've received your order and our elite team is already preparing your package.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => navigate("/orders")}
                                    className="py-5 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-black transition-all shadow-xl"
                                >
                                    Track Order
                                </button>
                                <button 
                                    onClick={() => navigate("/")}
                                    className="py-5 bg-white border border-slate-100 text-slate-700 rounded-3xl font-black text-lg hover:bg-slate-50 transition-all font-bold"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Checkout;
