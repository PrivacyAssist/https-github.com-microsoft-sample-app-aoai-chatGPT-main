#!/bin/bash

#!/bin/bash

# Rebuild front-end assets
cd frontend
npm install  # Example command for installing Node.js dependencies
npm run build  # Example command for building front-end assets
cd ..

# Start your Python application
python main.py  # Example command for starting the Python application


echo ""
echo "Restoring frontend npm packages"
echo ""
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to restore frontend npm packages"
    exit $?
fi

echo ""
echo "Building frontend"
echo ""
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build frontend"
    exit $?
fi

cd ..
. ./scripts/loadenv.sh

echo ""
echo "Starting backend"
echo ""
./.venv/bin/python -m quart run --port=50505 --host=127.0.0.1 --reload
if [ $? -ne 0 ]; then
    echo "Failed to start backend"
    exit $?
fi
