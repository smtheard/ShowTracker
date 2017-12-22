import bottle
import datetime
import dateutil.relativedelta
from sqlalchemy.orm import joinedload
from sqlalchemy import func
from config import app, br, Session

from models.show import Show
from models.user import User
from models.show_follow import ShowFollow
from models.episode import Episode

from collections import defaultdict

@app.get('/user/<slug>')
def user(session, slug):
  current_user = None
  current_user_id = session.get("user_id")
  sa_session = Session()
  if(current_user_id):
    current_user = sa_session.query(User).filter(User.id == current_user_id).first()

  user_being_viewed = sa_session.query(User).filter(func.lower(User.slug) == func.lower(slug)).first()

  if(not user_being_viewed):
    bottle.abort(404, "URL Not Found")

  followed_shows = sa_session.query(Show) \
    .join(Show.show_follows) \
    .filter(ShowFollow.user_id==user_being_viewed.id) \
    .options(joinedload("show_follows"))

  two_months = dateutil.relativedelta.relativedelta(months=2)
  now = datetime.datetime.now()
  recent_episodes = sa_session.query(Episode) \
    .filter(Episode.first_air.between( now - two_months, now + two_months )) \
    .filter(Episode.show_id.in_(map(lambda show: show.id, followed_shows))) \
    .options(joinedload("episode_watches")) \
    .options(joinedload("show"))

  props = user_being_viewed.to_page_dict()
  props["followed_shows"] = map(lambda show: show.to_card_dict(user_being_viewed), followed_shows)
  props["episodes"] = map(lambda episode: episode.to_user_dict(current_user), recent_episodes)
  props["key"] = "user"
  return br.render_html(
    br.BaseLayout({"current_user": current_user and current_user.to_dict()}, [
      br.UserPage(props)
    ]),
    title="Overseer.TV Show Tracking App"
  )
