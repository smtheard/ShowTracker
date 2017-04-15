import config
import sqlalchemy as sa

import bcrypt

class User(config.Base):
  __tablename__ = 'user'

  id = sa.Column(sa.Integer, sa.Sequence('id_seq'), primary_key=True)
  username = sa.Column(sa.Text)
  password_hash = sa.Column(sa.Text)

  def authenticate(self, password):
    return self.hash_password(password, self.password_hash) == self.password_hash

  def hash_password(self, password, salt=None):
    return bcrypt.hashpw(password.encode('utf-8'), salt or bcrypt.gensalt())

  def __init__(self, username, password):
    password_hash = self.hash_password(password)
    self.username = username
    self.password_hash = password_hash

  def __repr__(self):
    return "<User('%d', '%s')>" % (self.id, self.username)
