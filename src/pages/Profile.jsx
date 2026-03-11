import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Save, LogOut, Camera, Loader2, Edit3, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

const Profile = () => {
    const { user, updateUserProfile, logout } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
    const [address, setAddress] = useState(user?.address || "");
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile({ 
                displayName,
                phoneNumber,
                address
            });
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Basic validation
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size must be less than 2MB");
            return;
        }

        setIsUploading(true);
        try {
            const storageRef = ref(storage, `profiles/${user.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            
            await updateUserProfile({ photoURL: downloadURL });
            toast.success("Profile photo updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    const userInitial = user?.displayName ? user.displayName[0].toUpperCase() : user?.email ? user.email[0].toUpperCase() : "?";

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
                {/* Header/Cover */}
                <div className="h-48 premium-gradient relative">
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[32px] bg-white p-2 shadow-2xl overflow-hidden">
                                <div className="w-full h-full rounded-[24px] premium-gradient flex items-center justify-center text-4xl font-black text-white shadow-inner overflow-hidden">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        userInitial
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-[24px]">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg text-primary hover:scale-110 transition-transform disabled:opacity-50"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*" 
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="pt-24 pb-12 px-8 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 mb-1">{user?.displayName || "OmniMart User"}</h1>
                            <p className="text-slate-500 font-medium flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                {user?.email}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center space-x-2 px-6 py-3 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-200"
                        >
                            <Edit3 className="w-4 h-4" />
                            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                        </button>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary disabled:opacity-60 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        disabled
                                        value={user?.email || ""}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none opacity-60 font-medium"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 ml-1">* Email cannot be changed</p>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        disabled={!isEditing}
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+91 12345 67890"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary disabled:opacity-60 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Shipping Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                    <textarea
                                        disabled={!isEditing}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Flat No., Street, City, Pincode"
                                        rows="3"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary disabled:opacity-60 transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <button
                                disabled={loading}
                                type="submit"
                                className="px-10 py-4 premium-gradient text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </button>
                        )}
                    </form>

                    <div className="mt-16 pt-8 border-t border-slate-100">
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-2xl transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
