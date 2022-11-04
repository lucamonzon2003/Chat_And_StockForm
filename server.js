const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.info(`server up and runnig on port ${PORT}`));