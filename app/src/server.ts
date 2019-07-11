import errorHandler from "errorhandler";
import app from "./app";
import "reflect-metadata";
import database from "./db";

database.authenticate().then((_: any) => {

  app.use(errorHandler());

  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });

}).catch((error: any) => console.log(error));

