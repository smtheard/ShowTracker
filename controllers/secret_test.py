from config import app
from models.tv_maze_api import TVMazeAPI

@app.get('/secret-test')
def secrettest():
  tv_api = TVMazeAPI()
  tv_api.fetch("Game of Thrones")
