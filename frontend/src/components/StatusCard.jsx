import { useEffect, useState } from "react";
import API from "../services/api.js";

export default function StatsCards() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = () => {
        API.get("/stats")
        .then((res) => setStats(res.data));
    };

    fetchStats();

    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
    }, []);

    const cardStyle = (color) => ({
    background: color,
    borderRadius: "12px",
    padding: "25px",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    });

    return (
    <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "20px",
        }}
    >
        <div style={cardStyle("#2563eb")}>
        <h2>TCP</h2>
        <h1>{stats.TCP}</h1>
        </div>

        <div style={cardStyle("#16a34a")}>
        <h2>UDP</h2>
        <h1>{stats.UDP}</h1>
        </div>

        <div style={cardStyle("#dc2626")}>
        <h2>ICMP</h2>
        <h1>{stats.ICMP}</h1>
        </div>

        <div style={cardStyle("#7c3aed")}>
        <h2>OTHER</h2>
        <h1>{stats.OTHER}</h1>
        </div>
    </div>
    );
}