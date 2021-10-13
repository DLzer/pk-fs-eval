import enum

from sqlalchemy import (Column, Enum, ForeignKey, Integer, String)
from sqlalchemy.orm import relationship

from .base import Base
from .fields import UUID
from .mixins import DateTimeMixin, UUIDidMixin


class ClaimLineItem(Base, DateTimeMixin, UUIDidMixin):
    __tablename__ = 'claim_line_items'

    class ClaimLineItemTypeEnum(enum.Enum):
        vaccine = 'Vaccine'
        wellness_exam = 'Wellness Exam'
        blood_test = 'Blood Test'

    amount_claimed = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    claim_line_item_type = Column(Enum(ClaimLineItemTypeEnum), nullable=True)
    decision = Column(String, nullable=True)

    claim = relationship("Claim", back_populates='line_items')
    claim_id = Column(UUID(), ForeignKey('claims.id'), nullable=False)
