from __future__ import division
import bottle
import math
from sqlalchemy.orm import joinedload
from sqlalchemy import func
from config import app, br, Session

from models.show import Show
from models.show_follow import ShowFollow
from models.user import User

from collections import defaultdict

@app.get('/show/<slug>')
def root(session, slug):
  user = None
  user_id = session.get("user_id")

  sa_session = Session()
  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  show = sa_session.query(Show) \
    .options(joinedload('episodes.episode_watches')) \
    .filter(func.lower(Show.slug)==func.lower(slug)).first()

  if(not show):
    bottle.abort(404, "URL Not Found")

  episodes_by_season = defaultdict(lambda: list())
  for episode in show.episodes:
    episodes_by_season[episode.season].append(episode.to_dict(user))
  
  props = show.to_page_dict()
  props["episodes_by_season"] = episodes_by_season
  props["next_episode"] = show.next_episode()
  props["key"] = "show"
  return br.render_html(
    br.BaseLayout({"current_user": user and user.to_dict()}, [
      br.ShowPage(props)
    ]),
    title="Overseer.TV Show Tracking App"
  )

@app.get('/rest/shows/<page>')
def shows_by_page(session, page):
  user_id = session.get("user_id")
  user = None

  sa_session = Session()
  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  page_count = math.ceil(sa_session.query(Show).count() / 12)
  shows = sa_session.query(Show).outerjoin(ShowFollow).group_by(Show.id).order_by(func.count(ShowFollow.id).desc()).order_by(Show.tvmaze_updated_at.desc()).limit(12).offset(int(page) * 12)

  return dict(shows=[show.to_card_dict(user=user) for show in shows], success=True, page_count=page_count)

@app.post('/rest/shows/<page>')
def shows_query(session, page):
  query = bottle.request.json["query"]

  if query == "":
    return shows_by_page(session, 0)

  user_id = session.get("user_id")
  user = None

  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  page_count = math.ceil(sa_session.query(Show).filter(Show.title.ilike('%' + query +'%')).count() / 12)
  shows = sa_session.query(Show).filter(Show.title.ilike('%' + query +'%')).limit(12).offset(int(page) * 12)

  return dict(shows=[show.to_card_dict(user=user) for show in shows], success=True, page_count=page_count)

