import config
import sqlalchemy as sa

class User(config.Base):
  __tablename__ = 'user'
  id = sa.Column(sa.Integer, sa.Sequence('id_seq'), primary_key=True)
  user_name = sa.Column(String(50))

  def __init__(self, user_name):
    self.user_name = user_name

  def __repr__(self):
    return "<User('%d', '%s')>" % (self.id, self.user_name)
