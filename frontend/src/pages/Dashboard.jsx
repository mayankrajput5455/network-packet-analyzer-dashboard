import StatsCards from "../components/StatusCard";
import TopTalkers from "../components/TopTalker";
import PacketTable from "../components/Packet_table";
import ProtocolChart from "../components/ProtocolChart";
import TrafficGraph from "../components/TrafficGraph";
import AlertsPanel from "../components/AlertsPanel";

export default function Dashboard() {
  return (
    <div className="container">

      <h1 className="title">
        Network Packet Analyzer
      </h1>

      <StatsCards />

      <div className="dashboard-grid">
        <ProtocolChart />
        <TopTalkers />
      </div>

      <TrafficGraph />

      <AlertsPanel />

      <PacketTable />

    </div>
  );
}