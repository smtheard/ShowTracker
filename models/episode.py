import config
import sqlalchemy as sa

from datetime import datetime,timedelta
def dt_parse(t):
    ret = datetime.strptime(t[0:16],'%Y-%m-%dT%H:%M')
    if t[18]=='+':
        ret-=timedelta(hours=int(t[19:22]),minutes=int(t[23:]))
    elif t[18]=='-':
        ret+=timedelta(hours=int(t[19:22]),minutes=int(t[23:]))
    return ret

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
      "first_air": dt_parse(self.first_air).strftime("%B %d, %Y"), # self.premiere_date.strftime("%B %d, %Y")
      "is_special": self.is_special,
      "number": self.number
    }
  def __init__(self, **kwargs):
    # this will blow up if passed in a key that doesn't exist as an attribute
    # it also blows up if the ORM attempts to save without setting a title.
    # both are intended.
    for key, value in kwargs.items():
      setattr(self, key, value)

  def __repr__(self):
    return "<Episode('%d', '%s', Season: '%d')>" % (self.id, self.title, self.season)
