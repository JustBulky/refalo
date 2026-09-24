module.exports = {
  apps: [
    {
      name: "refalo",
      script: "node_modules/.bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      cwd: "/home/geo/refalo",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
    },
  ],
};
