import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.name || !form.email || !form.password)
      return setError("All fields are required");
    if (!validateEmail(form.email))
      return setError("Invalid email format");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("Registration failed");
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
          variant="secondary"
          className="bg-lime-200 text-black font-semibold hover:bg-lime-300"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Form Section */}
          <div className="p-10 space-y-4 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">Sign up to begin journey</h1>
            <p className="text-zinc-400 text-sm mb-6">
              Enter your details to sign-up 
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1">Enter your name</label>
                <Input
                  name="name"
                  placeholder="Enter Email ID"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
                <span className="text-xs text-zinc-400">
                  This name will be displayed with your inquiry
                </span>
              </div>
              <div>
                <label className="block mb-1">Email Address</label>
                <Input
                  name="email"
                  placeholder="Enter Email ID"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
                <span className="text-xs text-zinc-400">
                  This email will be displayed with your inquiry
                </span>
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter the Password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
                <span className="text-xs text-zinc-400">
                  Any further updates will be forwarded on this Email ID
                </span>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center gap-4 mt-2">
                <Button
                  type="submit"
                  className="bg-lime-700 hover:bg-lime-600 text-white px-8"
                >
                  Register
                </Button>
                <span className="text-sm text-zinc-400">
                  Already have account ?
                </span>
              </div>
            </form>
          </div>
          {/* Image Section */}
          <div className="hidden md:flex items-start pt-15">
            <img
              src="/signup.png"
              alt="Banner"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
