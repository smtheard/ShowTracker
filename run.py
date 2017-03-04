import bottle, sys
from bottlereact import BottleReact
from bottle.ext import beaker

PROD = '--prod' in sys.argv

app = bottle.Bottle()
br = BottleReact(app, prod=PROD)

@app.get('/')
def root():
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

app = beaker.middleware.SessionMiddleware(app, session_opts)

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
