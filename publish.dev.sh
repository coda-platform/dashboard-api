rm -r -f ./dist

docker build --no-cache -t coda-hub-dashboard-back:dev .

docker tag coda-hub-dashboard-back:dev coda19/coda-hub-dashboard-back:dev
docker push coda19/coda-hub-dashboard-back:dev
echo "Finished running script sleeping 30s"
sleep 30