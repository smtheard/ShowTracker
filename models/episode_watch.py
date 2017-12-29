from datetime import datetime
import sqlalchemy as sa
import config

class EpisodeWatch(config.Base):
    __tablename__ = 'watched_episode'

    id = sa.Column(
        sa.Integer, sa.Sequence('watched_episode_id_seq'), primary_key=True)
    episode_id = sa.Column(
        sa.Integer, sa.ForeignKey("episode.id"), nullable=False)
    user_id = sa.Column(sa.Integer, sa.ForeignKey("user.id"), nullable=False)
    created_at = sa.Column(sa.DateTime())

    episodes = sa.orm.relationship("Episode", backref="EpisodeWatch")

    def __init__(self, episode_id, user_id):
        self.episode_id = episode_id
        self.user_id = user_id
        self.created_at = datetime.utcnow()

    def __repr__(self):
        return "<EpisodeWatch(id:'%d', episode_id: '%d', user_id: '%d')>" % (
            self.id, self.episode_id, self.user_id)
