import config
import sqlalchemy as sa

class Episode(config.Base):
  __tablename__ = 'episode'

  id = sa.Column(sa.Integer, sa.Sequence('episode_id_seq'), primary_key=True)
  title = sa.Column(sa.Text)
  number = sa.Column(sa.Integer)
  description = sa.Column(sa.Text)
  image_src = sa.Column(sa.Text)
  show_id = sa.Column(sa.Integer, sa.ForeignKey("show.id"), nullable=False)
  first_air = sa.Column(sa.Text)
  season = sa.Column(sa.Integer)
  is_special = sa.Column(sa.Boolean)
  last_cached_at = sa.Column(sa.DateTime(timezone=True))
  tvmaze_id = sa.Column(sa.Integer)
  tvmaze_url = sa.Column(sa.Text)

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "image_src": self.image_src,
      "first_air": self.first_air,
      "is_special": self.is_special
    }
  def __init__(self, **kwargs):
    # this will blow up if passed in a key that doesn't exist as an attribute
    # it also blows up if the ORM attempts to save without setting a title.
    # both are intended.
    for key, value in kwargs.items():
      setattr(self, key, value)

  def __repr__(self):
    return "<Episode('%d', '%s', Season: '%d')>" % (self.id, self.title, self.season)
