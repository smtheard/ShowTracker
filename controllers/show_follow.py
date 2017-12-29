import bottle
from config import app, Session
from models.show_follow import ShowFollow

@app.get("/rest/show-follow/<show_id>")
def get_show_follow(session, show_id):
    user_id = session.get("user_id")
    if user_id:
        sa_session = Session()
        show_follow = sa_session.query(ShowFollow) \
                                .filter(ShowFollow.show_id == show_id, ShowFollow.user_id == user_id) \
                                .first()
        return dict(following=(show_follow is not None), success=True)
    return dict(following=False, success=True)


@app.post("/rest/show-follow/<show_id>")
def update_show_follow(session, show_id):
    following = bottle.request.json.following
    user_id = session.get("user_id")
    if user_id:
        sa_session = Session()
        if following:
            sa_session.query(ShowFollow) \
                      .filter(ShowFollow.show_id == show_id, ShowFollow.user_id == user_id) \
                      .delete()
            return dict(following=False, success=True)
        show_follow = ShowFollow(show_id=show_id, user_id=user_id)
        sa_session.add(show_follow)
        sa_session.commit()
        return dict(following=True, success=True)
    return dict(redirect="/register")
