from config import app, br

@app.get('/login')
def root():
  return br.render_html(
    br.Login({'name':'World'})
  )

@app.get('/register')
def root():
  return br.render_html(
    br.Login({'name':'World'})
  )