from sqlalchemy.orm import joinedload
from config import app, br, sa_session

from models.show import Show
from models.user import User
from models.show_follow import ShowFollow

from collections import defaultdict

@app.get('/user/<slug>')
def user(session, slug):
  user = None
  user_id = session.get("user_id")
  if(user_id):
    user = sa_session.query(User).filter(User.id == user_id).first()

  followed_shows = sa_session.query(Show) \
    .join(Show.show_follows) \
    .filter(ShowFollow.user_id==user_id)

  props = user.to_page_dict()
  props["followed_shows"] = map(lambda show: show.to_card_dict(user), followed_shows)
  return br.render_html(
    br.BaseLayout({}, [
      br.UserPage(props)
    ]),
    title="Slothy"
  )
