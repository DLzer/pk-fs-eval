from sqlalchemy import (Column, Integer)
from sqlalchemy.orm import relationship

from typing import List
from .base import Base
from .mixins import DateTimeMixin, UUIDidMixin
from src.models.claim_line_item import ClaimLineItem
from src.models.claim import Claim


class Plan(Base, DateTimeMixin, UUIDidMixin):
    __tablename__ = 'plans'

    vaccines = Column(Integer, nullable=False)
    wellness_exam = Column(Integer, nullable=False)
    blood_test = Column(Integer, nullable=False)

    # Return claims for a comparison of utilization
    claims: List[Claim] = relationship(
        "Claim",
        cascade="save-update, merge, delete"
    )

    # Determine utilizations based on matching the ClaimLineItem 
    # against the Line Item being "approved"
    @property
    def vaccine_utilization(self):
        line_items = self.claims[0].line_items

        for line_item in line_items:
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.vaccine and line_item.decision == "approved":
                return line_item.quantity
    
    @property
    def blood_test_utilization(self):
        line_items = self.claims[0].line_items

        for line_item in line_items:
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.blood_test and line_item.decision == "approved":
                return line_item.quantity
    
    @property
    def wellness_exam_utilization(self):
        line_items = self.claims[0].line_items

        for line_item in line_items:
            if line_item.claim_line_item_type == ClaimLineItem.ClaimLineItemTypeEnum.wellness_exam and line_item.decision == "approved":
                return line_item.quantity




