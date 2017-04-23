import config
import sqlalchemy as sa

class ShowGenre(config.Base):
  __tablename__ = 'show_genre'

  id = sa.Column(sa.Integer, sa.Sequence('show_genre_id_seq'), primary_key=True)
  show_id = sa.Column(sa.Integer, nullable=False)
  genre_id = sa.Column(sa.Integer, nullable=False)

  def __init__(self, show_id, genre_id):
    self.show_id = show_id
    self.genre_id = genre_id

  def __repr__(self):
    return "<ShowGenre(id:'%d', show_id: '%d', genre_id: '%d')>" % (self.id, self.show_id, self.genre_id)
