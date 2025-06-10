import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function UserNavbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout failed:", await res.json());
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinkClass = "text-black hover:text-gray-600 font-normal";

  return (
  <header className="bg-white shadow-md flex justify-between items-center px-6 h-16">
    <img src="/src/assets/logo.png" alt="Logo" className="h-8" />

    <div className="flex items-center gap-12 ml-auto">
      {/* NavLink Group */}
      <div className="flex gap-6">
        <NavLink to="/user/home" className={navLinkClass}>Home</NavLink>
        <NavLink to="/user/complaints" className={navLinkClass}>Complaints</NavLink>
        <NavLink to="/user/ratings" className={navLinkClass}>Ratings</NavLink>
        <NavLink to="/user/profile" className={navLinkClass}>Profile</NavLink>
      </div>

      {/* User Info Group */}
      <div className="flex items-center">
        <button onClick={handleLogout} className="text-[#ff3131] font-bold flex items-center gap-1 hover:text-red-700 px-4 py-2 rounded">
          <LogOut size={18} /> Logout
        </button>
        <span className="font-bold border-l pl-3" style={{ borderLeftColor: "#A09F9F" }} >{user.name}</span>
        <img src={user.photo} alt="Profile" className="h-8 w-8 rounded-full object-cover ml-2" />
      </div>
    </div>
  </header>
);
}
