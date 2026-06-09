from collections import Counter

from app.packet_capture.packet_store import get_packets

from app.services.traffic_service import (
    get_traffic_history
)

def get_alerts():

    alerts = []

    packets = get_packets()

    ip_counter = Counter()
    dns_counter = Counter()

    for packet in packets:

        source_ip = packet.get("source_ip")

        ip_counter[source_ip] += 1

        source_port = packet.get("source_port")
        destination_port = packet.get("destination_port")

        # DNS Detection
        if (
            source_port == 53
            or
            destination_port == 53
        ):
            dns_counter[source_ip] += 1

    # HIGH TRAFFIC ALERT
    for ip, count in ip_counter.items():

        if count > 10:

            alerts.append({
                "type": "HIGH_TRAFFIC",
                "severity": "HIGH",
                "message": f"{ip} generated {count} packets"
            })

    # DNS FLOOD ALERT
    for ip, count in dns_counter.items():

        if count > 3:

            alerts.append({
                "type": "DNS_FLOOD",
                "severity": "MEDIUM",
                "message": f"{ip} generated {count} DNS requests"
            })

    history = get_traffic_history()

    if len(history) >= 5:

        avg_traffic = sum(history[:-1]) / len(history[:-1])

        current_traffic = history[-1]

        if current_traffic > avg_traffic * 2:

            alerts.append({
                "type": "TRAFFIC_SPIKE",
                "severity": "HIGH",
                "message":
                    f"Traffic spike detected ({current_traffic} packets/sec)"
            })

        return alerts