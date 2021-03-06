from datetime import datetime
import sqlalchemy as sa
import config
from models.episode_watch import EpisodeWatch # pylint: disable=unused-import

class Episode(config.Base):
    __tablename__ = 'episode'

    id = sa.Column(sa.Integer, sa.Sequence('episode_id_seq'), primary_key=True)
    title = sa.Column(sa.Text)
    number = sa.Column(sa.Integer)
    description = sa.Column(sa.Text)
    image_src = sa.Column(sa.Text)
    show_id = sa.Column(sa.Integer, sa.ForeignKey("show.id"), nullable=False)
    first_air = sa.Column(sa.DateTime())
    season = sa.Column(sa.Integer)
    is_special = sa.Column(sa.Boolean)
    last_cached_at = sa.Column(sa.DateTime())
    tvmaze_id = sa.Column(sa.Integer)
    tvmaze_url = sa.Column(sa.Text)
    created_at = sa.Column(sa.DateTime())

    episode_watches = sa.orm.relationship("EpisodeWatch", backref="episode")

    def to_dict(self, user=None):
        return {
            "id":
            self.id,
            "title":
            self.title,
            "description":
            self.description,
            "image_src":
            self.image_src,
            "first_air":
            self.first_air or "TBA",
            "is_special":
            self.is_special,
            "number":
            self.number,
            "season_number":
            self.season,
            "show_title":
            self.show.title,
            "show_path":
            self.show.path(),
            "watched_by_user":
            bool([uid for uid in [ew.user_id for ew in self.episode_watches] if uid == user.id])
            if user else False
        }

    def to_user_dict(self, user=None):
        return {
            "id":
            self.id,
            "first_air":
            self.first_air or "TBA",
            "number":
            self.number,
            "season_number":
            self.season,
            "show_title":
            self.show.title,
            "show_path":
            self.show.path(),
            "watched_by_user":
            bool([uid for uid in [ew.user_id for ew in self.episode_watches] if uid == user.id])
            if user else False
        }

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.created_at = datetime.utcnow()

    def __repr__(self):
        return "<Episode('%d', '%s', Season: '%d')>" % (self.id, self.title,
                                                        self.season)
