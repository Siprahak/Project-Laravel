import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UserNavbar from "../components/public/UserNavbar";
import UserFooter from "../components/public/UserFooter";

export default function UserLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
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
          setUser(data);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f2f2f2]">
      <UserNavbar user={user} />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
}
