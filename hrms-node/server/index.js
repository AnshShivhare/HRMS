import Routes from "./route.js";
import Server from "./common/server.js";

const dbUrl = `mongodb+srv://${process.env.ATLAS_CONFIG_DATABASE_USER}:${process.env.ATLAS_CONFIG_DATABASE_PASS}@${process.env.ATLAS_CONFIG_CLUSTER_HOST}/${process.env.ATLAS_CONFIG_DATABASE_NAME}`;
// const dbUrl = `mongodb+srv://${Config.get("atlasConfig.databaseUser")}:${Config.get("atlasConfig.databasePass")}@${Config.get("atlasConfig.clusterHost")}/${Config.get("atlasConfig.databaseName")}`;
 
const server = new Server()
  .router(Routes)
  .handleError()
  .configureDb(dbUrl)
  .then((_server) => _server.listen(process.env.port));

export default server;
 