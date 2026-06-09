# 🛰 Network Packet Analyzer Dashboard

Real-time network monitoring dashboard built using FastAPI, React, Scapy and WebSockets.

## Features

- Live Packet Capture
- Protocol Analysis (TCP, UDP, ICMP)
- Top Talkers Detection
- Real-Time Traffic Graph
- WebSocket Packet Streaming
- Security Alerts
  - High Traffic Detection
  - DNS Flood Detection
  - Traffic Spike Detection
- Packet Search & Filtering
- CSV Export

## Tech Stack

### Backend
- Python
- FastAPI
- Scapy
- WebSockets

### Frontend
- React.js
- Chart.js
- Axios

## Dashboard Preview

(Add screenshots here)

## Installation

### Backend

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload