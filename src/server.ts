import errorHandler from "errorhandler";
import app from "./app";
import "reflect-metadata";
import connection from "./db";

connection.authenticate().then(_ => {

  app.use(errorHandler());

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });

}).catch(error => console.log(error));

