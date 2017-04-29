import bottle
import bottle_session
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from bottlereact import BottleReact
from bottle.ext import beaker

Base = declarative_base()
engine = create_engine('postgresql+psycopg2://stefan:test@localhost:5432/slothy_development', echo=True)
db_plugin = sqlalchemy.Plugin(
    engine, # SQLAlchemy engine created with create_engine function.
    Base.metadata, # SQLAlchemy metadata, required only if create=True.
    keyword='db', # Keyword used to inject session database in a route (default 'db').
    create=True, # If it is true, execute `metadata.create_all(engine)` when plugin is applied (default False).
    commit=True, # If it is true, plugin commit changes after route is executed (default True).
    use_kwargs=False # If it is true and keyword is not defined, plugin uses **kwargs argument to inject session database (default False).
)

Session = sessionmaker(bind=engine)
sa_session = Session()

app = bottle.Bottle()

app.install(db_plugin)
app.install(bottle_session.SessionPlugin(cookie_lifetime=31540000)) # 1 year in seconds

br = BottleReact(app, prod=False)
