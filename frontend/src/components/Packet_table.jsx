import { useEffect, useState } from "react";

export default function PacketTable() {
  const [packets, setPackets] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const socket = new WebSocket(
      "ws://127.0.0.1:8000/ws"
    );

    socket.onmessage = (event) => {
      const packet = JSON.parse(event.data);

      setPackets((prev) => [
        packet,
        ...prev.slice(0, 20),
      ]);
    };

    return () => socket.close();
  }, []);

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "20px",
        marginTop: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        overflowX: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#f8fafc",
        }}
      >
        📡 Live Packet Stream
      </h2>
      
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px"
        }}
      >
        {["ALL", "TCP", "UDP", "ICMP"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                filter === type
                  ? "#3b82f6"
                  : "#334155",
              color: "white"
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="🔍 Search IP Address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #475569",
          background: "#334155",
          color: "white",
          outline: "none"
        }}
      />

      <button
        onClick={() =>
          window.open(
            "http://127.0.0.1:8000/export-csv",
            "_blank"
          )
        }
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "15px"
        }}
      >
        ⬇ Export CSV
      </button>

      <table className="packet-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Size</th>
          </tr>
        </thead>

        <tbody>
          {packets
          .filter((packet) =>
            filter === "ALL"
              ? true
              : packet.protocol === filter
          )
          .filter((packet) =>
            packet.source_ip
              .toLowerCase()
              .includes(search.toLowerCase()) ||

            packet.destination_ip
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((packet, index) => (
            <tr key={index}>
              <td>{packet.timestamp}</td>
              <td>{packet.source_ip}</td>
              <td>{packet.destination_ip}</td>

              <td>
                <span
                  className={`protocol-badge ${packet.protocol}`}
                >
                  {packet.protocol}
                </span>
              </td>

              <td>{packet.packet_size} B</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}