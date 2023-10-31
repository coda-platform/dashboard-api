rm -r -f ./dist

docker build -t coda-hub-dashboard-back:latest .

docker tag coda-hub-dashboard-back:latest coda19/coda-hub-dashboard-back:latest
docker push coda19/coda-hub-dashboard-back:latest
echo "Finished running script sleeping 30s"
sleep 30