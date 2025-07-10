import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", quantity: "" });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm(Object.assign(Object.assign({}, form), { [e.target.name]: e.target.value }));
    };
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.quantity)
            return;
        setProducts([
            ...products,
            {
                name: form.name,
                price: Number(form.price),
                quantity: Number(form.quantity),
            },
        ]);
        setForm({ name: "", price: "", quantity: "" });
    };
    const handleGeneratePDF = async () => {
        const token = localStorage.getItem("token"); // Make sure you store your JWT as 'token'
        try {
            const res = await fetch("http://localhost:5000/api/generate-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    products: products.map((p) => ({
                        name: p.name,
                        rate: p.price, // map price to rate
                        quantity: p.quantity,
                    })),
                }),
            });
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "invoice.pdf";
            a.click();
        }
        catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };
    const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const gst = subTotal * 0.18;
    const total = subTotal + gst;
    return (_jsxs("div", { className: "min-h-screen bg-black text-white flex flex-col", children: [_jsxs("nav", { className: "flex items-center justify-between px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: "/logo-light1.png", alt: "Levitation Logo", className: "h-8 w-8" }), _jsx("span", { className: "font-bold text-xl tracking-wide", children: "levitation" }), _jsx("span", { className: "ml-1 text-xs text-zinc-400", children: "infotech" })] }), _jsx("button", { className: "bg-lime-300 text-black font-semibold px-6 py-2 rounded hover:bg-lime-400", onClick: () => navigate("/"), children: "Logout" })] }), _jsxs("div", { className: "flex flex-1 flex-col items-center px-4 py-10", children: [_jsx("h1", { className: "text-4xl font-bold mb-2", children: "Add Products" }), _jsx("p", { className: "text-zinc-400 mb-8", children: "Add your Products here and see the bill." }), _jsxs("form", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-6", onSubmit: handleAddProduct, children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-2", children: "Product Name" }), _jsx("input", { name: "name", value: form.name, onChange: handleChange, placeholder: "Enter the product name", className: "w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2", children: "Product Price" }), _jsx("input", { name: "price", type: "number", min: "1", value: form.price, onChange: handleChange, placeholder: "Enter the price", className: "w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-2", children: "Quantity" }), _jsx("input", { name: "quantity", type: "number", min: "1", value: form.quantity, onChange: handleChange, placeholder: "Enter the Qty", className: "w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white" })] })] }), _jsxs("button", { className: "flex items-center gap-2 bg-zinc-800 border border-lime-600 text-lime-300 px-8 py-3 rounded font-semibold mb-8 hover:bg-zinc-700 transition", onClick: handleAddProduct, children: [_jsx("span", { children: "Add Product" }), _jsx("span", { className: "text-lime-400", children: "+" })] }), _jsx("div", { className: "w-full max-w-5xl bg-zinc-900 rounded-xl shadow overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-zinc-800 text-white", children: [_jsxs("th", { className: "py-3 px-4 font-semibold", children: ["Product name ", _jsx("span", { children: "\u2191" })] }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Price" }), _jsxs("th", { className: "py-3 px-4 font-semibold", children: ["Quantity ", _jsx("span", { children: "\u2193" })] }), _jsx("th", { className: "py-3 px-4 font-semibold", children: "Total Price" })] }) }), _jsxs("tbody", { children: [products.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "py-6 px-4 text-center text-zinc-500", children: "No products added yet." }) })), products.map((p, i) => (_jsxs("tr", { className: "border-t border-zinc-800", children: [_jsx("td", { className: "py-3 px-4 italic", children: p.name }), _jsx("td", { className: "py-3 px-4", children: p.price }), _jsx("td", { className: "py-3 px-4", children: p.quantity }), _jsxs("td", { className: "py-3 px-4", children: ["INR ", p.price * p.quantity] })] }, i))), products.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("tr", { className: "border-t border-zinc-800", children: [_jsx("td", { colSpan: 3, className: "py-3 px-4 text-right font-semibold", children: "Sub-Total" }), _jsxs("td", { className: "py-3 px-4 font-semibold", children: ["INR ", subTotal.toFixed(2)] })] }), _jsxs("tr", { children: [_jsx("td", { colSpan: 3, className: "py-3 px-4 text-right font-semibold", children: "Incl + GST 18%" }), _jsxs("td", { className: "py-3 px-4 font-semibold", children: ["INR ", total.toFixed(2)] })] })] }))] })] }) }), _jsx("button", { className: "mt-10 bg-zinc-800 text-lime-300 px-10 py-3 rounded font-semibold hover:bg-zinc-700 transition disabled:opacity-50", disabled: products.length === 0, onClick: handleGeneratePDF, children: "Generate PDF Invoice" })] })] }));
}
