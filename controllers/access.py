import bottle
from config import app, br, sa_session
from models.user import User

# Login Routes

@app.get('/login')
def login():
  return br.render_html(
    br.Login({'name':'World'})
  )


# Register Routes

@app.get('/register')
def register():
  return br.render_html(
    br.Register({'name':'World'})
  )

@app.post('/register')
def register_submit():
  print bottle.request.json
  print "*****************"
  user_name = bottle.request.json["username"]
  password = bottle.request.json["password"]
  user = User(user_name=user_name, password=password)
  sa_session.add(user)
  sa_session.commit()
  print user

