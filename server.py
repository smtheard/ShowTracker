import bottle, sys
import routes
from util import json_monkey_patch
from config import *

PROD = '--prod' in sys.argv

if not PROD:
  import controllers.secret_test

def run():
  bottle.debug(not PROD)
  bottle.run(
    app=app,
    host='0.0.0.0',
    port='8080',
    reloader=not PROD,
    server='tornado'
  )

session_opts = {
  'session.type': 'file',
  'session.cookie_expires': 300,
  'session.data_dir': './data',
  'session.auto': True
}

Base.metadata.create_all(engine)

app = beaker.middleware.SessionMiddleware(app, session_opts)

if __name__=='__main__':
  run()
