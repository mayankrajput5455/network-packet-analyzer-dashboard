from fastapi import APIRouter

from app.services.alert_service import get_alerts

router = APIRouter()


@router.get("/alerts")
def alerts():

    return get_alerts()