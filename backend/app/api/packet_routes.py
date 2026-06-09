from fastapi import APIRouter

from app.packet_capture.packet_store import get_packets

router = APIRouter()


@router.get("/packets")
def packets():

    return {
        "count": len(get_packets()),
        "data": get_packets()
    }