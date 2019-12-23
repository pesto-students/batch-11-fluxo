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
          data: false,
        },
        name: {
          name: 'Repository Name',
          optional: false,
          data: false,
        },
      },
    },
    created_starred_at: {
      name: 'Star Repository',
      outputs: [],
      inputs: {
        login: {
          name: 'Owner Name',
          optional: false,
          data: false,
        },
        name: {
          name: 'Repository Name',
          optional: false,
          data: false,
        },
      },
    },
    opened_pull_request: {
      name: 'New Pull Request',
      outputs: [],
      inputs: {
        login: {
          name: 'Owner Name',
          optional: false,
          data: false,
        },
        name: {
          name: 'Repository Name',
          optional: false,
          data: false,
        },
      },
    },
  },
  actions: {
    create_issue: {
      name: 'Create New Issue',
      inputs: {
        fullRepo: {
          name: 'Repository name (owner/name)',
          optional: false,
          data: false,
        },
        title: {
          name: 'Title of Issue',
          optional: false,
          data: false,
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
