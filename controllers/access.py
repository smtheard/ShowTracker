import bottle
from config import app, br, sa_session
from util.sql_alchemy_helper import SQLAlchemyHelper as sa_helper
from models.user import User

import slugify

# Login Routes

@app.get('/login')
def login():
  return br.render_html(
    br.BaseLayout({}, [
      br.Access({
        "callback_url": "/login",
        "title": "Login"
        })
      ]
    ),
    title="Overseer.TV Show Tracking App"
  )

@app.post('/login')
def login_submit(session):
  username = bottle.request.json["username"]
  password = bottle.request.json["password"]
  
  user = sa_session.query(User).filter_by(username=username).first()

  if(user is None):
    return {"success": False, "error_message": "no user with username: " + username}

  if(user.authenticate(password)):
    session["user_id"] = user.id
    return {"success": True}
  else:
    return {"success": False, "error_message": "invalid password"}


# Register Routes

@app.get('/register')
def register():
  return br.render_html(
    br.BaseLayout({}, [
      br.Access({
        "callback_url": "/register",
        "confirm": True,
        "title": "Register"
        })
      ]
    ),
    title="Overseer.TV Show Tracking App"
  )

@app.post('/register')
def register_submit(session):
  username = bottle.request.json["username"]
  password = bottle.request.json["password"]
  email = bottle.request.json.get("email")
  user = User(username=username,
              password=password,
              email=email,
              slug=sa_helper.generate_slug(sa_session, User, slugify.slugify(username)))
  sa_session.add(user)
  sa_session.commit()
  session["user_id"] = user.id
  return {"success": True}

@app.get('/logout')
def logout(session):
  session.destroy()
  bottle.redirect("/")
