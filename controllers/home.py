from config import app, br

@app.get('/')
def root(session):
  return br.render_html(
    br.BaseLayout({}, [
      br.Home({})
    ]),
    title="Slothy"
  )
