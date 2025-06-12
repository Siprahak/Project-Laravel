// import React from "react";
// import { NavLink } from "react-router-dom";
// import { BarChart2, Users, AlertCircle, Tag, Paperclip, MessageSquare, Star, LogOut } from "lucide-react";

// export default function AdminSidebar() {
//   const linkClass = "flex items-center gap-2 px-4 py-2 text-[#4e4e4e] hover:bg-gray-100 rounded";

//   return (
//     <aside className="w-64 bg-white min-h-screen shadow-md flex flex-col justify-between">
//       <nav className="p-4 space-y-2">
//         <NavLink to="/admin/dashboard" className={linkClass}><BarChart2 size={18} /> Dashboard</NavLink>
//         <NavLink to="/admin/users" className={linkClass}><Users size={18} /> Users</NavLink>
//         <NavLink to="/admin/complaints" className={linkClass}><AlertCircle size={18} /> Complaints</NavLink>
//         <NavLink to="/admin/categories" className={linkClass}><Tag size={18} /> Categories</NavLink>
//         <NavLink to="/admin/attachments" className={linkClass}><Paperclip size={18} /> Attachments</NavLink>
//         <NavLink to="/admin/responses" className={linkClass}><MessageSquare size={18} /> Responses</NavLink>
//         <NavLink to="/admin/ratings" className={linkClass}><Star size={18} /> Ratings</NavLink>
//         <button className="flex items-center gap-2 text-[#ff3131] hover:bg-red-100 w-full px-4 py-2 rounded">
//           <LogOut size={18} /> Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart2, Users, AlertCircle, Tag, Paperclip, MessageSquare, Star, LogOut
} from "lucide-react";

export default function AdminSidebar() {
  const linkClass = "flex items-center gap-2 px-4 py-2 text-[#4e4e4e] hover:bg-gray-100 rounded";
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (res.ok) {
        // Hapus token dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect ke halaman login
        navigate("/login");
      } else {
        console.error("Logout gagal:", await res.json());
      }
    } catch (err) {
      console.error("Terjadi error saat logout:", err);
    }
  };

  return (
    <aside className="w-64 bg-white min-h-screen shadow-md flex flex-col justify-between">
      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}><BarChart2 size={18} /> Dashboard</NavLink>
        <NavLink to="/admin/users" className={linkClass}><Users size={18} /> Users</NavLink>
        <NavLink to="/admin/complaints" className={linkClass}><AlertCircle size={18} /> Complaints</NavLink>
        <NavLink to="/admin/categories" className={linkClass}><Tag size={18} /> Categories</NavLink>
        <NavLink to="/admin/attachments" className={linkClass}><Paperclip size={18} /> Attachments</NavLink>
        <NavLink to="/admin/responses" className={linkClass}><MessageSquare size={18} /> Responses</NavLink>
        <NavLink to="/admin/ratings" className={linkClass}><Star size={18} /> Ratings</NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#ff3131] hover:bg-red-100 w-full px-4 py-2 rounded"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}
