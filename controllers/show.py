from sqlalchemy.orm import joinedload
from config import app, br, sa_session
from models.show import Show
from util.dump import dump

@app.get('/show/<slug>')
def root(session, slug):
  show = sa_session.query(Show) \
    .options(joinedload('episodes')) \
    .filter(Show.slug==slug).first()
  return br.render_html(
    br.BaseLayout({}, [
      br.ShowPage(show.to_page_dict())
    ]),
    title="Slothy"
  )
