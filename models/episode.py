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

  episode_watches = sa.orm.relationship("EpisodeWatch", backref="episode")

  def to_dict(self, user=None):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "image_src": self.image_src,
      "first_air": dt_parse(self.first_air).strftime("%B %d, %Y") if self.first_air else "TBA", # TODO: save this as a timestamp like a sane person
      "is_special": self.is_special,
      "number": self.number,
      "watched_by_user": bool(filter(lambda uid: uid == user.id, map(lambda ew: ew.user_id, self.episode_watches))) if user else False
    }

  # TODO: remove when this is a timestamp, temp fix so I can implement other things properly
  def first_air_ts(self):
    return dt_parse(self.first_air)

  def __init__(self, **kwargs):
    for key, value in kwargs.items():
      setattr(self, key, value)

  def __repr__(self):
    return "<Episode('%d', '%s', Season: '%d')>" % (self.id, self.title, self.season)


from datetime import datetime,timedelta
def dt_parse(t):
    if(not t):
      return datetime(1970, 1, 1)
    ret = datetime.strptime(t[0:16],'%Y-%m-%dT%H:%M')
    if t[18]=='+':
        ret-=timedelta(hours=int(t[19:22]),minutes=int(t[23:]))
    elif t[18]=='-':
        ret+=timedelta(hours=int(t[19:22]),minutes=int(t[23:]))
    return ret
