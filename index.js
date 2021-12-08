const settings = require("./settings.json");
const path = require("path");
const express = require("express");
const webServer = express();

webServer.use(express.static("frontend"));

webServer.use(express.json({ limit: "100MB" }));

webServer.listen(settings.port, () =>
  console.log("Listening on http://localhost:" + settings.port)
);

const driver = require("better-sqlite3");
const db = driver(path.join(__dirname, "database", settings.dbName));

webServer.get("/api/:table", (req, res) => {
  let preparedStatement = db.prepare(`
  SELECT *
   FROM ${req.params.table}
   `);
  let result = preparedStatement.all();
  res.json(result);
});
