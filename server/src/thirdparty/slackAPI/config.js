const slackConfig = {
  event: {
    message_channel: {
      name: 'Message posted to channel',
      outputs: ['text', 'user', 'channel'],
      inputs: ['channel'],
    },
  },
  action: {
    post_message_channel: {
      name: 'Post message to channel',
      inputs: ['channel', 'text'],
      endpoint: 'https://slack.com/api/chat.postMessage',
    },
  },
};

export default slackConfig;
