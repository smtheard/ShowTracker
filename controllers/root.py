from config import app, br

@app.get('/')
def root():
  return br.render_html(
    br.Root({'title':'This is root'})
  )
