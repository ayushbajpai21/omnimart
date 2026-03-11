import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const { wishlistItems } = useWishlist();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">My Wishlist</h1>
                        <p className="text-slate-500 font-medium">Items you've saved for later</p>
                    </div>
                    <div className="flex items-center space-x-2 text-primary font-bold">
                        <Heart className="w-5 h-5 fill-current" />
                        <span>{wishlistItems.length} Items</span>
                    </div>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] p-20 text-center shadow-sm border border-slate-100">
                        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart className="w-12 h-12 text-secondary" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium leading-relaxed">
                            Looks like you haven't added anything to your wishlist yet.
                            Explore our products and find something you love!
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl active:scale-95"
                        >
                            <span>Start Shopping</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
