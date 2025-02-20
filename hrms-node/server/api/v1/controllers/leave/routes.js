import Express from "express";
import controller from "./controller.js";
import auth from "../../../../helper/auth.js";


export default Express.Router()

.use(auth.verifyToken)
.post("/apply", controller.applyLeave)
.get("/get-all-leave", controller.getLeaves)
.patch("/update-status", controller.updateLeaveStatus)
