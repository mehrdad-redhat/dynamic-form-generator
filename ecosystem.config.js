module.exports = {
  apps : [
    {
      name   : "form-generator-server",
      script : "./server/server.js",
      output: "./logs/form-generator-server-out.log",
      error: "./logs/form-generator-server-error.log"
    }
  ]
}
