import bottle
from config import app, br, Session
from sqlalchemy.orm import joinedload
from collections import defaultdict

from models.user import User
from models.show import Show
from models.episode import Episode
from models.show_follow import ShowFollow
from models.episode_watch import EpisodeWatch


@app.get("/rest/episode-watch/<episode_id>")
def episode_watch(session, episode_id):
    user_id = session.get("user_id")
    if (user_id):
        sa_session = Session()
        episode_watch = sa_session.query(EpisodeWatch) \
                                  .filter(EpisodeWatch.episode_id == episode_id, EpisodeWatch.user_id==user_id) \
                                  .first()
        return dict(watched=(episode_watch is not None), success=True)
    else:
        return dict(watched=False, success=True)


@app.post("/rest/episode-watch/<episode_id>")
def update_episode_watch(session, episode_id):
    watched = bottle.request.json["watched"]
    user_id = session["user_id"]
    if (user_id):
        sa_session = Session()
        if (watched):
            sa_session.query(EpisodeWatch) \
                      .filter(EpisodeWatch.episode_id == episode_id, EpisodeWatch.user_id == user_id) \
                      .delete()
            sa_session.commit()
            return dict(watched=False, success=True)
        else:
            episode_watch = EpisodeWatch(episode_id=episode_id, user_id=user_id)
            sa_session.add(episode_watch)
            sa_session.commit()
            return dict(watched=True, success=True)
    else:
        return dict(redirect="/register")


@app.get("/rest/show-watch/<show_id>")
def episode_watches_for_show(session, show_id):
    user_id = session.get("user_id")
    if (user_id):
        sa_session = Session()
        episodes_watched = sa_session.query(EpisodeWatch) \
                                  .filter(EpisodeWatch.user_id == user_id) \
                                  .join(EpisodeWatch.episodes) \
                                  .filter(Episode.show_id == show_id) \
                                  .count()
        episode_count = sa_session.query(Show).join(Show.episodes).filter(
            Show.id == show_id).count()
        return dict(watched=(episodes_watched == episode_count), success=True)
    else:
        return dict(watched=False, success=True)


@app.post("/rest/show-watch/<show_id>")
def update_episode_watches_for_show(session, show_id):
    watched = bottle.request.json["watched"]
    user_id = session["user_id"]
    if (user_id):
        sa_session = Session()
        episode_watches = sa_session.query(EpisodeWatch) \
                  .filter(EpisodeWatch.user_id == user_id) \
                  .join(EpisodeWatch.episodes) \
                  .filter(Episode.show_id == show_id) \
                  .all()
        episode_watch_ids = map(lambda ew: ew.id, episode_watches)
        sa_session.query(EpisodeWatch).filter(
            EpisodeWatch.id.in_(episode_watch_ids)).delete(
                synchronize_session='fetch')
        sa_session.commit()
        if (watched):
            return dict(watched=False, success=True)
        else:
            episodes = sa_session.query(Episode).filter(
                Episode.show_id == show_id).all()
            for episode in episodes:
                episode_watch = EpisodeWatch(
                    episode_id=episode.id, user_id=user_id)
                sa_session.add(episode_watch)
            sa_session.commit()
            return dict(watched=True, success=True)
    else:
        return dict(redirect="/register")


@app.get("/rest/season-watch/<show_id>/<season_number>")
def season_watch(session, show_id, season_number):
    user_id = session.get("user_id")
    if (user_id):
        sa_session = Session()
        episodes_watched = sa_session.query(EpisodeWatch) \
                                  .filter(EpisodeWatch.user_id == user_id) \
                                  .join(EpisodeWatch.episodes) \
                                  .filter(Episode.show_id == show_id) \
                                  .filter(Episode.season == season_number) \
                                  .count()
        episode_count = sa_session.query(Show) \
                                  .join(Show.episodes) \
                                  .filter(Episode.season == season_number) \
                                  .filter(Show.id == show_id).count()
        return dict(watched=(episodes_watched == episode_count), success=True)
    else:
        return dict(watched=False, success=True)


@app.post("/rest/season-watch/<show_id>/<season_number>")
def update_season_watch(session, show_id, season_number):
    watched = bottle.request.json["watched"]
    user_id = session["user_id"]
    if (user_id):
        sa_session = Session()
        episode_watches = sa_session.query(EpisodeWatch) \
                  .filter(EpisodeWatch.user_id == user_id) \
                  .join(EpisodeWatch.episodes) \
                  .filter(Episode.show_id == show_id) \
                  .filter(Episode.season == season_number) \
                  .all()
        episode_watch_ids = map(lambda ew: ew.id, episode_watches)
        sa_session.query(EpisodeWatch).filter(
            EpisodeWatch.id.in_(episode_watch_ids)).delete(
                synchronize_session='fetch')
        sa_session.commit()
        if (watched):
            return dict(watched=False, success=True)
        else:
            episodes = sa_session.query(Episode) \
                                 .filter(Episode.show_id == show_id) \
                                 .filter(Episode.season == season_number) \
                                 .all()
            for episode in episodes:
                episode_watch = EpisodeWatch(
                    episode_id=episode.id, user_id=user_id)
                sa_session.add(episode_watch)
            sa_session.commit()
            return dict(watched=True, success=True)
    else:
        return dict(redirect="/register")
