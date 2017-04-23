from config import app, br, sa_session

from models.user import User
from models.show import Show

@app.get('/rest/shows')
def shows(session):
  if(session["user_id"]):
    return user_shows(session)
  else:
    return guest_shows()

def user_shows(user):
  shows = sa_session.query(Show).limit(20).all()
  return dict(shows=[show.to_card_dict() for show in shows], success=True)

def guest_shows(session):
  pass