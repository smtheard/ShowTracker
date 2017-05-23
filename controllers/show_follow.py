import bottle
from config import app, br, sa_session
from sqlalchemy.orm import joinedload
from collections import defaultdict

from models.user import User
from models.show import Show
from models.episode import Episode
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
    return dict(redirect="/register")
