import React from "react";

export default function AdminNavbar({ admin }) {
  return (
    <div className="bg-[#204c3f] text-white flex justify-between items-center px-6 h-16 shadow-md">
      <img src="/src/assets/logo.png" alt="Logo" className="h-8" />
      <div className="flex items-center gap-3">
        <span className="font-semibold">{admin.name}</span>
        <img src={admin.photo} alt="profile" className="h-8 w-8 rounded-full object-cover" />
      </div>
    </div>
  );
}
