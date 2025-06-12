import React from "react";
import { NavLink } from "react-router-dom";

export default function UserFooter() {
  const linkClass = "text-[#eaeaea] font-bold hover:text-white";

  return (
    <footer className="bg-[#141414] py-6 px-4 mt-auto">
      <div className="flex justify-center mb-4">
        <img src="/src/assets/logo.png" alt="Logo" className="h-8" />
      </div>
      <div className="flex justify-center gap-8 mb-4">
        <NavLink to="/user/home" className={linkClass}>Home</NavLink>
        <NavLink to="/user/complaints" className={linkClass}>Complaints</NavLink>
        {/* <NavLink to="/user/ratings" className={linkClass}>Ratings</NavLink> */}
        <NavLink to="/user/profile" className={linkClass}>Profile</NavLink>
      </div>
      <p className="text-[#a9a9a9] text-sm border-t pt-2 pl-5" style={{ borderTopColor: "#373737" }}>2025. SiPeka All Rights Reserved</p>
    </footer>
  );
}
