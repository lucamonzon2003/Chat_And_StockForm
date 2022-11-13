const http = require('./src/app');

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log("Server listen on port " + PORT);
});