import React from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isWishlisted = isInWishlist(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className={`absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2.5 rounded-full shadow-lg z-10 transition-all active:scale-95 ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500'}`}
                >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary hover:text-white transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary hover:text-white transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                        <Eye className="w-5 h-5" />
                    </button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1.5 sm:gap-2">
                    {discount > 0 && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                            {discount}% OFF
                        </span>
                    )}
                    {product.isTrending && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-accent text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg">
                            TRENDING
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-5">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">
                    {product.category}
                </p>
                <h3 className="text-slate-900 font-bold text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                    <div className="flex items-center text-accent">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                        <span className="ml-1 text-[10px] sm:text-sm font-bold text-slate-700">{product.rating}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="text-[9px] sm:text-xs text-slate-500">{product.reviews} reviews</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-0">
                    <div className="flex flex-col">
                        <span className="text-lg sm:text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-[10px] sm:text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-50 text-primary text-xs sm:text-sm font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all active:scale-95 text-center"
                    >
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
