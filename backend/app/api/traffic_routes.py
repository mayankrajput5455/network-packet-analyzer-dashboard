# app/api/traffic_routes.py

from fastapi import APIRouter

from app.services.traffic_service import (
    get_traffic_history
)

router = APIRouter()


@router.get("/traffic-history")
def traffic_history():

    return get_traffic_history()