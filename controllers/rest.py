import bottle
from config import app, br, sa_session

from models.user import User
from models.show import Show

@app.get('/rest/shows')
def shows(session):
  if(session["user_id"]):
    return user_shows(session)
  else:
    return guest_shows(session)

def user_shows(user):
  shows = sa_session.query(Show).limit(20).all()
  return dict(shows=[show.to_card_dict() for show in shows], success=True)

def guest_shows(session):
  pass

from models.show_follow import ShowFollow

@app.get("/rest/show-follows/<show_id>")
def show_follow(session, show_id):
  if(session["user_id"]):
    show_follow = sa_session.query(ShowFollow) \
                            .filter(ShowFollow.show_id==show_id, ShowFollow.user_id==session["user_id"]) \
                            .first()
    return dict(following=(show_follow is not None), success=True)
  else:
    return dict(following=False, success=True)

@app.post("/rest/show-follows/<show_id>")
def update_show_follow(session, show_id):
  following = bottle.request.json["following"]
  user_id = session["user_id"]
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


