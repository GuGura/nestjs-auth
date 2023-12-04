module.exports = {
  apps: [
    {
      name: 'server',
      cwd: '',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      listen_timeout: 50000,
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'prod',
        PACKAGE_NAME: 'server',
      },
    },
  ],
};
