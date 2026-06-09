from fastapi import APIRouter

from app.services.statistics_service import (
    get_protocol_statistics
)

from app.services.statistics_service import (
    get_protocol_statistics,
    get_top_talkers
)

router = APIRouter()


@router.get("/stats")
def protocol_stats():

    return get_protocol_statistics()

@router.get("/top-talkers")
def top_talkers():
    return get_top_talkers()