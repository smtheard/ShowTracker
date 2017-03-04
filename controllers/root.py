from config import app, br

@app.get('/')
def root():
  from models import User
  print User
  return br.render_html(
    br.Root({'title':'This is root'})
  )
