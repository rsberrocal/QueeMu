#!/bin/bash

if [ $# -gt 0 ];then

    case "$1" in
    "start")
        nohup node index.js > bot.log 2>&1 &
        echo $! > pid
    ;;
    "stop")
        kill $(cat pid)
    ;;
    esac
fi
