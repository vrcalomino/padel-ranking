const config = require("./utils/config");
const app = require("./app");

app.listen(config.PORT, (req, res) => {
  console.log(`Listening on port ${config.PORT}`);
});
