from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import manager

router = APIRouter()

@router.get("/ws-test")
def ws_test():
    return {"message": "WebSocket router loaded"}

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    print("=== NEW WS CONNECTION ===")

    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            print("Received:", data)

    except WebSocketDisconnect:
        print("=== WS DISCONNECTED ===")
        manager.disconnect(websocket)