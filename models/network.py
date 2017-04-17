import config
import sqlalchemy as sa

class Network(config.Base):
  __tablename__ = 'network'

  id = sa.Column(sa.Integer, sa.Sequence('id_seq'), primary_key=True)
  name = sa.Column(sa.Text, nullable=False)
  image_src = sa.Column(sa.Text)

  def __init__(self, name, image_src=None):
    self.name = name
    self.image_src = image_src

  def __repr__(self):
    return "<Network('%d', '%s')>" % (self.id, self.name)
