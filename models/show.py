from datetime import datetime
import sqlalchemy as sa
import config
from util.dateutil import UTC
from models.episode import Episode # pylint: disable=unused-import
from models.network import Network # pylint: disable=unused-import
from models.show_follow import ShowFollow # pylint: disable=unused-import
utc = UTC()

class Show(config.Base):
    __tablename__ = 'show'

    id = sa.Column(sa.Integer, sa.Sequence('show_id_seq'), primary_key=True)
    title = sa.Column(sa.Text, nullable=False, index=True)
    slug = sa.Column(sa.Text, nullable=False, index=True, unique=True)
    description = sa.Column(sa.Text)
    image_src = sa.Column(sa.Text)
    status = sa.Column(sa.Text)
    country = sa.Column(sa.Text)
    network_id = sa.Column(sa.Integer, sa.ForeignKey("network.id"))
    thetvdb_id = sa.Column(sa.Integer)
    tvrage_id = sa.Column(sa.Integer)
    imdb_id = sa.Column(sa.Text)
    tvmaze_id = sa.Column(sa.Integer)
    tvmaze_img_src = sa.Column(sa.Text)
    tvmaze_rating = sa.Column(sa.Text)
    premiere_date = sa.Column(sa.DateTime())
    schedule_days = sa.Column(sa.Text)
    schedule_time = sa.Column(sa.Text)
    tvmaze_url = sa.Column(sa.Text)
    tvmaze_updated_at = sa.Column(sa.DateTime())
    last_cached_at = sa.Column(sa.DateTime())
    created_at = sa.Column(sa.DateTime())

    episodes = sa.orm.relationship("Episode", backref="show")
    network = sa.orm.relationship("Network", uselist=False, backref="show")
    show_follows = sa.orm.relationship("ShowFollow", backref="show")

    def to_card_dict(self, user=None):
        return {
            "show_id":
            self.id,
            "title":
            self.title,
            "image_src":
            self.tvmaze_img_src,
            "description":
            self.description,
            "path":
            self.path(),
            "is_followed_by_user":
            bool(
                [uid for uid in [sf.user_id for sf in self.show_follows] if uid == user.id]
            ) if user else False
        }

    def to_page_dict(self, user=None):
        return {
            "show_id":
            self.id,
            "title":
            self.title,
            "image_src":
            self.tvmaze_img_src,
            "description":
            self.description,
            "premiere_date":
            self.premiere_date,
            "status":
            self.status,
            "country":
            self.country,
            "network":
            self.network and self.network.name,
            "imdb_url": ("https://www.imdb.com/title/" + self.imdb_id)
            if self.imdb_id else None,
            "schedule":
            self.schedule()
        }

    def schedule(self):
        if (self.schedule_time and self.schedule_days):
            return self.schedule_days + " " + datetime.strptime(
                self.schedule_time, "%H:%M").strftime("%I:%M %p")
        return ""

    def path(self):
        return "/show/" + self.slug

    def next_episode(self):
        sorted_eps = sorted(
            self.episodes, key=lambda ep: ep.first_air or ep.created_at)
        for episode in sorted_eps:
            if episode.first_air and episode.first_air > datetime.utcnow():
                return episode.first_air
        return "TBA"

    def __init__(self, **kwargs):
        # this will blow up if passed in a key that doesn't exist as an attribute
        # it also blows up if the ORM attempts to save without setting a title.
        # both are intended.
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.created_at = datetime.utcnow()

    def __repr__(self):
        return "<Show('%d', '%s')>" % (self.id, self.title)
