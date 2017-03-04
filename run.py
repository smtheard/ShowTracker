import bottle, sys
from bottlereact import BottleReact

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
