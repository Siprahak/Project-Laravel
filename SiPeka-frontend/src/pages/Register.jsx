import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", form);
      navigate("/login");
    } catch (err) {
      // Tampilkan error validasi dari backend Laravel
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const errorMessages = Object.values(errors).flat().join("\n");
        alert("Gagal register:\n" + errorMessages);
      } else {
        alert("Gagal register!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        name="password_confirmation"
        type="password"
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full mb-4 p-2 border"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        Register
      </button>
    </form>
  );
}
