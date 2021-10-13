from src.database.db import Session
from src.models import Plan

# Get all plans
def get_plans():
    return Session.query(Plan).all()