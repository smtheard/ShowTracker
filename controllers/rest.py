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
    show_follow = sa_session.query(ShowFollow).filter(Show.id==show_id).filter(User.id==session["user_id"]).first()
    return dict(following=(show_follow is not None), success=True)
  else:
    return dict(following=False, success=True)