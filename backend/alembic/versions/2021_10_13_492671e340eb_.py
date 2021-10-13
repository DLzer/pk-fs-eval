"""

Revision ID: 492671e340eb
Revises: 454a04e0b0bb
Create Date: 2021-10-13 11:28:59.014558

"""
import sqlalchemy as sa
import sqlalchemy_utils
from alembic import op

import src.models.fields


# revision identifiers, used by Alembic.
revision = '492671e340eb'
down_revision = '454a04e0b0bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # Add a new column to claim_line_items that will store the value of the decision.
    # In a real world setting we could/should create a relational table to store and ENUM and possible
    # history, and log times of the decisions. But for this example we'll keep it simple!
    op.add_column('claim_line_items', sa.Column('decision', sa.String(length=25), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('decision')
    # ### end Alembic commands ###