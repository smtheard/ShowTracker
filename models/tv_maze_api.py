from models.show import Show
from models.episode import Episode
from models.network import Network
from models.genre import Genre
from models.show_genre import ShowGenre

from models.sql_alchemy_helper import SQLAlchemyHelper as sa_helper
from config import sa_session

import datetime
import pytvmaze

class TVMazeAPI(object):

  tvm = pytvmaze.TVMaze()

  @staticmethod
  def fetch(show_name):
    tvm_show = TVMazeAPI.tvm.get_show(show_name=show_name)

    network, was_created = sa_helper.get_or_create(sa_session, Network, name=tvm_show.network.name)

    show = Show(thetvdb_id=tvm_show.externals.get("thetvdb"),
                tvrage_id=tvm_show.externals.get("tvrage"),
                imdb_id=tvm_show.externals.get("imdb"),
                tvmaze_id=tvm_show.maze_id,
                title=tvm_show.name,
                description=tvm_show.summary,
                tvmaze_img_src=tvm_show.image.get("original"),
                tvmaze_rating=tvm_show.rating.get("average"),
                premiere_date=tvm_show.premiered,
                schedule_days=' '.join(tvm_show.schedule.get("days") or []),
                schedule_time=tvm_show.schedule.get("time"),
                status=tvm_show.status,
                tvmaze_url=tvm_show.url,
                last_cached_at=datetime.datetime.now(),
                network_id=network.id
                )

    sa_session.add(show)
    sa_session.flush()

    for tvm_episode in tvm_show.episodes:
      episode = Episode(
        first_air=tvm_episode.airstamp,
        number=tvm_episode.episode_number,
        tvmaze_id=tvm_episode.maze_id,
        season=tvm_episode.season_number,
        is_special=tvm_episode.special,
        description=tvm_episode.summary,
        title=tvm_episode.title,
        tvmaze_url=tvm_episode.url,
        last_cached_at=datetime.datetime.now(),
        show_id=show.id
        )
      sa_session.add(episode)

    for tvm_genre in tvm_show.genres:
      genre, was_created = sa_helper.get_or_create(sa_session, Genre, name=tvm_genre)
      sa_helper.get_or_create(sa_session, ShowGenre, show_id=show.id, genre_id=genre.id)


    sa_session.commit()

def dump(obj):
  for attr in dir(obj):
    print "obj.%s = %s" % (attr, getattr(obj, attr))
