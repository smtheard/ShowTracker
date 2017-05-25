import config
import sqlalchemy as sa
from datetime import datetime

class Genre(config.Base):
  __tablename__ = 'genre'

  id = sa.Column(sa.Integer, sa.Sequence('genre_id_seq'), primary_key=True)
  name = sa.Column(sa.Text, nullable=False)
  created_at = sa.Column(sa.DateTime())

  def __init__(self, name):
    self.name = name
    self.created_at = datetime.utcnow()

  def __repr__(self):
    return "<Genre('%d', '%s')>" % (self.id, self.name)
