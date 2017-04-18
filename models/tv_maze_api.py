from models.show import Show
from models.episode import Episode
from models.network import Network
from models.genre import Genre

import datetime
import pytvmaze

class TVMazeAPI():

  tvm = pytvmaze.TVMaze()

  def fetch(self, show_name):
    tvm_show = self.tvm.get_show(show_name=show_name)
    dump(tvm_show)
    dump(tvm_show.episodes[1])

    show = Show(thetvdb_id=tvm_show.externals.get("thetvdb"),
                tvrage_id=tvm_show.externals.get("tvrage"),
                imdb_id=tvm_show.externals.get("imdb"),
                tvmaze_id=tvm_show.maze_id,
                title=tvm_show.name,
                description=tvm_show.summary,
                tvmaze_img_src=tvm_show.image.get("original"),
                tvmaze_rating=tvm_show.rating,
                premiere_date=tvm_show.premiered,
                schedule_days=' '.join(tvm_show.schedule.get("days") or []),
                schedule_time=tvm_show.schedule.get("time"),
                status=tvm_show.status,
                tvm_url=tvm_show.url,
                last_cached_at=datetime.datetime.now()
                    # query db for network, create if not exists
                    # add network_id to show
                )
    # save show so we have a show_id
    for tvm_episode in show.episodes:
      episode = Episode(
        first_air=tvm_episode.airstamp,
        number=tvm_episode.episode_number,
        tvmaze_id=tvm_episode.maze_id,
        season=tvm_episode.season_number,
        is_special=tvm_episode.special,
        description=tvm_episode.summary,
        title=tvm_episode.title,
        tvm_url=tvm.url,
        last_cached_at=datetime.datetime.now(),
        show_id=show.id
        )
      # save episode

    for tvm_genre in show.genres:
      # query db for genre, create if not exists
      # create ShowGenre if not exists




def dump(obj):
  for attr in dir(obj):
    print "obj.%s = %s" % (attr, getattr(obj, attr))