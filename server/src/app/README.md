# App

Check  [API Doc](https://documenter.getpostman.com/view/3705194/SWEB1FMr?version=latest) for supported APIs.

## Creating Flux flow

 1. Get the available thirdparty apps using **'/tp/apps'**
 2. Get your integrated Thirdparty apps using **'/apps'**
 3. If no app is available use **/integrate/*appName*** to integrate
 4. To get data from Thirdparty app (eg. available channels) use **/tp/*appName*/data/*tpAppid/event/input*** . [Learn more](https://github.com/pesto-students/batch-11-fluxo/blob/master/server/src/thirdparty/slackAPI/README.md)
 5. Construct flux details and post to **/flux** 

