import Express from "express";
import Controller from "./controller.js";
import auth from "../../../../helper/auth.js";

export default Express.Router()

.use(auth.verifyToken)
.get("/all-employee", Controller.getAllEmployees)
.get("/all-employee-count", Controller.getEmployeeCount)

.delete("/remove-employee",Controller.removeEmployee)

