import bottle
from config import app, br, sa_session
from models.user import User

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
    title="Slothy"
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
    title="Slothy"
  )

@app.post('/register')
def register_submit(session):
  username = bottle.request.json["username"]
  password = bottle.request.json["password"]
  user = User(username=username, password=password)
  sa_session.add(user)
  sa_session.commit()
  session["user_id"] = user.id
  return {"success": True}
