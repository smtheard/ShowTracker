import config
import sqlalchemy as sa
from datetime import datetime
from util.dateutil import UTC
utc = UTC()

from config import sa_session

class Show(config.Base):
  __tablename__ = 'show'

  id = sa.Column(sa.Integer, sa.Sequence('show_id_seq'), primary_key=True)
  title = sa.Column(sa.Text, nullable=False, index=True)
  slug = sa.Column(sa.Text, nullable=False, index=True, unique=True)
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
  created_at = sa.Column(sa.DateTime(timezone=True))

  episodes = sa.orm.relationship("Episode", backref="show")
  network = sa.orm.relationship("Network", uselist=False, backref="show")
  show_follows = sa.orm.relationship("ShowFollow", backref="show")

  def to_card_dict(self, user=None):
    return { "show_id": self.id,
             "title": self.title,
             "image_src": self.tvmaze_img_src,
             "description": self.description,
             "path": self.path(),
             "is_followed_by_user": bool(filter(lambda uid: uid == user.id, map(lambda sf: sf.user_id, self.show_follows))) if user else False }

  def to_page_dict(self, user=None):
    return { "show_id": self.id,
             "title": self.title,
             "image_src": self.tvmaze_img_src,
             "description": self.description,
             "premiere_date": self.premiere_date.strftime("%B %d, %Y"),
             "status": self.status,
             "country": self.country,
             "network": self.network.name,
             "imdb_url": "https://www.imdb.com/title/" + self.imdb_id,
             "schedule": self.schedule() }

  def schedule(self):
    return self.schedule_days + " " + datetime.strptime(self.schedule_time, "%H:%M").strftime("%I:%M %p") + " (EST)"

  def path(self):
    return "/show/" + self.slug

  def next_episode(self):
    sorted_eps = sorted(self.episodes, key=lambda ep: ep.first_air)
    for episode in sorted_eps:
      if episode.first_air > datetime.now(utc):
        return episode.first_air.strftime("%B %d, %Y")
    return "TBA"

  def __init__(self, **kwargs):
    # this will blow up if passed in a key that doesn't exist as an attribute
    # it also blows up if the ORM attempts to save without setting a title.
    # both are intended.
    for key, value in kwargs.items():
      setattr(self, key, value)
    self.created_at = datetime.utcnow()

  def __repr__(self):
    return "<Show('%d', '%s')>" % (self.id, self.title)
