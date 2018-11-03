export default {
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  databaseUrl: () => {
    let url = "postgres://";
    if (process.env.DB_USERNAME) { url += process.env.DB_USERNAME + ":"; }
    if (process.env.DB_PASSWORD) { url += ":" + process.env.DB_PASSWORD; }
    url += "@" + process.env.DB_HOST;
    url += "/" + process.env.DB_NAME;
    return url;
  }
};