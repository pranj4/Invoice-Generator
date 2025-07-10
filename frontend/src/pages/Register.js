import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm(Object.assign(Object.assign({}, form), { [e.target.name]: e.target.value }));
    };
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleSubmit = async (e) => {
        var _a, _b;
        if (e)
            e.preventDefault();
        if (!form.name || !form.email || !form.password)
            return setError("All fields are required");
        if (!validateEmail(form.email))
            return setError("Invalid email format");
        try {
            await axios.post("http://localhost:5000/api/auth/register", form);
            navigate("/login");
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                setError(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Registration failed");
            }
            else {
                setError("Registration failed");
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-black text-white flex flex-col", children: [_jsxs("nav", { className: "flex items-center justify-between px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "/logo-light1.png", alt: "Levitation Logo", className: "h-8 w-8" }), _jsx("span", { className: "font-bold text-xl tracking-wide", children: "levitation" }), _jsx("span", { className: "ml-1 text-xs text-zinc-400", children: "infotech" })] }), _jsx(Button, { variant: "secondary", className: "bg-lime-200 text-black font-semibold hover:bg-lime-300", onClick: () => navigate("/login"), children: "Login" })] }), _jsx("div", { className: "flex flex-1", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 w-full h-full", children: [_jsxs("div", { className: "p-10 space-y-4 flex flex-col justify-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Sign up to begin journey" }), _jsx("p", { className: "text-zinc-400 text-sm mb-6", children: "Enter your details to sign-up" }), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Enter your name" }), _jsx(Input, { name: "name", placeholder: "Enter Email ID", value: form.name, onChange: handleChange, className: "bg-zinc-800 border-zinc-700" }), _jsx("span", { className: "text-xs text-zinc-400", children: "This name will be displayed with your inquiry" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Email Address" }), _jsx(Input, { name: "email", placeholder: "Enter Email ID", value: form.email, onChange: handleChange, className: "bg-zinc-800 border-zinc-700" }), _jsx("span", { className: "text-xs text-zinc-400", children: "This email will be displayed with your inquiry" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1", children: "Password" }), _jsx(Input, { name: "password", type: "password", placeholder: "Enter the Password", value: form.password, onChange: handleChange, className: "bg-zinc-800 border-zinc-700" }), _jsx("span", { className: "text-xs text-zinc-400", children: "Any further updates will be forwarded on this Email ID" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs("div", { className: "flex items-center gap-4 mt-2", children: [_jsx(Button, { type: "submit", className: "bg-lime-700 hover:bg-lime-600 text-white px-8", children: "Register" }), _jsx("span", { className: "text-sm text-zinc-400", children: "Already have account ?" })] })] })] }), _jsx("div", { className: "hidden md:flex items-start pt-15", children: _jsx("img", { src: "/signup.png", alt: "Banner", className: "h-full w-full object-cover" }) })] }) })] }));
}
