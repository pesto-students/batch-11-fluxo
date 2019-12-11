# Slack API 

## How to integrate
Use the below url to integrate the user with slack. Here **code** should be unique token to find your user. This token will be sent in appAdded event.
```
/tp/slack/integrate/:code
```

#### Get events
```
/tp/slack/event
```

```
{
  "status": "success",
  "data": {
    "message_channel": {
      "name":"Message posted to a channel",
      "outputs":["text","user","channel"],
      "inputs":{
        "channel": {
          "name":"Channel Name",
          "optional":false,
          "data":true,
          "endpoint":"/api/conversations.list?types=public_channel"
        }
      }
    }
  }
}
```


#### Get actions
```
/tp/slack/action
```

```
{
  "status":"success",
  "data":{
    "post_message_channel":{
      "name":"Post message to channel",
      "inputs":{
        "channel":{
          "name":"Channel Name",
          "optional":false,
          "data":true,
          "endpoint":"/api/conversations.list?types=public_channel"
          },
        "text":{
          "name":"Message body",
          "optional":false,
          "data":false
          }
        },
      "endpoint":"/api/chat.postMessage"
    }
  }
}
```

In both the APIs, Each input object may have **data** key as true or false. If the data is true it means you can fetch these data from slack.

For eg. Input **channel** has data key as true. This means you can fetch channel details from slack by using the below API.

### Fetch data from slack

```
/data/:integId/:event/:input
```

**integId** - Is provided during appAdded event. let it be 123
**event** - In this case event is **message_channel**. 
**input**- In this example input is **channel**

So the url will be :
```
/data/123/message_channel/channel
```

Response will be:
```
{
   "status":"success",
   "data":{
      "ok":true,
      "channels":[
         {
            "id":"GRFQ4JDDK",
            "name":"personal",
            "is_channel":false,
            "is_group":true,
            "is_im":false,
            "created":1575912240,
            "is_archived":false,
            "is_general":false,
            "unlinked":0,
            "name_normalized":"personal",
            "is_shared":false,
            "parent_conversation":null,
            "creator":"URB8KBJBY",
            "is_ext_shared":false,
            "is_org_shared":false,
            "shared_team_ids":[
               "TR92QKYFP"
            ],
            "pending_shared":[

            ],
            "pending_connected_team_ids":[

            ],
            "is_pending_ext_shared":false,
            "is_member":true,
            "is_private":true,
            "is_mpim":false,
            "last_read":"1576082385.001900",
            "is_open":true,
            "topic":{
               "value":"",
               "creator":"",
               "last_set":0
            },
            "purpose":{
               "value":"",
               "creator":"",
               "last_set":0
            },
            "priority":0
         }
      ],
      "response_metadata":{
         "next_cursor":""
      }
   }
}
```
