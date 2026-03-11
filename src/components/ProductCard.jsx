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
                    className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg z-10 transition-all active:scale-95 ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500'}`}
                >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
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
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount > 0 && (
                        <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full shadow-lg">
                            {discount}% OFF
                        </span>
                    )}
                    {product.isTrending && (
                        <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
                            TRENDING
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {product.category}
                </p>
                <h3 className="text-slate-900 font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center text-accent">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-bold text-slate-700">{product.rating}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-500">{product.reviews} reviews</span>
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 bg-slate-50 text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-all active:scale-95"
                    >
                        Add
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
