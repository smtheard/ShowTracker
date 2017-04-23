import config
import sqlalchemy as sa

class Genre(config.Base):
  __tablename__ = 'genre'

  id = sa.Column(sa.Integer, sa.Sequence('genre_id_seq'), primary_key=True)
  name = sa.Column(sa.Text, nullable=False)

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return "<Genre('%d', '%s')>" % (self.id, self.name)
