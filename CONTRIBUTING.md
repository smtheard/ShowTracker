## Contribution Guide

### Getting Started:

Install / Configure Postgres and add development database:
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -i -u postgres
createuser --interactive 
Enter name of role to add: <whatever_username_you_want_for_db_access>
Shall the new role be a superuser? (y/n) y
createdb slothy_development
```

Install Redis (used for storing sessions):
```bash
sudo apt-install redis-server
```

Install pip3 and npm:
```bash
sudo apt-install pip3
sudo apt-install npm
```

Set up Python and NPM dependencies:
```bash
./setup_dev_env.sh
```

The previous command will bundle the external js assets and generate a python virtualenv.

To enable the virtualenv:
```bash
source showtracker-env/bin/activate
```

Finally, to run the app:
```bash
python server.py
```

And to fill database with shows (uses config.py for db info):
```python
python tv_maze_api.py
```
