export const products = [
    // --- CLOTHING (MEN) ---
    { id: 1, name: "Premium Cotton Blue Shirt", category: "Clothing", subCategory: "Men", price: 999, originalPrice: 1499, rating: 4.5, reviews: 1200, image: "/blueshirt.jpg", description: "High-quality 100% cotton blue shirt for daily wear.", isTrending: true, tags: ["Under 999", "Top Rated"] },
    { id: 2, name: "Classic Denim Jacket", category: "Clothing", subCategory: "Men", price: 2499, originalPrice: 3999, rating: 4.7, reviews: 800, image: "/ClassicDenimJacket.jpg", description: "Vintage washed denim jacket for a rugged look.", tags: ["Best Seller"] },
    { id: 3, name: "Slim Fit Chinos - Olive", category: "Clothing", subCategory: "Men", price: 1299, originalPrice: 1999, rating: 4.4, reviews: 450, image: "/SlimFitChinosOlive.jpg", description: "Comfortable slim fit chinos for casual outings.", tags: ["Under 1499"] },
    { id: 4, name: "Linen Summer Shirt", category: "Clothing", subCategory: "Men", price: 1599, originalPrice: 2299, rating: 4.6, reviews: 300, image: "/LinenSummerShirt.jpg", description: "Breathable linen shirt perfect for hot weather.", tags: ["New Arrival"] },
    { id: 5, name: "Oxford Button-Down Shirt", category: "Clothing", subCategory: "Men", price: 1799, originalPrice: 2599, rating: 4.5, reviews: 670, image: "/OxfordButtonDownShirt.jpg", description: "Crisp Oxford shirt for a smart-casual look.", tags: ["Top Rated"] },
    { id: 6, name: "Heavyweight Boxy Hoodie", category: "Clothing", subCategory: "Men", price: 2999, originalPrice: 4499, rating: 4.8, reviews: 950, image: "/HeavyweightBoxyHoodie.jpg", description: "Premium oversized hoodie with fleece lining.", tags: ["Trending"] },
    { id: 7, name: "Structured Overcoat - Camel", category: "Clothing", subCategory: "Men", price: 7999, originalPrice: 11999, rating: 4.9, reviews: 150, image: "/StructuredOvercoatCamel.jpg", description: "Sophisticated wool blend overcoat for winter.", tags: ["Premium"] },
    { id: 8, name: "Relaxed Fit Cargo Pants", category: "Clothing", subCategory: "Men", price: 1899, originalPrice: 2799, rating: 4.5, reviews: 340, image: "/RelaxedFitCargoPants.jpg", description: "Functional cargo pants with multiple pockets.", tags: ["Under 1999"] },
    { id: 9, name: "Quilted Puffer Jacket", category: "Clothing", subCategory: "Men", price: 3999, originalPrice: 5999, rating: 4.7, reviews: 220, image: "/QuiltedPufferJacket.jpg", description: "Insulated puffer jacket for extreme cold.", tags: ["Best Seller"] },
    { id: 10, name: "Casual Striped Polo", category: "Clothing", subCategory: "Men", price: 1199, originalPrice: 1799, rating: 4.3, reviews: 180, image: "/CasualStripedPolo.jpg", description: "Classic striped polo shirt for weekend wear.", tags: ["Top Rated"] },

    // --- CLOTHING (WOMEN) ---
    { id: 11, name: "Designer Floral Kurti", category: "Clothing", subCategory: "Women", price: 1299, originalPrice: 1999, rating: 4.6, reviews: 1400, image: "/DesignerFloralKurti.jpg", description: "Elegant floral print kurti for festive occasions.", isTrending: true, tags: ["Aesthetic", "Top Rated"] },
    { id: 12, name: "Satin Evening Gown", category: "Clothing", subCategory: "Women", price: 4999, originalPrice: 7999, rating: 4.9, reviews: 120, image: "/SatinEveningGown.jpg", description: "Luxurious satin gown for special evenings.", tags: ["Premium"] },
    { id: 13, name: "Silk Wrap Dress", category: "Clothing", subCategory: "Women", price: 3499, originalPrice: 5499, rating: 4.7, reviews: 320, image: "/SilkWrapDress.jpg", description: "Graceful silk wrap dress for any occasion.", tags: ["Best Seller"] },
    { id: 14, name: "Leather Biker Jacket", category: "Clothing", subCategory: "Women", price: 5999, originalPrice: 8999, rating: 4.8, reviews: 180, image: "/LeatherBikerJacket.jpg", description: "Genuine leather jacket for an edgy look.", tags: ["Premium"] },
    { id: 15, name: "Boho Maxi Skirt", category: "Clothing", subCategory: "Women", price: 1599, originalPrice: 2299, rating: 4.5, reviews: 450, image: "/BohoMaxiSkirt.jpg", description: "Flowy bohemian style maxi skirt.", tags: ["New Arrival"] },
    { id: 16, name: "Tailored Blazer - White", category: "Clothing", subCategory: "Women", price: 2999, originalPrice: 4499, rating: 4.8, reviews: 280, image: "/TailoredBlazerWhite.jpg", description: "Sharp tailored blazer for professional settings.", tags: ["Under 2999"] },
    { id: 17, name: "Pleated Midi Dress", category: "Clothing", subCategory: "Women", price: 2499, originalPrice: 3899, rating: 4.6, reviews: 120, image: "/PleatedMidiDress.jpg", description: "Elegant pleated dress with a cinched waist.", tags: ["Top Rated"] },

    // --- ELECTRONICS ---
    { id: 401, name: "iPhone 15 Pro - Titanium", category: "Electronics", subCategory: "Phones", price: 129900, originalPrice: 134900, rating: 4.9, reviews: 12400, image: "/iPhone15ProTitanium.jpg", description: "The most powerful iPhone ever with titanium design.", isTrending: true, tags: ["Premium", "Tech"] },
    { id: 402, name: "Samsung Galaxy S24 Ultra", category: "Electronics", subCategory: "Phones", price: 119900, originalPrice: 129900, rating: 4.8, reviews: 8900, image: "/SamsungGalaxyS24Ultra.jpg", description: "AI-integrated flagship with 200MP camera.", tags: ["Top Rated"] },
    { id: 403, name: "Google Pixel 8 Pro", category: "Electronics", subCategory: "Phones", price: 99900, originalPrice: 106900, rating: 4.7, reviews: 4500, image: "/GooglePixel8Pro.jpg", description: "Smartest Pixel with pro-level camera features.", tags: ["Android Choice"] },
    { id: 404, name: "OnePlus 12 - Emerald Forest", category: "Electronics", subCategory: "Phones", price: 64999, originalPrice: 69999, rating: 4.6, reviews: 2100, image: "/OnePlus12EmeraldForest.jpg", description: "Fast and smooth with Hasselblad camera.", tags: ["Performance"] },
    { id: 405, name: "MacBook Air M3 - 13 inch", category: "Electronics", subCategory: "Laptops", price: 114900, originalPrice: 119900, rating: 4.9, reviews: 3200, image: "/MacBookAirM313inch.jpg", description: "Strikingly thin and fast with the M3 chip.", tags: ["Premium"] },
    { id: 406, name: "Sony WH-1000XM5", category: "Electronics", subCategory: "Audio", price: 29900, originalPrice: 34900, rating: 4.9, reviews: 8400, image: "/SonyWH1000XM5.jpg", description: "Industry-leading noise cancellation headphones.", tags: ["Top Rated"] },
    { id: 407, name: "Nintendo Switch OLED", category: "Electronics", subCategory: "Gaming", price: 32900, originalPrice: 35000, rating: 4.8, reviews: 15400, image: "/NintendoSwitchOLED.jpg", description: "Vibrant OLED screen for handheld gaming.", tags: ["Best Seller"] },
    { id: 408, name: "Logitech MX Master 3S", category: "Electronics", subCategory: "Peripherals", price: 9999, originalPrice: 11999, rating: 4.9, reviews: 5200, image: "/LogitechMXMaster3S.jpg", description: "The ultimate productivity mouse.", tags: ["Tech Choice"] },

    // --- GROCERIES ---
    { id: 701, name: "Organic Fresh Milk - 1L", category: "Groceries", subCategory: "Dairy", price: 65, originalPrice: 80, rating: 4.8, reviews: 5000, image: "/OrganicFreshMilk1l.jpg", description: "Pure organic farm fresh milk.", isTrending: true, tags: ["Flash Deal", "Under 99"] },
    { id: 702, name: "Organic Avocado Pack", category: "Groceries", subCategory: "Fresh Produce", price: 299, originalPrice: 450, rating: 4.7, reviews: 800, image: "/OrganicAvocadoPack.jpg", description: "Creamy Hass avocados for your morning toast.", tags: ["Healthy", "Organic"] },
    { id: 703, name: "Premium Sourdough Bread", category: "Groceries", subCategory: "Bakery", price: 149, originalPrice: 199, rating: 4.9, reviews: 450, image: "/PremiumSourdoughBread.jpg", description: "Freshly baked sourdough from artisanal bakeries.", tags: ["Freshly Baked"] },
    { id: 704, name: "Exotic Dragon Fruit", category: "Groceries", subCategory: "Fresh Produce", price: 180, originalPrice: 220, rating: 4.6, reviews: 120, image: "/ExoticDragonFruit.jpg", description: "Vibrant and nutrient-rich dragon fruit.", tags: ["Exotic"] },
    { id: 705, name: "Blueberry Bliss Granola", category: "Groceries", subCategory: "Breakfast", price: 499, originalPrice: 650, rating: 4.8, reviews: 340, image: "/BlueberryBlissGranola.jpg", description: "Crispy granola with dried blueberries and almonds.", tags: ["Under 999"] },
    { id: 706, name: "Almond Milk - Unsweetened", category: "Groceries", subCategory: "Dairy", price: 250, originalPrice: 320, rating: 4.7, reviews: 1200, image: "/AlmondMilkUnsweetened.jpg", description: "Dairy-free alternative made from premium almonds.", tags: ["Organic"] },

    // --- BEAUTY ---
    { id: 1101, name: "Matte Lipstick - Crimson Red", category: "Beauty", subCategory: "Makeup", price: 899, originalPrice: 1299, rating: 4.7, reviews: 3200, image: "/MatteLipstickCrimsonRed.jpg", description: "Long-lasting matte finish lipstick.", tags: ["Top Rated"] },
    { id: 1102, name: "Hyaluronic Acid Serum", category: "Beauty", subCategory: "Skincare", price: 1499, originalPrice: 1999, rating: 4.8, reviews: 5400, image: "/HyaluronicAcidSerum.jpg", description: "Hydrating serum for glowing skin.", tags: ["Best Seller"] },
    { id: 1103, name: "L'Eclat Perfume - 50ml", category: "Beauty", subCategory: "Fragrance", price: 4500, originalPrice: 6500, rating: 4.9, reviews: 120, image: "/L'EclatPerfume50ml.jpg", description: "Floral and woody signature scent.", tags: ["Premium"] },
    { id: 1104, name: "Rose Water Toner", category: "Beauty", subCategory: "Skincare", price: 499, originalPrice: 699, rating: 4.6, reviews: 890, image: "/RoseWaterTone.jpg", description: "Refreshing natural rose water for all skin types.", tags: ["Aesthetic"] },

    // --- BOOKS ---
    { id: 1201, name: "The Art of Living - Hardcover", category: "Books", subCategory: "Self-Help", price: 450, originalPrice: 599, rating: 4.7, reviews: 3200, image: "/TheArtofLivingHardcover.jpg", description: "A profound guide to personal growth and mindfulness.", tags: ["Best Seller"] },
    { id: 1202, name: "Atomic Habits - James Clear", category: "Books", subCategory: "Self-Help", price: 599, originalPrice: 799, rating: 4.9, reviews: 15400, image: "/AtomicHabitsJamesClear.jpg", description: "An easy & proven way to build good habits.", tags: ["Must Read"] },
    { id: 1203, name: "Ikigai - Japanese Secret", category: "Books", subCategory: "Self-Help", price: 399, originalPrice: 550, rating: 4.8, reviews: 12000, image: "/IkigaiJapaneseSecret.jpg", description: "Finding your purpose for a long and happy life.", tags: ["Top Rated"] },

    // --- BIKES & CARS ---
    { id: 1301, name: "Royal Enfield 350 Model", category: "Bikes & Cars", subCategory: "Diecast", price: 1999, originalPrice: 2499, rating: 4.8, reviews: 450, image: "/RoyalEnfield350Model.jpg", description: "Highly detailed 1:12 scale bike model.", tags: ["Collector"] },
    { id: 1302, name: "Tesla Model S Miniature", category: "Bikes & Cars", subCategory: "Diecast", price: 2499, originalPrice: 3499, rating: 4.7, reviews: 210, image: "/TeslaModelSMiniature.jpg", description: "Precise miniature of the electric flagship.", tags: ["Collector"] },
    { id: 1303, name: "Harley Davidson Fat Boy", category: "Bikes & Cars", subCategory: "Diecast", price: 2999, originalPrice: 4200, rating: 4.9, reviews: 150, image: "/HarleyDavidsonFatBoy.jpg", description: "The iconic American cruiser in miniature form.", tags: ["Premium"] }
];

