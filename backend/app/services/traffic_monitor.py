# app/services/traffic_monitor.py

import time

from app.services.traffic_service import (
    add_traffic_point
)

from app.packet_capture.packet_store import (
    get_packet_counter
)


def traffic_monitor():

    previous_count = 0

    while True:

        current_count = get_packet_counter()

        packets_per_second = current_count - previous_count

        print(
            f"Current={current_count}, "
            f"Previous={previous_count}, "
            f"PPS={packets_per_second}"
        )

        add_traffic_point(
            packets_per_second
        )

        previous_count = current_count

        time.sleep(1)