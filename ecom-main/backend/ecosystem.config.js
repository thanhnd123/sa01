module.exports = {
  apps: [{
    name: "ecom-api",
    script: "app.py",
    interpreter: "python3",
    watch: true,
    ignore_watch: ["node_modules", "logs", "__pycache__", "*.pyc", "data"],
    env: {
      NODE_ENV: "development",
    }
  }]
} 