"""new tables

Revision ID: 49eaa645bd31
Revises: 6979a4c24202
Create Date: 2022-02-08 11:48:43.953365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49eaa645bd31'
down_revision = '6979a4c24202'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('party',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=64), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_party_title'), 'party', ['title'], unique=True)
    op.create_table('venue',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('venue')
    op.drop_index(op.f('ix_party_title'), table_name='party')
    op.drop_table('party')
    # ### end Alembic commands ###
