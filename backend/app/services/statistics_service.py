from collections import Counter
from app.packet_capture.packet_store import get_packets


def get_protocol_statistics():

    stats = {
        "TCP": 0,
        "UDP": 0,
        "ICMP": 0,
        "OTHER": 0
    }

    for packet in get_packets():
        stats[packet["protocol"]] += 1

    return stats


def get_top_talkers():

    counter = Counter()

    for packet in get_packets():
        counter[packet["source_ip"]] += 1

    return dict(counter.most_common(10))