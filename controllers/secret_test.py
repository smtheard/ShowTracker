from config import app
from models.tv_maze_api import TVMazeAPI

@app.get('/secret-test')
def secrettest():
  TVMazeAPI.sync_cache()