import asyncio
import websockets

async def test():

    uri = "ws://127.0.0.1:8000/ws"

    async with websockets.connect(uri) as websocket:

        print("Connected!")

        await websocket.send("hello")

        while True:
            msg = await websocket.recv()
            print(msg)

asyncio.run(test())