"""init

Revision ID: 9ea20b0987c4
Revises: 
Create Date: 2023-02-11 14:27:11.417024

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = '9ea20b0987c4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('uid', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('nickname', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('body', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('img_url', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('twitter_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('soundcloud_id', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.PrimaryKeyConstraint('uid')
    )
    op.create_table('post',
    sa.Column('uid', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('body', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('audio_filename', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('original_filename', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('user_uid', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.ForeignKeyConstraint(['user_uid'], ['user.uid'], ),
    sa.PrimaryKeyConstraint('uid')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('post')
    op.drop_table('user')
    # ### end Alembic commands ###