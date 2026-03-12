import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { products, heroSlides } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Search, Filter, ChevronRight, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Category = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [priceRange, setPriceRange] = useState(50000);
    const [sortBy, setSortBy] = useState("relevance");
    const [activeTag, setActiveTag] = useState(null);

    // Sync search query from URL
    useEffect(() => {
        const query = searchParams.get("search");
        if (query !== null) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const displayCategoryName = useMemo(() => {
        if (!id || id === 'all' || id === 'undefined') return "All Products";
        // Map common slugs to beautiful display names
        const mapping = {
            'bikes-&-cars': 'Bikes & Cars',
            'home-&-kitchen': 'Home & Kitchen',
            'groceries': 'Fresh Groceries',
            'electronics': 'Tech & Gadgets',
            'clothing': 'Fashion & Apparel',
            'beauty': 'Beauty & Care',
            'books': 'Books & Learning'
        };
        return mapping[id] || id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }, [id]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesCategory = (!id || id === 'all' || id === 'undefined') ? true : p.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === id;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 p.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = p.price <= priceRange;
            const matchesTag = activeTag ? p.tags?.includes(activeTag) : true;
            return matchesCategory && matchesSearch && matchesPrice && matchesTag;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });
    }, [id, searchQuery, priceRange, sortBy, activeTag]);

    const tags = ["Under 99", "Under 999", "Top Rated", "New Arrival", "Best Seller", "Flash Deal"];
    const categoryKey = id?.toLowerCase();
    const categorySlides = heroSlides[categoryKey] || heroSlides.home;

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Modern Category Header */}
            {categorySlides && (
                <div className="relative pt-20 pb-12 overflow-hidden bg-slate-50">
                    {/* Background decorative blob */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

                    <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                Collection 2026
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tighter">
                                {displayCategoryName}
                            </h1>
                            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                                {categorySlides[0].subtitle}
                            </p>
                        </motion.div>

                        {/* Floating Image Pill */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="relative w-full max-w-5xl h-[400px] md:h-[500px] rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-8 border-white"
                        >
                            <img
                                src={categorySlides[0].image}
                                className="w-full h-full object-cover"
                                alt="Category Banner"
                            />
                            {/* Overlaid Badge */}
                            <div className="absolute bottom-10 left-10 p-8 bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white max-w-xs hidden md:block">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Stock</span>
                                </div>
                                <p className="text-slate-900 font-black text-lg leading-tight">Handpicked selection of premium {displayCategoryName.toLowerCase()}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 mt-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-12">
                    <Link to="/" className="hover:text-primary transition-colors font-bold">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-900 font-black">{displayCategoryName}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-10">
                        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 sticky top-32">
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="font-black text-2xl text-slate-900">Filters</h2>
                                <button
                                    onClick={() => { setSearchQuery(""); setPriceRange(50000); setActiveTag(null); }}
                                    className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Search Within */}
                            <div className="mb-10">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Search Within</label>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Color, material..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-primary/20 focus:ring-8 focus:ring-primary/5 outline-none text-sm font-bold transition-all"
                                    />
                                </div>
                            </div>

                            {/* Quick Filter Pills */}
                            <div className="mb-10">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Trending Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                            className={`px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border-2 ${activeTag === tag ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-slate-100 text-slate-600 hover:border-primary/20'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price Point</label>
                                    <span className="text-sm font-black text-primary">₹{priceRange.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="500"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                                    <span>₹0</span>
                                    <span>₹50,000+</span>
                                </div>
                            </div>

                            {/* Sorting */}
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Order By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none text-sm font-black text-slate-700 focus:border-primary/20 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="relevance">Popularity</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">User Rating</option>
                                </select>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-8">
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 mb-2">{displayCategoryName}</h1>
                                <p className="text-slate-400 font-bold text-sm">Showing {filteredProducts.length} curated pieces</p>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10"
                            >
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        key={product.id}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="py-32 text-center bg-slate-50 rounded-[50px] border-2 border-dashed border-slate-100">
                                <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                                <h3 className="text-3xl font-black text-slate-900 mb-3">No matches found</h3>
                                <p className="text-slate-500 font-bold mb-10 max-w-sm mx-auto">We couldn't find any products matching your current filters. Try broadening your search.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setPriceRange(50000); setActiveTag(null); }}
                                    className="px-10 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Category;
