from uuid import UUID

from src.database.db import Session
from src.models import ClaimLineItem

def set_line_item_decision(dataset):
    for line_item in dataset:

        claim_type = line_item.get('claim_type').lower().replace(" ", "_")
        decision = line_item.get('decision')

        if decision:
            # I'm leaving this here to show a mistake in understanding the requiremtns.
            # I originally thought we were meant to keep a tally of approvals/denials.
            #Session.query(ClaimLineItem).filter(ClaimLineItem.claim_line_item_type == claim_type).update({"decision": decision, 'quantity': ClaimLineItem.quantity + 1})
            Session.query(ClaimLineItem).filter(ClaimLineItem.claim_line_item_type == claim_type).update({"decision": decision})
            Session.commit()
