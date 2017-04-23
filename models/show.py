import config
import sqlalchemy as sa

class Show(config.Base):
  __tablename__ = 'show'

  id = sa.Column(sa.Integer, sa.Sequence('show_id_seq'), primary_key=True)
  title = sa.Column(sa.Text, nullable=False, index=True)
  description = sa.Column(sa.Text)
  image_src = sa.Column(sa.Text)
  status = sa.Column(sa.Text)
  country = sa.Column(sa.Text)
  network_id = sa.Column(sa.Integer, sa.ForeignKey("network.id"))
  thetvdb_id = sa.Column(sa.Integer)
  tvrage_id = sa.Column(sa.Integer)
  imdb_id = sa.Column(sa.Text)
  tvmaze_id = sa.Column(sa.Integer)
  tvmaze_img_src = sa.Column(sa.Text)
  tvmaze_rating = sa.Column(sa.Text)
  premiere_date = sa.Column(sa.DateTime(timezone=True))
  schedule_days = sa.Column(sa.Text)
  schedule_time = sa.Column(sa.Text)
  tvmaze_url = sa.Column(sa.Text)
  tvmaze_updated_at = sa.Column(sa.DateTime(timezone=True))
  last_cached_at = sa.Column(sa.DateTime(timezone=True))

  def to_card_dict(self):
    return { "title": self.title, "image_src": self.tvmaze_img_src } 

  def __init__(self, **kwargs):
    # this will blow up if passed in a key that doesn't exist as an attribute
    # it also blows up if the ORM attempts to save without setting a title.
    # both are intended.
    for key, value in kwargs.items():
      setattr(self, key, value)

  # def __repr__(self):
  #   return "<Show('%d', '%s')>" % (self.id, self.title)
