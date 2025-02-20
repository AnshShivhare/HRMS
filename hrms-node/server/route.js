//v7 imports
import employe from "./api/v1/controllers/employe/routes.js";
import hr from "./api/v1/controllers/hr/routes.js";
import leave from "./api/v1/controllers/leave/routes.js";


/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {
    app.use("/api/v1/employee", employe);
    app.use("/api/v1/hr", hr);
    app.use("/api/v1/leave", leave);

//   app.use("/api/v1/admin", admin);
//   app.use("/api/v1/staticContent", staticContent);
//   app.use("/api/v1/recruiter", recruiter);
//   app.use("/api/v1/notification", notification);
//   app.use("/api/v1/jobs", job);
//   app.use("/api/v1/common", commonroute);
//   app.use("/api/v1/subscription", subscription);



  return app;
}
  