#!/bin/bash
if ! [ -x "$(command -v pip3)" ]; then
    echo "Error: pip3 is not installed. Install and re-run script"
    exit 1
fi

if ! [ -x "$(command -v npm)" ]; then
    echo "Error: npm is not installed. Install and re-run script"
    exit 1
fi

if ! [ -x "$(command -v redis-server)" ]; then
    echo "Error: redis-server is not installed. Install and re-run script"
    exit 1
fi

if ! pip3 list --format=legacy | grep -F virtualenv
then
    pip3 install virtualenv
fi

python3 -m virtualenv showtracker-env
source showtracker-env/bin/activate
pip install -r requirements.txt
deactivate

npm install
npm run bundle

echo "**************************************"
echo "Enable Virtual Environment: "
echo "source showtracker-env/bin/activate"
echo "Run Server: "
echo "python server.py"
echo "**************************************"
