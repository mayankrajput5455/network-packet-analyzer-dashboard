import asyncio

from app.websocket.packet_queue import packet_queue
from app.websocket.manager import manager


async def packet_broadcaster():

    while True:

        while not packet_queue.empty():

            packet = packet_queue.get()

            await manager.broadcast(packet)

        await asyncio.sleep(0.1)