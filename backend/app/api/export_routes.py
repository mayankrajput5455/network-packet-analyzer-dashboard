from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.packet_capture.packet_store import get_packets

import csv

router = APIRouter()


@router.get("/export-csv")
def export_csv():

    packets = get_packets()

    filename = "packet_report.csv"

    with open(filename, "w", newline="") as file:

        writer = csv.writer(file)

        writer.writerow([
            "Timestamp",
            "Source IP",
            "Destination IP",
            "Protocol",
            "Source Port",
            "Destination Port",
            "Packet Size"
        ])

        for packet in packets:

            writer.writerow([
                packet["timestamp"],
                packet["source_ip"],
                packet["destination_ip"],
                packet["protocol"],
                packet["source_port"],
                packet["destination_port"],
                packet["packet_size"]
            ])

    return FileResponse(
        filename,
        media_type="text/csv",
        filename="packet_report.csv"
    )