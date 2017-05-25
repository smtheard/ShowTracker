import config
import sqlalchemy as sa
from datetime import datetime

class ShowFollow(config.Base):
  __tablename__ = 'show_follow'

  id = sa.Column(sa.Integer, sa.Sequence('show_follow_id_seq'), primary_key=True)
  show_id = sa.Column(sa.Integer, sa.ForeignKey("show.id"), nullable=False)
  user_id = sa.Column(sa.Integer, sa.ForeignKey("user.id"), nullable=False)
  created_at = sa.Column(sa.DateTime())

  def __init__(self, show_id, user_id):
    self.show_id = show_id
    self.user_id = user_id
    self.created_at = datetime.utcnow()

  def __repr__(self):
    return "<ShowFollow(id:'%d', show_id: '%d', user_id: '%d')>" % (self.id, self.show_id, self.user_id)
