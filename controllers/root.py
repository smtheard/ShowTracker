from config import app, br

@app.get('/')
def root(session):
  print("session user id: " + session.get("user_id"))
  return br.render_html(
    br.BaseLayout({}),
    title="Slothy"
  )
