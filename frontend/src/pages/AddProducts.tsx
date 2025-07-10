import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  name: string;
  price: number;
  quantity: number;
};

export default function AddProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.quantity) return;
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
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const gst = subTotal * 0.18;
  const total = subTotal + gst;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800">
        <div className="flex items-center gap-2">
          <img src="/logo-light1.png" alt="Levitation Logo" className="h-8 w-8" />
          <span className="font-bold text-xl tracking-wide">levitation</span>
          <span className="ml-1 text-xs text-zinc-400">infotech</span>
        </div>
        <button
          className="bg-lime-300 text-black font-semibold px-6 py-2 rounded hover:bg-lime-400"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </nav>

      <div className="flex flex-1 flex-col items-center px-4 py-10">
        <h1 className="text-4xl font-bold mb-2">Add Products</h1>
        <p className="text-zinc-400 mb-8">
          Add your Products here and see the bill.
        </p>

        {/* Product Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-6"
          onSubmit={handleAddProduct}
        >
          <div>
            <label className="block mb-2">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter the product name"
              className="w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-2">Product Price</label>
            <input
              name="price"
              type="number"
              min="1"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter the price"
              className="w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-2">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter the Qty"
              className="w-full px-4 py-3 rounded bg-zinc-900 border border-zinc-700 text-white"
            />
          </div>
        </form>
        <button
          className="flex items-center gap-2 bg-zinc-800 border border-lime-600 text-lime-300 px-8 py-3 rounded font-semibold mb-8 hover:bg-zinc-700 transition"
          onClick={handleAddProduct}
        >
          <span>Add Product</span>
          <span className="text-lime-400">+</span>
        </button>

        {/* Product Table */}
        <div className="w-full max-w-5xl bg-zinc-900 rounded-xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-800 text-white">
                <th className="py-3 px-4 font-semibold">Product name <span>↑</span></th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Quantity <span>↓</span></th>
                <th className="py-3 px-4 font-semibold">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 px-4 text-center text-zinc-500">
                    No products added yet.
                  </td>
                </tr>
              )}
              {products.map((p, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="py-3 px-4 italic">{p.name}</td>
                  <td className="py-3 px-4">{p.price}</td>
                  <td className="py-3 px-4">{p.quantity}</td>
                  <td className="py-3 px-4">INR {p.price * p.quantity}</td>
                </tr>
              ))}
              {/* Subtotal and GST */}
              {products.length > 0 && (
                <>
                  <tr className="border-t border-zinc-800">
                    <td colSpan={3} className="py-3 px-4 text-right font-semibold">Sub-Total</td>
                    <td className="py-3 px-4 font-semibold">INR {subTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-3 px-4 text-right font-semibold">Incl + GST 18%</td>
                    <td className="py-3 px-4 font-semibold">INR {total.toFixed(2)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Generate PDF Button */}
        <button
          className="mt-10 bg-zinc-800 text-lime-300 px-10 py-3 rounded font-semibold hover:bg-zinc-700 transition disabled:opacity-50"
          disabled={products.length === 0}
          onClick={handleGeneratePDF}
        >
          Generate PDF Invoice
        </button>
      </div>
    </div>
  );
}
