import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function TopTalkers() {
  const [talkers, setTalkers] = useState({});

  useEffect(() => {
    const fetchTalkers = () => {
      API.get("/top-talkers")
        .then((res) => setTalkers(res.data))
        .catch(console.error);
    };

    fetchTalkers();

    const interval = setInterval(fetchTalkers, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#f8fafc",
        }}
      >
        🌐 Top Talkers
      </h2>

      {Object.entries(talkers).map(([ip, count], index) => (
        <div
          key={ip}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            background:
              index === 0
                ? "#334155"
                : "#273449",
          }}
        >
          <span
            style={{
              color: "#f8fafc",
              fontWeight: "500",
            }}
          >
            {ip}
          </span>

          <span
            style={{
              background: "#3b82f6",
              color: "white",
              padding: "5px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}