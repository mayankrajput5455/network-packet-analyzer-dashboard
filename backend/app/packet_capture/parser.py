from scapy.layers.inet import IP, TCP, UDP, ICMP
from datetime import datetime


def parse_packet(packet):

    if not packet.haslayer(IP):
        return None

    protocol = "OTHER"
    src_port = None
    dst_port = None

    if packet.haslayer(TCP):

        protocol = "TCP"

        src_port = packet[TCP].sport
        dst_port = packet[TCP].dport

    elif packet.haslayer(UDP):

        protocol = "UDP"

        src_port = packet[UDP].sport
        dst_port = packet[UDP].dport

    elif packet.haslayer(ICMP):

        protocol = "ICMP"

    return {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "source_ip": packet[IP].src,
        "destination_ip": packet[IP].dst,
        "protocol": protocol,
        "source_port": src_port,
        "destination_port": dst_port,
        "packet_size": len(packet)
    }