export const heroSlides = {
    home: [
        { id: 1, title: "Omni Store Carnival", subtitle: "Everything you need under one roof", image: "/OmniStoreCarnival.jpg", color: "from-indigo-600 to-blue-500" },
        { id: 2, title: "Aesthetic Living", subtitle: "Find the beauty in every corner", image: "/AestheticLiving.jpg", color: "from-purple-600 to-pink-500" }
    ],
    electronics: [{ id: 1, title: "Gadget Universe", subtitle: "Upgrade to the Latest Tech", image: "/GadgetUniverse.jpg", color: "from-blue-700 to-cyan-500" }],
    clothing: [{ id: 1, title: "The Fashion Edit", subtitle: "Latest Trends for Men & Women", image: "/TheFashionEdit.jpg", color: "from-rose-600 to-indigo-500" }],
    groceries: [{ id: 1, title: "Fresh & Organic", subtitle: "Premium Groceries in 10 Minutes", image: "/Fresh&Organic.jpg", color: "from-green-600 to-emerald-400" }],
    beauty: [{ id: 1, title: "Radiant You", subtitle: "Premium Skincare & Luxury Beauty", image: "/RadiantYou.jpg", color: "from-pink-600 to-rose-400" }],
    books: [{ id: 1, title: "The Book Nook", subtitle: "Explore Knowledge & Inspiration", image: "/TheBookNook.jpg", color: "from-amber-600 to-orange-400" }],
    'bikes-cars': [{ id: 1, title: "Speed & Precision", subtitle: "Exotic Diecast Models for Collectors", image: "/Speed&Precision.jpg", color: "from-slate-700 to-slate-900" }]
};
export const categoryData = {
    "Electronics": { image: "/GadgetUniverse.jpg", color: "bg-blue-50", iconColor: "text-blue-600" },
    "Clothing": { image: "/TheFashionEdit.jpg", color: "bg-rose-50", iconColor: "text-rose-600" },
    "Men's Clothing": { image: "/TheFashionEdit.jpg", color: "bg-rose-50", iconColor: "text-rose-600" },
    "Women's Clothing": { image: "/TheFashionEdit.jpg", color: "bg-pink-50", iconColor: "text-pink-600" },
    "Groceries": { image: "/Fresh&Organic.jpg", color: "bg-green-50", iconColor: "text-green-600" },
    "Beauty": { image: "/RadiantYou.jpg", color: "bg-pink-50", iconColor: "text-pink-600" },
    "Books": { image: "/TheBookNook.jpg", color: "bg-amber-50", iconColor: "text-amber-600" },
    "Bikes & Cars": { image: "/Speed&Precision.jpg", color: "bg-slate-50", iconColor: "text-slate-600" },
    "Home & Kitchen": { image: "/AestheticLiving.jpg", color: "bg-indigo-50", iconColor: "text-indigo-600" }
};
