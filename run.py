import bottle, sys
from bottlereact import BottleReact
from bottle.ext import beaker
from config import *

PROD = '--prod' in sys.argv

app = bottle.Bottle()

app.install(plugin)

br = BottleReact(app, prod=PROD)

@app.get('/')
def root():
  from models import User
  print User
  return br.render_html(
    br.Root({'title':'This is root'})
  )

@app.get('/login')
def root():
  return br.render_html(
    br.Login({'name':'World'})
  )

session_opts = {
  'session.type': 'file',
  'session.cookie_expires': 300,
  'session.data_dir': './data',
  'session.auto': True
}

def run():
  bottle.debug(not PROD)
  bottle.run(
    app=app, 
    host='localhost',
    port='8080',
    reloader=not PROD
  )

if __name__=='__main__':
  run()

app = beaker.middleware.SessionMiddleware(app, session_opts)
