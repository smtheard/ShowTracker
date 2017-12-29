import sys
import bottle_session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from bottlereact import BottleReact
from bottle.ext import sqlalchemy
import bottle

PROD = '--prod' in sys.argv

Base = declarative_base()
engine = create_engine(
    'postgresql+psycopg2://stefan:test@localhost:5432/slothy_development',
    echo=True)
db_plugin = sqlalchemy.Plugin(
    engine,
    Base.metadata,
    keyword='db',
    create=True,
    commit=True,
    use_kwargs=False
)

Session = sessionmaker(bind=engine)

app = application = bottle.Bottle()

app.install(db_plugin)
app.install(bottle_session.SessionPlugin(
    cookie_lifetime=31540000))  # 1 year in seconds

br = BottleReact(app, prod=PROD, default_render_html_kwargs={"PROD": PROD})
