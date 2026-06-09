from scapy.all import sniff

from app.packet_capture.parser import parse_packet
from app.packet_capture.packet_store import add_packet

from app.websocket.packet_queue import packet_queue


def process_packet(packet):

    parsed = parse_packet(packet)

    if parsed:

        add_packet(parsed)

        packet_queue.put(parsed)


def start_sniffing():

    sniff(
        prn=process_packet,
        store=False
    )