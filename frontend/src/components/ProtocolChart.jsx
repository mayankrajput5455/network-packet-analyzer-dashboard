import { useEffect, useState } from "react";
import API from "../services/api.js";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ProtocolChart() {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const fetchStats = () => {
      API.get("/stats")
        .then((res) => setStats(res.data))
        .catch(console.error);
    };

    fetchStats();

    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);

  }, []);

  if (Object.keys(stats).length === 0) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: Object.keys(stats),
    datasets: [
      {
        data: Object.values(stats),
        backgroundColor: [
          "#3b82f6", // TCP
          "#22c55e", // UDP
          "#f97316", // ICMP
          "#a855f7", // OTHER
        ],
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#f8fafc",
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        minHeight: "450px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#f8fafc",
        }}
      >
        📊 Protocol Distribution
      </h2>

      <div
        style={{
          width: "320px",
          margin: "0 auto",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}