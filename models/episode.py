import config
import sqlalchemy as sa
from datetime import datetime

class Episode(config.Base):
  __tablename__ = 'episode'

  id = sa.Column(sa.Integer, sa.Sequence('episode_id_seq'), primary_key=True)
  title = sa.Column(sa.Text)
  number = sa.Column(sa.Integer)
  description = sa.Column(sa.Text)
  image_src = sa.Column(sa.Text)
  show_id = sa.Column(sa.Integer, sa.ForeignKey("show.id"), nullable=False)
  first_air = sa.Column(sa.DateTime(timezone=True))
  season = sa.Column(sa.Integer)
  is_special = sa.Column(sa.Boolean)
  last_cached_at = sa.Column(sa.DateTime(timezone=True))
  tvmaze_id = sa.Column(sa.Integer)
  tvmaze_url = sa.Column(sa.Text)
  created_at = sa.Column(sa.DateTime(timezone=True))

  episode_watches = sa.orm.relationship("EpisodeWatch", backref="episode")

  def to_dict(self, user=None):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "image_src": self.image_src,
      "first_air": self.first_air.strftime("%B %d, %Y") if self.first_air else "TBA",
      "is_special": self.is_special,
      "number": self.number,
      "season_number": self.season,
      "show_title": self.show.title,
      "show_path": self.show.path(),
      "watched_by_user": bool(filter(lambda uid: uid == user.id, map(lambda ew: ew.user_id, self.episode_watches))) if user else False
    }

  def __init__(self, **kwargs):
    for key, value in kwargs.items():
      setattr(self, key, value)
    self.created_at = datetime.utcnow()

  def __repr__(self):
    return "<Episode('%d', '%s', Season: '%d')>" % (self.id, self.title, self.season)
