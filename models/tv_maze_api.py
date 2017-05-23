from models.show import Show
from models.episode import Episode
from models.network import Network
from models.genre import Genre
from models.show_genre import ShowGenre
from util.dateutil import UTC
utc = UTC()
from dateutil.parser import parse
from util.sql_alchemy_helper import SQLAlchemyHelper as sa_helper
from config import sa_session
from datetime import datetime

import pytvmaze
import slugify

class TVMazeAPI(object):

  tvm = pytvmaze.TVMaze()

  @staticmethod
  def fetch(show_name=None, tvmaze_id=None):
    tvm_show = TVMazeAPI.tvm.get_show(show_name=show_name, maze_id=tvmaze_id)
    
    network = None
    if(tvm_show.network):
      network, was_created = sa_helper.get_or_create(sa_session, Network, name=tvm_show.network.name)

    show = Show(thetvdb_id=tvm_show.externals and tvm_show.externals.get("thetvdb"),
                tvrage_id=tvm_show.externals and tvm_show.externals.get("tvrage"),
                imdb_id=tvm_show.externals and tvm_show.externals.get("imdb"),
                tvmaze_id=tvm_show.maze_id,
                title=tvm_show.name,
                slug=sa_helper.generate_slug(sa_session, Show, slugify.slugify(tvm_show.name)),
                description=tvm_show.summary,
                tvmaze_img_src=tvm_show.image and tvm_show.image.get("original"),
                tvmaze_rating=tvm_show.rating and tvm_show.rating.get("average"),
                premiere_date=tvm_show.premiered,
                schedule_days=' '.join(tvm_show.schedule and tvm_show.schedule.get("days") or []),
                schedule_time=tvm_show.schedule and tvm_show.schedule.get("time"),
                status=tvm_show.status,
                tvmaze_url=tvm_show.url,
                last_cached_at=datetime.utcnow(),
                network_id=network and network.id,
                tvmaze_updated_at=datetime.fromtimestamp(tvm_show.updated, utc)
                )

    sa_session.add(show)
    sa_session.flush()

    for tvm_episode in tvm_show.episodes:
      print(tvm_episode.airstamp)
      print(parse(tvm_episode.airstamp))
      episode = Episode(
        first_air=parse(tvm_episode.airstamp).astimezone(utc),
        number=tvm_episode.episode_number,
        tvmaze_id=tvm_episode.maze_id,
        season=tvm_episode.season_number,
        is_special=tvm_episode.special,
        description=tvm_episode.summary,
        title=tvm_episode.title,
        tvmaze_url=tvm_episode.url,
        last_cached_at=datetime.utcnow(),
        show_id=show.id
        )
      sa_session.add(episode)

    for tvm_genre in tvm_show.genres:
      genre, was_created = sa_helper.get_or_create(sa_session, Genre, name=tvm_genre)
      sa_helper.get_or_create(sa_session, ShowGenre, show_id=show.id, genre_id=genre.id)

    sa_session.commit()

  @staticmethod
  def sync_cache(re_cache_all=False):
    tvm_updates = pytvmaze.show_updates().updates

    show_objects = sa_session.query(Show).filter(Show.tvmaze_id.in_(tvm_updates.keys()))
    show_dict = {show.tvmaze_id: show for show in show_objects}

    for tvm_id, update in tvm_updates.items():
      show = show_dict.get(tvm_id)
      if(show is None):
        TVMazeAPI.fetch(tvmaze_id=tvm_id)
      elif(datetime.fromtimestamp(update.seconds_since_epoch, utc) > show.last_cached_at):
        TVMazeAPI.refresh(show)
