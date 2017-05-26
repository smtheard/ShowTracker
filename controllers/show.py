from sqlalchemy.orm import joinedload
from sqlalchemy import func
from config import app, br, sa_session

from models.show import Show
from models.user import User

from collections import defaultdict

@app.get('/show/<slug>')
def root(session, slug):
  user = None
  user_id = session.get("user_id")
  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  show = sa_session.query(Show) \
    .options(joinedload('episodes.episode_watches')) \
    .filter(func.lower(Show.slug)==func.lower(slug)).first()

  episodes_by_season = defaultdict(lambda: list())
  for episode in show.episodes:
    episodes_by_season[episode.season].append(episode.to_dict(user))
  
  props = show.to_page_dict()
  props["episodes_by_season"] = episodes_by_season
  props["next_episode"] = show.next_episode()
  return br.render_html(
    br.BaseLayout({"current_user": user and user.to_dict()}, [
      br.ShowPage(props)
    ]),
    title="Overseer.TV Show Tracking App"
  )

@app.get('/rest/shows')
def shows(session):
  user_id = session.get("user_id")
  user = None

  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  shows = sa_session.query(Show).options(joinedload('show_follows')).limit(100).all()

  return dict(shows=[show.to_card_dict(user=user) for show in shows], success=True)
