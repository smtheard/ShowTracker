import config
import sqlalchemy as sa

class EpisodeWatch(config.Base):
  __tablename__ = 'watched_episode'

  id = sa.Column(sa.Integer, sa.Sequence('watched_episode_id_seq'), primary_key=True)
  episode_id = sa.Column(sa.Integer, nullable=False)
  user_id = sa.Column(sa.Integer, nullable=False)

  def __init__(self, episode_id, user_id):
    self.episode_id = episode_id
    self.user_id = user_id

  def __repr__(self):
    return "<EpisodeWatch(id:'%d', episode_id: '%d', user_id: '%d')>" % (self.id, self.episode_id, self.user_id)