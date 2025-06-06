// import React from "react";
// import AdminNavbar from "../components/admin/AdminNavbar";
// import AdminSidebar from "../components/admin/AdminSidebar";

// export default function AdminLayout({ children }) {
//   const admin = {
//     name: "Budi",
//     photo: "https://i.pravatar.cc/150?img=3"
//   };

//   return (
//     <div className="bg-[#eaeaea] min-h-screen flex flex-col">
//       <AdminNavbar admin={admin} />
//       <div className="flex flex-1">
//         <AdminSidebar />
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        } else {
          // Token tidak valid atau expired
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Gagal mengambil data admin", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchAdmin();
  }, [navigate]);

  if (!admin) {
    return <div className="p-6">Loading...</div>; // Bisa diganti spinner
  }

  return (
    <div className="bg-[#eaeaea] min-h-screen flex flex-col">
      <AdminNavbar admin={admin} />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}


