packets = []

MAX_PACKETS = 100

packet_counter = 0


def add_packet(packet_data):

    global packet_counter

    packet_counter += 1

    packets.append(packet_data)

    if len(packets) > MAX_PACKETS:
        packets.pop(0)


def get_packets():
    return packets


def get_packet_counter():
    return packet_counter