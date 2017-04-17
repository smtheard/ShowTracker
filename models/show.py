import config
import sqlalchemy as sa

class Show(config.Base):
  __tablename__ = 'show'

  id = sa.Column(sa.Integer, sa.Sequence('id_seq'), primary_key=True)
  title = sa.Column(sa.Text, nullable=False, index=True)
  description = sa.Column(sa.Text)
  image_src = sa.Column(sa.Text)
  status = sa.Column(sa.Text)
  country = sa.Column(sa.Text)
  network_id = sa.Column(sa.Integer, ForeignKey("network.id"))
  genre_id = sa.Column(sa.Integer, ForeignKey("genre.id"))

  def __init__(self, title, description=None, image_src=None, status=None, country=None, network_id=None, genre_id=None):
    self.title = title
    self.description = description
    self.image_src = image_src
    self.status = status
    self.country = country
    self.network_id = network_id
    self.genre_id = genre_id

  def __repr__(self):
    return "<Show('%d', '%s')>" % (self.id, self.title)
