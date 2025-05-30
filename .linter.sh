#!/bin/bash
cd /home/kavia/workspace/code-generation/skillbridge-navigator-15112-5c212636/skillbridge_navigator
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

