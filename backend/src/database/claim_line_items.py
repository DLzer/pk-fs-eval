from uuid import UUID

from src.database.db import Session
from src.models import ClaimLineItem

def set_line_item_decision(dataset):
    for line_item in dataset:
        Session.query(ClaimLineItem).filter(ClaimLineItem.claim_line_item_type == line_item.get('claim_type').lower().replace(" ", "_")).update({"decision": line_item.get('decision')})
        Session.commit()
