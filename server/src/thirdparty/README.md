# Thirdparty 

## How to initialize
In your app use the below code to initialize thirdparty repository

```
import thirdparty from './thirdparty';

thirdparty.initialize();
```
This will initialize your thirdparty module.  This means you can listen to events emitted by thirdparty and perform action on thridparty apps.

## Adding route
Add this route to your app route.
```
import  thirdPartyRouter  from  './thirdparty/routes';

app.use('/tp', thirdPartyRouter);
```

## Listening to events
To listen to events emitted from thirdparty apps use the below code
```
import tpEvent from './thirdparty/event';

tpEvent.on('newEvent', (eventData) => {
  console.log(eventData);
});
```

## Event Lists

### 1. appAdded
Will emit a call when new integration is added by the user.

**params**:
1. appData - Data of thirdparty app. Store this _id to refer this app further. 
```
{
  "_id": "5df115a07c10390c37b7fe12",
  "accountName": "test",
  "appName": "slack",
}
```
2. userToken - User token / ID provided during integrate call. Usually used to identify the user. Thirdparty app won't process this token.

### 2. newEvent
Will emit when a trigger is happened in any of the registered app.

**params**:
1. eventObject - data of the triggered event, with the help of **integratedApps** you can get your data associated with it.
```
{
  eventData: {
    client_msg_id: '1ba71bf2-64b9-4698-bccc-2fea33d42ffd',
    type: 'message',
    text: 'hiasyj',
    user: 'URB8KBJBY',
    ts: '1576082385.001900',
    team: 'TR92QKYFP',
    blocks: [ [Object] ],
    channel: 'GRFQ4JDDK',
    event_ts: '1576082385.001900',
    channel_type: 'group'
  },
  appName: 'slack',
  event: 'message_group',
  integratedApps: [ 5dee7b343232eb3e2767b5ed ]
}
```

### 3. actionUpdate
Will emit an action status.

**params**:
1. actionObject - data with status update event. **id** is the id provided by user while calling the perform action.
```
{ 
 id: 123,
  data: { 
    status: true 
  } 
}
```

## Action

To perform any action on the integrated app, Use the following code.

generateActionEvent(appName, integId, actionData)
```
import { generateActionEvent } from './thirdparty/event';

generateActionEvent('slack', '5dee7b343232eb3e2767b5ed', actionData);
```

1. IntegId - Is provided in **appAdded** event.
2. actionData - actionData needed for the app to perform.

eg:
```
{ 
  id: '123',
  action: 'set_reminder',
  text: 'Sample text',
  time: '2 minutes'
}
``` 

With the **id** you will get the status of the action in **actionUpdate** event
