import bottle, sys
import routes

PROD = '--prod' in sys.argv

if PROD:
  from config_production import *
else:
  from config import *

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

session_opts = {
  'session.type': 'file',
  'session.cookie_expires': 300,
  'session.data_dir': './data',
  'session.auto': True
}

app = beaker.middleware.SessionMiddleware(app, session_opts)
