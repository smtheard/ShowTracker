import bottle
from config import app, br, sa_session
from sqlalchemy.orm import joinedload

from models.user import User
from models.show import Show

@app.get('/rest/shows')
def shows(session):
  user_id = session.get("user_id")
  user = None

  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  shows = sa_session.query(Show).options(joinedload('show_follows')).limit(1500).all()

  return dict(shows=[show.to_card_dict(user=user) for show in shows], success=True)

from models.show_follow import ShowFollow

@app.get("/rest/show-follows/<show_id>")
def show_follow(session, show_id):
  user_id = session.get("user_id")
  if(user_id):
    show_follow = sa_session.query(ShowFollow) \
                            .filter(ShowFollow.show_id==show_id, ShowFollow.user_id==user_id) \
                            .first()
    return dict(following=(show_follow is not None), success=True)
  else:
    return dict(following=False, success=True)

@app.post("/rest/show-follows/<show_id>")
def update_show_follow(session, show_id):
  following = bottle.request.json["following"]
  user_id = session.get("user_id")
  if(user_id):
    if(following):
      sa_session.query(ShowFollow) \
                .filter(ShowFollow.show_id==show_id, ShowFollow.user_id == user_id) \
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

@app.get("/rest/episode-watch/episode/<episode_id>")
def episode_watch(session, episode_id):
  user_id = session.get("user_id")
  if(user_id):
    episode_watch = sa_session.query(EpisodeWatch) \
                            .filter(EpisodeWatch.episode_id==episode_id, EpisodeWatch.user_id==user_id) \
                            .first()
    return dict(watched=(episode_watch is not None), success=True)
  else:
    return dict(watched=False, success=True)

@app.post("/rest/episode-watch/episode/<episode_id>")
def update_episode_watch(session, episode_id):
  watched = bottle.request.json["watched"]
  user_id = session["user_id"]
  if(user_id):
    if(watched):
      sa_session.query(EpisodeWatch) \
                .filter(EpisodeWatch.episode_id==episode_id, EpisodeWatch.user_id == user_id) \
                .delete()
      return dict(watched=False, success=True)
    else:
      episode_watch = EpisodeWatch(episode_id=episode_id, user_id=user_id)
      sa_session.add(episode_watch)
      sa_session.commit()
      return dict(watched=True, success=True)
  else:
    raise "guest users can't follow shows"