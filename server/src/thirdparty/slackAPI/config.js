const slackConfig = {
  appName: 'slack',
  api: 'https://slack.com',
  event: {
    message_channel: {
      name: 'Message posted to a channel',
      outputs: ['text', 'user', 'channel'],
      inputs: {
        channel: {
          name: 'Channel Name',
          optional: false,
          data: true,
          endpoint: '/api/conversations.list?types=public_channel',
        },
      },
    },
    message_group: {
      name: 'Message posted to a private group',
      outputs: ['text', 'user', 'channel'],
      inputs: {
        channel: {
          name: 'Channel Name',
          optional: false,
          data: true,
          endpoint: '/api/conversations.list?types=private_channel',
        },
      },
    },
  },
  action: {
    post_message_channel: {
      name: 'Post message to channel',
      inputs: {
        channel: {
          name: 'Channel Name',
          optional: false,
          data: true,
          endpoint: '/api/conversations.list?types=public_channel',
        },
        text: {
          name: 'Message body',
          optional: false,
          data: false,
        },
      },
      endpoint: '/api/chat.postMessage',
    },
    set_reminder: {
      name: 'Set reminder in slack',
      inputs: {
        text: {
          name: 'Message body',
          optional: false,
          data: false,
        },
        time: {
          name: 'Time: can be natural language',
          optional: false,
          data: false,
        },
      },
      endpoint: '/api/reminders.add',
    },
  },
};

export default slackConfig;
