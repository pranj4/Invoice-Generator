import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const images = ["/1.png", "/2.jpg"];
export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [bannerIdx, setBannerIdx] = useState(0);
    const navigate = useNavigate();
    // Animation for banner
    useEffect(() => {
        const interval = setInterval(() => {
            setBannerIdx((idx) => (idx + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const handleChange = (e) => {
        setForm(Object.assign(Object.assign({}, form), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        var _a, _b;
        if (e)
            e.preventDefault();
        if (!form.email || !form.password)
            return setError("All fields are required");
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            await axios.post(`${apiUrl}/api/auth/login`, form);
            navigate("/AddProducts"); // Redirect to Add Products page after login
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Login failed");
            }
            else {
                setError("Login failed");
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black text-white flex flex-col", children: [_jsxs("nav", { className: "flex items-center justify-between px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "/logo-light1.png", alt: "Levitation Logo", className: "h-8 w-8" }), _jsx("span", { className: "font-bold text-xl tracking-wide", children: "levitation" }), _jsx("span", { className: "ml-1 text-xs text-zinc-400", children: "infotech" })] }), _jsx(Button, { variant: "outline", className: "border-lime-300 text-lime-300 bg-transparent hover:bg-lime-200 hover:text-black font-semibold", onClick: () => navigate("/"), children: "Connecting People With Technology" })] }), _jsx("div", { className: "flex flex-1 items-center justify-center", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden min-h-[600px]", children: [_jsx("div", { className: "hidden md:flex items-center justify-center bg-black relative", children: images.map((src, idx) => (_jsx("img", { src: src, alt: "Login Banner", className: `absolute h-full w-full object-cover transition-opacity duration-1000 ${idx === bannerIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`, style: { borderRadius: "0 0 0 40px" } }, src))) }), _jsxs("div", { className: "p-16 space-y-6 flex flex-col justify-center min-h-[600px]", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4 md:hidden", children: [_jsx("img", { src: "/logo-light1.png", alt: "Levitation Logo", className: "h-10 w-10" }), _jsx("span", { className: "font-bold text-2xl tracking-wide", children: "levitation" }), _jsx("span", { className: "ml-1 text-sm text-zinc-400", children: "infotech" })] }), _jsx("h1", { className: "text-4xl font-bold mb-3", children: "Let the Journey Begin!" }), _jsx("p", { className: "text-zinc-400 text-base mb-8", children: "Enter your email and Password to login ." }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2 text-lg", children: "Email Address" }), _jsx(Input, { name: "email", placeholder: "Enter Email ID", value: form.email, onChange: handleChange, className: "bg-zinc-800 border-zinc-700 text-lg py-3" }), _jsx("span", { className: "text-xs text-zinc-400" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2 text-lg", children: "Current Password" }), _jsx(Input, { name: "password", type: "password", placeholder: "Enter the Password", value: form.password, onChange: handleChange, className: "bg-zinc-800 border-zinc-700 text-lg py-3" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs("div", { className: "flex items-center gap-6 mt-4", children: [_jsx(Button, { type: "submit", className: "bg-lime-700 hover:bg-lime-600 text-white px-10 py-3 text-lg", children: "Login now" }), _jsx("span", { className: "text-base text-zinc-400 cursor-pointer hover:underline", onClick: () => navigate("/forgot-password"), children: "Forget password ?" })] })] })] })] }) })] }));
}
