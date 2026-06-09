import { useEffect, useState } from "react";
import API from "../services/api";

export default function AlertsPanel() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const fetchAlerts = () => {
      API.get("/alerts")
        .then((res) => setAlerts(res.data))
        .catch(console.error);
    };

    fetchAlerts();

    const interval = setInterval(
      fetchAlerts,
      3000
    );

    return () => clearInterval(interval);

  }, []);

  const getColor = (severity) => {

    switch (severity) {

      case "HIGH":
        return "#dc2626";

      case "MEDIUM":
        return "#f59e0b";

      default:
        return "#16a34a";
    }
  };

  const getIcon = (type) => {

    switch (type) {

      case "HIGH_TRAFFIC":
        return "🚨";

      case "DNS_FLOOD":
        return "🌐";

      case "TRAFFIC_SPIKE":
        return "📈";

      default:
        return "⚠️";
    }
  };

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}
    >
      <h2
        style={{
          color: "#f8fafc",
          marginBottom: "15px"
        }}
      >
        🚨 Security Alerts
      </h2>

      {alerts.length === 0 ? (

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "8px",
            color: "#cbd5e1"
          }}
        >
          ✅ No alerts detected
        </div>

      ) : (

        alerts.map((alert, index) => (

          <div
            key={index}
            style={{
              background: getColor(alert.severity),
              color: "white",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <strong>
                {getIcon(alert.type)} {alert.type}
              </strong>

              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                {alert.severity}
              </span>
            </div>

            <p
              style={{
                marginTop: "10px",
                marginBottom: 0
              }}
            >
              {alert.message}
            </p>

          </div>

        ))

      )}
    </div>
  );
}