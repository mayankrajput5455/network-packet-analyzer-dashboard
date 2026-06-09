# app/services/traffic_service.py

from collections import deque

traffic_history = deque(maxlen=30)


def add_traffic_point(count):
    traffic_history.append(count)


def get_traffic_history():
    return list(traffic_history)