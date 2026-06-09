import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TrafficGraph() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = () => {

      API.get("/traffic-history")
        .then((res) => setHistory(res.data))
        .catch(console.error);
    };

    fetchHistory();

    const interval = setInterval(
      fetchHistory,
      2000
    );

    return () => clearInterval(interval);

  }, []);

  const data = {
    labels: history.map(
      (_, index) => index + 1
    ),
    datasets: [
      {
        label: "Packets / Second",
        data: history,
        borderColor: "#38bdf8",
        backgroundColor: "#38bdf8",
        tension: 0.4
      }
    ]
  };

  return (
    <div
      className="card"
      style={{
        marginTop: "20px"
      }}
    >
      <h2>Traffic Trend</h2>

      <Line data={data} />
    </div>
  );
}