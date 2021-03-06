from collections import defaultdict
from sqlalchemy.orm import joinedload
from config import app, Session
from models.user import User
from models.show import Show


@app.get("/rest/episodes-by-season/<show_id>")
def get_episodes_by_season(session, show_id):
    user = None
    user_id = session.get("user_id")

    sa_session = Session()

    if user_id:
        user = sa_session.query(User).filter(User.id == user_id).first()

    show = sa_session.query(Show) \
      .options(joinedload('episodes.episode_watches')) \
      .filter(Show.id == show_id).first()

    episodes_by_season = defaultdict(list)
    for episode in show.episodes:
        episodes_by_season[episode.season].append(episode.to_dict(user))

    return dict(episodes_by_season=episodes_by_season, success=True)
