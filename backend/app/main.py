from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from threading import Thread
import asyncio

from app.packet_capture.sniffer import start_sniffing

from app.api.packet_routes import router as packet_router
from app.api.stats_routes import router as stats_router
from app.api.websocket_routes import router as websocket_router

from app.websocket.broadcaster import packet_broadcaster

from app.api.traffic_routes import (
    router as traffic_router
)

from app.services.traffic_monitor import (
    traffic_monitor
)

from app.api.alert_routes import (
    router as alert_router
)

from app.api.export_routes import (
    router as export_router
)

app = FastAPI(
    title="Network Packet Analyzer"
)

# CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later replace with localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(packet_router)
app.include_router(stats_router)
app.include_router(websocket_router)
app.include_router(traffic_router)
app.include_router(alert_router)
app.include_router(export_router)

@app.on_event("startup")
async def startup_event():

    sniff_thread = Thread(
        target=start_sniffing,
        daemon=True
    )

    sniff_thread.start()

    traffic_thread = Thread(
        target=traffic_monitor,
        daemon=True
    )

    traffic_thread.start()

    asyncio.create_task(
        packet_broadcaster()
    )

@app.get("/")
def root():
    return {
        "message": "Packet Analyzer Running"
    }