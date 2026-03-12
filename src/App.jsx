import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";

import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, Phone, MapPin } from "lucide-react";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-white">
              <Toaster position="bottom-right" />
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Category />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </main>

              {/* Professional Footer */}
              <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center rotate-6 shadow-2xl">
                        <span className="text-primary font-black text-2xl italic">O</span>
                      </div>
                      <span className="text-3xl font-black text-white tracking-tighter">OmniMart</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-base">
                      Experience the future of shopping with OmniMart. We bring the world's finest products to your doorstep with unmatched style and speed.
                    </p>
                    <div className="flex space-x-5">
                      {[
                        { icon: Facebook, color: "hover:bg-blue-600" },
                        { icon: Twitter, color: "hover:bg-sky-500" },
                        { icon: Instagram, color: "hover:bg-pink-600" },
                        { icon: Linkedin, color: "hover:bg-blue-700" }
                      ].map((social, idx) => (
                        <div
                          key={idx}
                          className={`w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 ${social.color} hover:text-white hover:-translate-y-2 cursor-pointer transition-all duration-300 shadow-lg`}
                        >
                          <social.icon className="w-5 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Explore Shop</h4>
                    <ul className="space-y-4 text-slate-400 font-bold text-sm">
                      {[
                        { name: 'Men\'s Fashion', path: '/category/clothing' },
                        { name: 'Women\'s Fashion', path: '/category/clothing' },
                        { name: 'Electronics', path: '/category/electronics' },
                        { name: 'Home & Kitchen', path: '/category/home-&-kitchen' },
                        { name: 'Bikes & Cars', path: '/category/bikes-&-cars' }
                      ].map(item => (
                        <li key={item.name}>
                          <Link to={item.path} className="flex items-center space-x-2 group cursor-pointer hover:text-primary transition-colors">
                            <div className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-primary transition-colors" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">Get in Touch</h4>
                    <ul className="space-y-5 text-slate-400 font-bold text-sm">
                      <li className="flex items-center space-x-4">
                        <div className="p-2.5 bg-slate-800 rounded-xl text-primary"><MapPin className="w-4 h-4" /></div>
                        <span>123 Tech Avenue, Digital City</span>
                      </li>
                      <li className="flex items-center space-x-4">
                        <div className="p-2.5 bg-slate-800 rounded-xl text-primary"><Phone className="w-4 h-4" /></div>
                        <span>+1 (234) 567-890</span>
                      </li>
                      <li className="flex items-center space-x-4">
                        <div className="p-2.5 bg-slate-800 rounded-xl text-primary"><Mail className="w-4 h-4" /></div>
                        <span>hello@omnimart.com</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-xs">The Insider</h4>
                    <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">Join our inner circle for early access to drops and exclusive style guides.</p>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-slate-800 border-2 border-slate-700 rounded-[20px] pl-6 pr-14 py-4 outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/10 transition-all text-sm font-bold text-white placeholder-slate-500"
                      />
                      <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary hover:bg-primary-dark text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-primary/20 active:scale-90 group-focus-within:rotate-12">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs font-black tracking-widest relative z-10">
                  <p className="uppercase">&copy; 2026 OMNIMART CLOUD. ALL RIGHTS RESERVED.</p>
                  <div className="flex items-center space-x-10 mt-6 md:mt-0">
                    <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
                    <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
                    <span className="hover:text-white cursor-pointer transition-colors">SHIPPING</span>
                  </div>
                </div>
              </footer>
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
