import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { products, heroSlides, categoryData } from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = heroSlides.home;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const trendingProducts = products.filter(p => p.isTrending);
    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-slate-50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex flex-col md:flex-row items-center"
                    >
                        {/* Image Side - Takes full width on mobile, 60% on desktop */}
                        <div className="absolute inset-0 md:relative md:w-3/5 h-full overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 10, ease: "easeOut" }}
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle gradient to blend into the content side on desktop */}
                            <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-slate-50" />
                        </div>

                        {/* Content Side - Floating on mobile, Static on desktop */}
                        <div className="absolute inset-0 md:relative md:w-2/5 h-full flex items-center justify-center md:justify-start px-6 md:px-12 z-10 bg-black/10 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-0">
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                className="bg-white/90 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/50 max-w-lg"
                            >
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className={`inline-block px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 bg-gradient-to-r ${slides[currentSlide].color} text-white shadow-lg`}
                                >
                                    New Collection
                                </motion.span>
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter"
                                >
                                    {slides[currentSlide].title}
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-lg text-slate-500 font-medium mb-10 leading-relaxed"
                                >
                                    {slides[currentSlide].subtitle}
                                </motion.p>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="flex items-center space-x-4"
                                >
                                    <Link to="/products" className="group px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-primary transition-all flex items-center space-x-3 shadow-xl hover:shadow-primary/20 active:scale-95">
                                        <span>Shop Now</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-4 border-white bg-primary flex items-center justify-center text-[10px] text-white font-black shadow-sm">+10k</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-1/2 md:left-auto md:right-12 -translate-x-1/2 md:translate-x-0 flex space-x-3 z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-2 transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-12 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="hidden md:flex absolute bottom-10 left-12 space-x-4 z-20">
                    <button onClick={prevSlide} className="p-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl shadow-lg border border-slate-100 transition-all active:scale-95">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextSlide} className="p-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl shadow-lg border border-slate-100 transition-all active:scale-95">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-12 bg-white -mt-10 relative z-10 max-w-6xl mx-auto rounded-3xl shadow-xl flex flex-wrap justify-around items-center px-4 gap-8">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-50 text-primary rounded-2xl"><Truck className="w-6 h-6" /></div>
                    <div><p className="font-bold text-slate-900">Free Shipping</p><p className="text-xs text-slate-500">On orders over ₹999</p></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-50 text-secondary rounded-2xl"><ShieldCheck className="w-6 h-6" /></div>
                    <div><p className="font-bold text-slate-900">Secure Payment</p><p className="text-xs text-slate-500">100% protected</p></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 text-accent rounded-2xl"><RefreshCw className="w-6 h-6" /></div>
                    <div><p className="font-bold text-slate-900">Easy Returns</p><p className="text-xs text-slate-500">30-day return policy</p></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Zap className="w-6 h-6" /></div>
                    <div><p className="font-bold text-slate-900">Flash Deals</p><p className="text-xs text-slate-500">Every 24 hours</p></div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 mb-2">Shop by Category</h2>
                        <p className="text-slate-500 font-medium">Find exactly what you're looking for</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.slice(0, 4).map((cat, idx) => (
                        <Link
                            key={cat}
                            to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            className="group relative h-64 rounded-3xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300"
                        >
                            <img
                                src={categoryData[cat]?.image || `https://i.pinimg.com/564x/0${idx + 1}/a2/b3/0${idx + 1}a2b33a3b90b83e60a37e8c3a2a9c3b.jpg`}
                                alt={cat}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white text-center">
                                <h3 className="text-2xl font-black mb-1">{cat}</h3>
                                <p className="text-sm opacity-80 font-medium group-hover:underline">Explore More</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Trending Products */}
            <section className="bg-white py-20 border-t border-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-2">Trending Now</h2>
                            <p className="text-slate-500 font-medium">Most loved products this week</p>
                        </div>
                        <Link to="/products" className="group flex items-center space-x-2 text-primary font-bold hover:underline">
                            <span>View All</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trendingProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Infinite Category Slider (Premium Redesign) */}
            <section className="py-24 bg-white overflow-hidden relative border-t border-slate-50">
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[150px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 mb-16 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4">Curated Selections</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Explore All Collections</h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">Browse through our wide variety of premium categories meticulously crafted for your lifestyle</p>
                    </motion.div>
                </div>

                <div className="relative flex overflow-x-hidden group">
                    <motion.div
                        animate={{ x: [0, -1920] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                        className="flex whitespace-nowrap py-12"
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {[...categories, ...categories, ...categories].map((cat, idx) => (
                            <Link
                                key={`${cat}-${idx}`}
                                to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                className="inline-flex flex-col mx-4 group/cat relative"
                            >
                                <motion.div
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    className="w-64 h-80 bg-white rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 overflow-hidden transition-all duration-500 relative group-hover/cat:shadow-[0_40px_80px_rgba(0,0,0,0.12)] p-2"
                                >
                                    {/* Thematic Background Glow */}
                                    <div className={`absolute inset-0 opacity-0 group-hover/cat:opacity-20 transition-opacity duration-500 ${categoryData[cat]?.color || 'bg-slate-50'}`} />

                                    <div className="w-full h-2/3 rounded-[40px] overflow-hidden relative">
                                        <img
                                            src={categoryData[cat]?.image || `https://i.pinimg.com/564x/0${(idx % 6) + 1}/a2/b3/0${(idx % 6) + 1}a2b33a3b90b83e60a37e8c3a2a9c3b.jpg`}
                                            className="w-full h-full object-cover transform group-hover/cat:scale-110 transition-transform duration-700"
                                            alt={cat}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    <div className="h-1/3 flex flex-col items-center justify-center space-y-2 relative z-10">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${categoryData[cat]?.iconColor || 'text-slate-400'}`}>Collection</span>
                                        <span className="text-xl font-black text-slate-800 tracking-tighter group-hover/cat:text-primary transition-colors">{cat}</span>
                                        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                                            <span>Explore More</span>
                                            <ArrowRight className="w-3 h-3 group-hover/cat:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom Floating Shadow Element */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-black/5 blur-xl rounded-full scale-x-0 group-hover/cat:scale-x-100 transition-transform duration-500" />
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
