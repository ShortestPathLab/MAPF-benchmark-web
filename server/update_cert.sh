#!/bin/bash
/usr/bin/certbot renew --quiet

cp -L /etc/letsencrypt/live/tracker.pathfinding.ai/fullchain.pem /home/ubuntu/mounted/latest_deploy/MAPF-benchmark-web/server/credential/

cp -L /etc/letsencrypt/live/tracker.pathfinding.ai/privkey.pem /home/ubuntu/mounted/latest_deploy/MAPF-benchmark-web/server/credential/

chown ubuntu:ubuntu /home/ubuntu/mounted/latest_deploy/MAPF-benchmark-web/server/credential/fullchain.pem

chown ubuntu:ubuntu /home/ubuntu/mounted/latest_deploy/MAPF-benchmark-web/server/credential/privkey.pem

chmod 640 /home/ubuntu/mounted/latest_deploy/MAPF-benchmark-web/server/credential/*

