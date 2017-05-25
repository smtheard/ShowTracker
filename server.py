import bottle, sys
import routes

PROD = '--prod' in sys.argv

if PROD:
  from config_prod import *
else:
  from config import *
  import controllers.secret_test

def run():
  bottle.debug(not PROD)
  bottle.run(
    app=app,
    host='localhost',
    port='8080',
    reloader=not PROD,
    server='paste'
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


