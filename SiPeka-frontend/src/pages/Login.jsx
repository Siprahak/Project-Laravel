import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      const me = await api.get("/me");

      if (me.data.role === "admin") navigate("/admin/dashboard");
      else navigate("/user");
    } catch (err) {
      alert("Login gagal!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full mb-2 p-2 border" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full mb-2 p-2 border" />
      <button className="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
  );
}
