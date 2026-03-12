import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back!", { icon: "👋" });
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            toast.success("Signed in with Google!", { icon: "🚀" });
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 md:py-12">
            <div className="max-w-md w-full">
                <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 premium-gradient opacity-10 blur-3xl" />

                    <div className="text-center mb-8 md:mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-sm md:text-base text-slate-500 font-medium">Log in to your OmniMart account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700">Password</label>
                                <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-4 premium-gradient text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:scale-100"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-between gap-4">
                        <div className="flex-1 h-[1px] bg-slate-100"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or</span>
                        <div className="flex-1 h-[1px] bg-slate-100"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full mt-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black text-base shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center justify-center space-x-3 disabled:opacity-70"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81.38z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 font-medium">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-primary font-black hover:underline underline-offset-4">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
