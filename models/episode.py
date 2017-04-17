import config
import sqlalchemy as sa

class Episode(config.Base):
  __tablename__ = 'episode'

  id = sa.Column(sa.Integer, sa.Sequence('id_seq'), primary_key=True)
  title = sa.Column(sa.Text)
  number = sa.Column(sa.Integer)
  description = sa.Column(sa.Text)
  image_src = sa.Column(sa.Text)
  show_id = sa.Column(sa.Integer, sa.ForeignKey("show.id"), nullable=False)

  def __init__(self, title, number, show_id,  description=None):
    self.title = title
    self.number = number
    self.description = description
    self.show_id = show_id

  def __repr__(self):
    return "<Episode('%d', '%s')>" % (self.id, self.title)
