import config
import sqlalchemy as sa

import bcrypt

class User(config.Base):
  __tablename__ = 'user'

  id = sa.Column(sa.Integer, sa.Sequence('user_id_seq'), primary_key=True)
  username = sa.Column(sa.Text, unique=True, nullable=False, index=True)
  slug = sa.Column(sa.Text, unique=True, nullable=False, index=True)
  email = sa.Column(sa.Text, unique=True)
  password_hash = sa.Column(sa.Text)

  def to_page_dict(self):
    return { "id": self.id, 
             "username": self.username }

  def authenticate(self, password):
    return self.hash_password(password, self.password_hash.encode('utf-8')) == self.password_hash

  def hash_password(self, password, salt=None):
    return bcrypt.hashpw(password.encode('utf-8'), salt or bcrypt.gensalt())

  def __init__(self, username, password, email, slug):
    password_hash = self.hash_password(password)
    self.username = username
    self.password_hash = password_hash
    self.email = email
    self.slug = slug

  def __repr__(self):
    return "<User('%d', '%s')>" % (self.id, self.username)
