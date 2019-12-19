const github = {
  appName: 'github',
  api: 'https://api.github.com',
  install_url: 'https://github.com/apps/FluxoGithub/installations/new?state=',
  webhook_url: '/repos/:owner/:repo/hooks',
  ngrok_url: 'https://0e886ca7.ngrok.io',
  events: {
    opened_issue: {
      name: 'New Issue',
      outputs: ['title'],
      inputs: {
        login: {
          name: 'Owner Name',
          optional: false,
          data: true,
        },
        name: {
          name: 'Repository Name',
          optional: false,
          data: true,
        },
      },
    },
    created_starred_at: {
      name: 'Star Repository',
      outputs: [],
      inputs: {
        repo: {
          name: 'Repository Name',
          optional: false,
          data: true,
        },
      },
    },
  },
  actions: {
    create_issue: {
      name: 'Create New Issue',
      inputs: {
        title: {
          name: 'Title of Issue',
          optional: false,
          data: true,
        },
        body: {
          name: 'Message body',
          optional: true,
          data: false,
        },
      },
    },
  },
};

export default github;
