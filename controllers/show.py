from sqlalchemy.orm import joinedload
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
    .filter(Show.slug==slug).first()

  episodes_by_season = defaultdict(lambda: list())
  for episode in show.episodes:
    episodes_by_season[episode.season].append(episode.to_dict(user))
  
  props = show.to_page_dict()
  props["episodes_by_season"] = episodes_by_season
  props["next_episode"] = show.next_episode()
  return br.render_html(
    br.BaseLayout({}, [
      br.ShowPage(props)
    ]),
    title="Slothy"
  )
