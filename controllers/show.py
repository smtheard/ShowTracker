from sqlalchemy.orm import joinedload
from config import app, br, sa_session
from models.show import Show
from util.dump import dump
from collections import defaultdict

@app.get('/show/<slug>')
def root(session, slug):
  show = sa_session.query(Show) \
    .options(joinedload('episodes')) \
    .filter(Show.slug==slug).first()

  episodes_by_season = defaultdict(lambda: list())
  for episode in show.episodes:
    episodes_by_season[episode.season].append(episode.to_dict())
  
  props = show.to_page_dict()
  props["episodes_by_season"] = episodes_by_season
  props["next_episode"] = show.next_episode()
  return br.render_html(
    br.BaseLayout({}, [
      br.ShowPage(props)
    ]),
    title="Slothy"
  )
