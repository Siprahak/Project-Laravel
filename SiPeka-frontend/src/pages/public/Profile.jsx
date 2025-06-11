import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/person.png"; // Import gambar dari aset lokal

export default function Profile() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
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
          fetchComplaints(data.id);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Terjadi kesalahan saat memuat data pengguna.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchComplaints = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8000/api/complaints?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        } else {
          setError("Gagal memuat data keluhan.");
        }
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Terjadi kesalahan saat memuat data keluhan.");
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }



  return (
    <div className="container p-4 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <img
                src={ProfileIcon}
                alt="Profile Icon"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{user.name || "Pengguna"}</h1>
              <p className="text-sm text-gray-500">{user.email || "Email Tidak Tersedia"}</p>
            </div>
          </div>

        </div>

        <div className="mt-4">
          <h2 className="mb-2 font-semibold text-md">Daftar Keluhan</h2>
          {complaints.length > 0 ? (
            <ul>
              {complaints.map((complaint) => (
                <li key={complaint.id} className="p-2 mb-2 text-sm border rounded">
                  <h3 className="font-semibold">{complaint.title}</h3>
                  <p className="text-gray-700">Deskripsi: {complaint.description}</p>
                  <p className="text-gray-700">Kategori : {complaint.category.name}</p>
                  <p className="text-gray-700">Lokasi : {complaint.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Tidak ada keluhan yang tercatat.</p>
          )}
        </div>
      </div>
    </div>
  );
}
