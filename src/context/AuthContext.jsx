import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup
} from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initializing from localStorage to prevent flash of login screen
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("omnimart_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    const signup = async (email, password, displayName) => {
        // Find existing local users
        const localUsers = JSON.parse(localStorage.getItem("omnimart_local_users") || "[]");
        
        if (localUsers.find(u => u.email === email)) {
            throw new Error("User already exists with this email");
        }

        const newUser = {
            uid: `local_${Date.now()}`,
            displayName,
            email,
            password, // In a real app, this should be hashed
            createdAt: new Date().toISOString(),
            authMode: 'local'
        };

        localUsers.push(newUser);
        localStorage.setItem("omnimart_local_users", JSON.stringify(localUsers));

        // Log in immediately
        setUser(newUser);
        localStorage.setItem("omnimart_user", JSON.stringify(newUser));

        return newUser;
    };

    const login = async (email, password) => {
        const localUsers = JSON.parse(localStorage.getItem("omnimart_local_users") || "[]");
        const userFound = localUsers.find(u => u.email === email && u.password === password);

        if (!userFound) {
            throw new Error("Invalid email or password");
        }

        setUser(userFound);
        localStorage.setItem("omnimart_user", JSON.stringify(userFound));
        
        return userFound;
    };

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        let userData;
        if (!userDoc.exists()) {
            userData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                createdAt: new Date().toISOString(),
                authMode: 'firebase'
            };
            await setDoc(userDocRef, userData);
        } else {
            userData = userDoc.data();
        }

        const fullUser = { ...user, ...userData };
        setUser(fullUser);
        localStorage.setItem("omnimart_user", JSON.stringify(fullUser));
        
        return user;
    };

    const logout = () => {
        localStorage.removeItem("omnimart_user");
        setUser(null);
        return signOut(auth);
    };

    const updateUserProfile = async (data) => {
        // Handle Local User Update
        if (user?.authMode === 'local') {
            const localUsers = JSON.parse(localStorage.getItem("omnimart_local_users") || "[]");
            const updatedUsers = localUsers.map(u => u.uid === user.uid ? { ...u, ...data } : u);
            localStorage.setItem("omnimart_local_users", JSON.stringify(updatedUsers));
            
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("omnimart_user", JSON.stringify(updatedUser));
            return;
        }

        // Handle Firebase User Update
        if (auth.currentUser) {
            const authUpdates = {};
            if (data.displayName) authUpdates.displayName = data.displayName;
            if (data.photoURL) authUpdates.photoURL = data.photoURL;
            
            if (Object.keys(authUpdates).length > 0) {
                await updateProfile(auth.currentUser, authUpdates);
            }

            await setDoc(doc(db, "users", auth.currentUser.uid), data, { merge: true });
            
            const updatedUserDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
            const fullUserData = { ...auth.currentUser, ...updatedUserDoc.data() };
            setUser(fullUserData);
            localStorage.setItem("omnimart_user", JSON.stringify(fullUserData));
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // Only handle Firebase users here
            // Local users are managed manually in login/signup
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    const fullUserData = { ...currentUser, ...userDoc.data(), authMode: 'firebase' };
                    setUser(fullUserData);
                    localStorage.setItem("omnimart_user", JSON.stringify(fullUserData));
                } catch (err) {
                    console.error("Firestore Error:", err);
                    setUser({ ...currentUser, authMode: 'firebase' });
                    localStorage.setItem("omnimart_user", JSON.stringify(currentUser));
                }
            } else {
                // If Firebase signs out, check if we have a local session
                const savedUser = JSON.parse(localStorage.getItem("omnimart_user"));
                if (savedUser?.authMode !== 'local') {
                    setUser(null);
                    localStorage.removeItem("omnimart_user");
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateUserProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
