import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../assets/person.png";

// ... (import tetap sama)

export default function Profile() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("diproses");
  const [expandedId, setExpandedId] = useState(null);
  const [responses, setResponses] = useState([]);
  const [formRatings, setFormRatings] = useState({});

  const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};


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
        setError("Terjadi kesalahan saat memuat data pengguna.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/responses", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setResponses(data);
        }
      } catch (err) {
        console.error("Gagal memuat response", err);
      }
    };

    fetchResponses();
  }, []);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/my-complaints", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Complaints:", data);
          setComplaints(data);
        } else {
          setError("Gagal memuat data keluhan.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data keluhan.");
      }
    };

    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const handleRatingChange = (id, field, value) => {
  setFormRatings((prev) => ({
    ...prev,
    [id]: {
      ...prev[id],
      [field]: value,
    },
  }));
};

const submitRating = async (complaintId) => {
  const token = localStorage.getItem("token");
  const ratingData = formRatings[complaintId];

  if (!ratingData?.rating || ratingData.rating < 1 || ratingData.rating > 5) {
    alert("Rating harus antara 1 sampai 5");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/api/ratings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complaint_id: complaintId,
        rating: ratingData.rating,
        feedback: ratingData.feedback || "",
      }),
    });

    if (res.ok) {
      alert("Rating berhasil dikirim!");
      // reload ulang complaints untuk mendapatkan rating baru
      const data = await res.json();
      setComplaints((prev) =>
        prev.map((c) =>
          c.complaint_id === complaintId ? { ...c, rating: data } : c
        )
      );
    } else {
      alert("Gagal mengirim rating");
    }
  } catch (err) {
    console.error("Gagal submit rating", err);
    alert("Terjadi kesalahan saat mengirim rating");
  }
};


  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderComplaintCard = (c) => (
    <div
      key={c.complaint_id}
      className="bg-white rounded-md shadow-md p-4 mb-4 transition-all duration-300"
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => toggleExpand(c.complaint_id)}
      >
        <div>
          <h4 className="font-semibold text-lg text-black">{c.title}</h4>
          <p className="text-sm text-gray-600">{c.location}</p>
          <p className="text-sm text-gray-500 italic">
  {formatDateTime(c.created_at)}
</p>

        </div>
        <div>
          <button
            className={`px-3 py-1 rounded text-sm font-medium transition duration-200 ${
              expandedId === c.complaint_id
                ? "bg-white border border-[#204c3f] text-[#204c3f] hover:bg-[#204c3f] hover:text-white"
                : "bg-[#204c3f] text-white hover:bg-white hover:text-[#204c3f] hover:border hover:border-[#204c3f]"
            }`}
          >
            {expandedId === c.complaint_id ? "Sembunyikan" : "Detail"}
          </button>
        </div>
      </div>

      {expandedId === c.complaint_id && (
        <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Deskripsi:</span> {c.description}
          </p>
          <p>
            <span className="font-semibold">Lokasi:</span> {c.location}
          </p>
          <p>
            <span className="font-semibold">Kategori:</span>{" "}
            {c.category?.name || "Tidak diketahui"}
          </p>

          {Array.isArray(c.attachments) && c.attachments.length > 0 && (
            <div>
              <p className="font-semibold mt-2">Lampiran:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {c.attachments.map((a) => (
                  <div
                    key={a.id}
                    className="w-full border rounded p-2 bg-gray-50"
                  >
                    <img
                      src={`http://localhost:8000/${a.file_path}`}
                      alt={`Lampiran-${a.id}`}
                      className="w-full max-h-64 object-contain mx-auto"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-image.png";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Response dari admin */}
          {c.response && (
            <div className="mt-4 border-t pt-4">
              <p className="font-semibold text-green-700">Tanggapan Admin:</p>
              <p className="text-gray-800 mt-1">{c.response.message}</p>
              <p className="text-xs text-gray-500 italic mt-1">
      Diberikan pada: {formatDateTime(c.response.created_at)}
    </p>
            </div>
          )}

          {/* Rating dari pengguna */}
          {c.rating && (
            <div className="mt-4 border-t pt-4">
              <p className="font-semibold text-yellow-600">Rating Anda:</p>
              <p className="text-yellow-400 font-medium text-3xl">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < c.rating.rating ? "★" : "☆"}</span>
                ))}
              </p>
              <p className="mt-1 text-gray-800">
                <span className="font-semibold">Feedback:</span>{" "}
                {c.rating.feedback || "Tidak ada feedback"}
              </p>
              <p className="text-xs text-gray-500 italic mt-1">
      Dikirim pada: {formatDateTime(c.rating.created_at)}
    </p>
            </div>
          )}

          {/* Form rating jika status selesai/ditolak tapi belum punya rating */}
{!c.rating && (c.status === "selesai" || c.status === "ditolak") && (
  <div className="mt-4 border-t pt-4">
    <p className="font-semibold text-yellow-600 mb-2">Beri Rating:</p>

    <div className="flex items-center space-x-2 mb-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() =>
            handleRatingChange(c.complaint_id, "rating", num)
          }
          className={`text-2xl ${
            formRatings[c.complaint_id]?.rating >= num
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>

    <textarea
      placeholder="Masukkan feedback (opsional)"
      className="w-full border rounded px-3 py-2 text-sm mb-2"
      value={formRatings[c.complaint_id]?.feedback || ""}
      onChange={(e) =>
        handleRatingChange(c.complaint_id, "feedback", e.target.value)
      }
    />

    <button
      onClick={() => submitRating(c.complaint_id)}
      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm"
    >
      Kirim Rating
    </button>
  </div>
)}

        </div>
      )}
    </div>
  );

  const renderTab = (status) => {
    const filtered = complaints.filter((c) => c.status === status);
    return (
      <div>
        <h3 className="text-2xl font-bold mb-4 capitalize">Keluhan {status}</h3>
        {filtered.length > 0 ? (
          filtered.map(renderComplaintCard)
        ) : (
          <p className="text-sm text-gray-500">
            Tidak ada keluhan dengan status {status}.
          </p>
        )}
      </div>
    );
  };

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!user || !Array.isArray(complaints))
    return <div className="p-6">Loading...</div>;

  return (
    <>
      <div className="bg-[#204c3f] h-[130px]">
        <div className="container mx-auto px-6 md:px-24">
          <div className="relative top-12 bg-white rounded shadow-md p-6 pb-0">
            <div className="flex justify-between items-center flex-col md:flex-row">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={ProfileIcon}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold">{complaints.length}</p>
                <p className="text-sm text-gray-600">Complaints</p>
              </div>
            </div>

            <div className="flex space-x-8 mt-8 border-b pb-0">
              {["diproses", "ditolak", "selesai"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 ${
                    activeTab === tab
                      ? "font-semibold border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-24 mt-28 mb-10">
        {renderTab(activeTab)}
      </div>
    </>
  );
}
