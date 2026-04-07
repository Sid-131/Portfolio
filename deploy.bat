@echo off
echo Building...
call npm run build

echo Uploading to server...
scp -r dist/assets platform@192.168.29.217:~/portfolio/dist/
scp dist/index.html platform@192.168.29.217:~/portfolio/dist/

echo Restarting container...
ssh platform@192.168.29.217 "docker restart sidmatrix-portfolio"

echo Done! sidmatrix.xyz is updated.
