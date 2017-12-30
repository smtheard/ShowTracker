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

Navigate to `localhost:8080/sync-cache` to get data from TVMaze. This is just a hack, the route is limited to development and it is easier to run it inside the app since it needs access to several models.
