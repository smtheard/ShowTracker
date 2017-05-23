import config
import sqlalchemy as sa
from datetime import datetime

class Network(config.Base):
  __tablename__ = 'network'

  id = sa.Column(sa.Integer, sa.Sequence('network_id_seq'), primary_key=True)
  name = sa.Column(sa.Text, nullable=False)
  image_src = sa.Column(sa.Text)
  created_at = sa.Column(sa.DateTime(timezone=True))

  def __init__(self, name, image_src=None):
    self.name = name
    self.image_src = image_src
    self.created_at = datetime.utcnow()

  def __repr__(self):
    return "<Network('%d', '%s')>" % (self.id, self.name)
