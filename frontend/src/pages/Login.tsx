import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.email || !form.password) return setError("All fields are required");
    try {
      await axios.post("http://localhost:5000/api/auth/login", form);
      navigate("/AddProducts"); // Redirect to Add Products page after login
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800">
        <div className="flex items-center gap-2">
          <img src="/logo-light1.png" alt="Levitation Logo" className="h-8 w-8" />
          <span className="font-bold text-xl tracking-wide">levitation</span>
          <span className="ml-1 text-xs text-zinc-400">infotech</span>
        </div>
        <Button
          variant="outline"
          className="border-lime-300 text-lime-300 bg-transparent hover:bg-lime-200 hover:text-black font-semibold"
          onClick={() => navigate("/")}
        >
          Connecting People With Technology
        </Button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
          {/* Animated Banner Section */}
          <div className="hidden md:flex items-center justify-center bg-black relative">
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt="Login Banner"
                className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${
                  idx === bannerIdx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                style={{ borderRadius: "0 0 0 40px" }}
              />
            ))}
          </div>
          {/* Form Section */}
          <div className="p-16 space-y-6 flex flex-col justify-center min-h-[600px]">
            <div className="flex items-center gap-2 mb-4 md:hidden">
              <img src="/logo-light1.png" alt="Levitation Logo" className="h-10 w-10" />
              <span className="font-bold text-2xl tracking-wide">levitation</span>
              <span className="ml-1 text-sm text-zinc-400">infotech</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Let the Journey Begin!</h1>
            <p className="text-zinc-400 text-base mb-8">
              Enter your email and Password to login .
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-lg">Email Address</label>
                <Input
                  name="email"
                  placeholder="Enter Email ID"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-lg py-3"
                />
                <span className="text-xs text-zinc-400">
                  
                </span>
              </div>
              <div>
                <label className="block mb-2 text-lg">Current Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter the Password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-lg py-3"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center gap-6 mt-4">
                <Button
                  type="submit"
                  className="bg-lime-700 hover:bg-lime-600 text-white px-10 py-3 text-lg"
                >
                  Login now
                </Button>
                <span className="text-base text-zinc-400 cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>
                  Forget password ?
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}