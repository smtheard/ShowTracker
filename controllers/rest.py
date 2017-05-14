import bottle
from config import app, br, sa_session
from sqlalchemy.orm import joinedload
from collections import defaultdict

from models.user import User
from models.show import Show
from models.episode import Episode

@app.get('/rest/shows')
def shows(session):
  user_id = session.get("user_id")
  user = None

  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  shows = sa_session.query(Show).options(joinedload('show_follows')).limit(100).all()

  return dict(shows=[show.to_card_dict(user=user) for show in shows], success=True)

from models.show_follow import ShowFollow

@app.get("/rest/show-follow/<show_id>")
def show_follow(session, show_id):
  user_id = session.get("user_id")
  if(user_id):
    show_follow = sa_session.query(ShowFollow) \
                            .filter(ShowFollow.show_id == show_id, ShowFollow.user_id==user_id) \
                            .first()
    return dict(following=(show_follow is not None), success=True)
  else:
    return dict(following=False, success=True)

@app.post("/rest/show-follow/<show_id>")
def update_show_follow(session, show_id):
  following = bottle.request.json["following"]
  user_id = session.get("user_id")
  if(user_id):
    if(following):
      sa_session.query(ShowFollow) \
                .filter(ShowFollow.show_id == show_id, ShowFollow.user_id == user_id) \
                .delete()
      return dict(following=False, success=True)
    else:
      show_follow = ShowFollow(show_id=show_id, user_id=user_id)
      sa_session.add(show_follow)
      sa_session.commit()
      return dict(following=True, success=True)
  else:
    raise "guest users can't follow shows"

from models.episode_watch import EpisodeWatch

@app.get("/rest/episode-watch/<episode_id>")
def episode_watch(session, episode_id):
  user_id = session.get("user_id")
  if(user_id):
    episode_watch = sa_session.query(EpisodeWatch) \
                              .filter(EpisodeWatch.episode_id == episode_id, EpisodeWatch.user_id==user_id) \
                              .first()
    return dict(watched=(episode_watch is not None), success=True)
  else:
    return dict(watched=False, success=True)

@app.post("/rest/episode-watch/<episode_id>")
def update_episode_watch(session, episode_id):
  watched = bottle.request.json["watched"]
  user_id = session["user_id"]
  if(user_id):
    if(watched):
      sa_session.query(EpisodeWatch) \
                .filter(EpisodeWatch.episode_id == episode_id, EpisodeWatch.user_id == user_id) \
                .delete()
      return dict(watched=False, success=True)
    else:
      episode_watch = EpisodeWatch(episode_id=episode_id, user_id=user_id)
      sa_session.add(episode_watch)
      sa_session.commit()
      return dict(watched=True, success=True)
  else:
    raise "guest users can't follow shows"

@app.get("/rest/show-watch/<show_id>")
def episode_watches_for_show(session, show_id):
  user_id = session.get("user_id")
  if(user_id):
    episodes_watched = sa_session.query(EpisodeWatch) \
                              .filter(EpisodeWatch.user_id == user_id) \
                              .join(EpisodeWatch.episodes) \
                              .filter(Episode.show_id == show_id) \
                              .count()
    episode_count = sa_session.query(Show).join(Show.episodes).filter(Show.id == show_id).count()
    return dict(watched=(episodes_watched == episode_count), success=True)
  else:
    return dict(watched=False, success=True)

@app.post("/rest/show-watch/<show_id>")
def update_episode_watches_for_show(session, show_id):
  watched = bottle.request.json["watched"]
  user_id = session["user_id"]
  if(user_id):
    episode_watches = sa_session.query(EpisodeWatch) \
              .filter(EpisodeWatch.user_id == user_id) \
              .join(EpisodeWatch.episodes) \
              .filter(Episode.show_id == show_id) \
              .all()
    episode_watch_ids = map(lambda ew: ew.id, episode_watches)
    sa_session.query(EpisodeWatch).filter(EpisodeWatch.id.in_(episode_watch_ids)).delete(synchronize_session='fetch')
    sa_session.commit()
    if(watched):
      return dict(watched=False, success=True)
    else:
      episodes = sa_session.query(Episode).filter(Episode.show_id == show_id).all()
      for episode in episodes:
        episode_watch = EpisodeWatch(episode_id=episode.id, user_id=user_id)
        sa_session.add(episode_watch)
      sa_session.commit()
      return dict(watched=True, success=True)
  else:
    raise "guest users can't follow shows"

@app.get("/rest/episodes-by-season/<show_id>")
def episodes_by_season(session, show_id):
  user = None
  user_id = session.get("user_id")
  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  show = sa_session.query(Show) \
    .options(joinedload('episodes.episode_watches')) \
    .filter(Show.id==show_id).first()

  episodes_by_season = defaultdict(lambda: list())
  for episode in show.episodes:
    episodes_by_season[episode.season].append(episode.to_dict(user))

  return dict(episodes_by_season=episodes_by_season, success=True)

@app.get("/rest/season-watch/<show_id>/<season_number>")
def season_watch(session, show_id, season_number):
  user_id = session.get("user_id")
  if(user_id):
    episodes_watched = sa_session.query(EpisodeWatch) \
                              .filter(EpisodeWatch.user_id == user_id) \
                              .join(EpisodeWatch.episodes) \
                              .filter(Episode.show_id == show_id) \
                              .filter(Episode.season == season_number) \
                              .count()
    episode_count = sa_session.query(Show).join(Show.episodes).filter(Episode.season == season_number).filter(Show.id == show_id).count()
    return dict(watched=(episodes_watched == episode_count), success=True)
  else:
    return dict(watched=False, success=True)
