import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Heart, ArrowRight, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    { name: "Electronics", image: "/GadgetUniverse.jpg", color: "bg-blue-50" },
    { name: "Clothing", image: "/TheFashionEdit.jpg", color: "bg-rose-50" },
    { name: "Books", image: "/TheBookNook.jpg", color: "bg-amber-50" },
    { name: "Beauty", image: "/RadiantYou.jpg", color: "bg-pink-50" },
    { name: "Groceries", image: "/Fresh&Organic.jpg", color: "bg-green-50" },
    { name: "Bikes & Cars", image: "/Speed&Precision.jpg", color: "bg-slate-50" }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false);
            setSearchTerm(""); // Clear search after navigation
        }
    };

    const userInitial = user?.displayName ? user.displayName[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : "";

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-2xl shadow-xl py-2' : 'bg-white py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center rotate-6 shadow-xl shadow-primary/30 group-hover:rotate-0 transition-transform duration-500">
                            <span className="text-white font-black text-2xl italic">O</span>
                        </div>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter hidden sm:block">OmniMart</span>
                    </Link>

                    {/* Desktop Search & Mega Menu Trigger */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-10 space-x-6">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <button className="flex items-center space-x-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-sm font-black text-slate-700 transition-all border border-slate-100 group">
                                <Menu className="w-4 h-4 text-primary group-hover:rotate-90 transition-transform duration-300" />
                                <span>Browse Store</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* MEGA MENU */}
                            <AnimatePresence>
                                {isMegaMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute left-0 mt-4 w-[850px] -translate-x-1/4 bg-white rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.15)] ring-1 ring-black/5 p-8 z-[100] border border-slate-100"
                                    >
                                        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                                            <h3 className="text-2xl font-black text-slate-900 flex items-center space-x-3">
                                                <Zap className="text-secondary w-6 h-6 fill-current" />
                                                <span>Quick Access</span>
                                            </h3>
                                            <Link to="/category/all" className="text-primary font-bold hover:underline flex items-center space-x-1">
                                                <span>View All Categories</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-3 gap-6">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.name}
                                                    to={`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                                    onClick={() => setIsMegaMenuOpen(false)}
                                                    className={`group/item relative h-40 rounded-[30px] overflow-hidden ${cat.color} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                                                >
                                                    <img
                                                        src={cat.image}
                                                        alt={cat.name}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/item:scale-110 group-hover/item:opacity-40 transition-all duration-700"
                                                    />
                                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                                        <h4 className="text-xl font-black text-slate-800 group-hover/item:text-primary transition-colors">{cat.name}</h4>
                                                        <p className="text-xs font-bold text-slate-500 group-hover/item:text-slate-700">Explore Collection</p>
                                                    </div>
                                                    <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                                        <ArrowRight className="w-5 h-5 text-primary" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <form onSubmit={handleSearch} className="flex-1 max-w-xl relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors cursor-pointer" onClick={handleSearch} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Looking for something specific?"
                                className="block w-full pl-14 pr-6 py-4 border-2 border-slate-50 rounded-[25px] bg-slate-50 text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-primary/5 focus:bg-white focus:border-primary/20 transition-all"
                            />
                        </form>
                    </div>

                    {/* Right side icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/wishlist" className="relative p-4 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-[20px] transition-all group">
                            <Heart className={`h-7 w-7 transition-transform group-hover:scale-110 ${wishlistItems.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-rose-500 text-white text-[10px] font-black rounded-full border-4 border-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative p-4 text-slate-500 hover:text-primary hover:bg-primary/5 rounded-[20px] transition-all group">
                            <ShoppingCart className="h-7 w-7 transition-transform group-hover:scale-110" />
                            {cartItems.length > 0 && (
                                <span className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-primary text-white text-[10px] font-black rounded-full border-4 border-white">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <div className="h-10 w-[2px] bg-slate-100 mx-3" />

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-3 p-1.5 pr-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                    <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center text-white font-black shadow-lg transform group-hover:scale-105 transition-all overflow-hidden">
                                        {user?.photoURL ? (
                                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            userInitial
                                        )}
                                    </div>
                                    <div className="hidden lg:block text-left">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">Account</p>
                                        <p className="text-sm font-black text-slate-900 leading-none">{user.displayName || 'User'}</p>
                                    </div>
                                </button>
                                <div className="absolute right-0 mt-4 w-60 rounded-[30px] bg-white shadow-2xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3 z-[110]">
                                    <div className="px-5 py-4 border-b border-slate-50 mb-2">
                                        <p className="text-sm font-black text-slate-900">{user.displayName || 'User'}</p>
                                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/profile" className="block px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-2xl transition-all">My Profile</Link>
                                    <Link to="/orders" className="block px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-2xl transition-all">Order History</Link>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-5 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-2xl transition-all mt-1"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="px-8 py-3.5 rounded-2xl bg-primary text-white font-black text-base hover:bg-primary-dark transition-all shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-slate-600">
                            <ShoppingCart className="h-7 w-7" />
                            {cartItems.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">{cartItems.length}</span>}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 cursor-pointer" onClick={handleSearch} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold"
                                />
                            </form>
                            <div className="grid grid-cols-2 gap-4">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        to={`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                        className="p-6 text-sm font-black text-slate-700 bg-slate-50 rounded-3xl hover:bg-primary/5 hover:text-primary transition-all text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
