import Express from "express";
import controller from "./controller.js";
import auth from "../../../../helper/auth.js";


export default Express.Router()


.post("/register", controller.register)
.post("/login", controller.login)
.use(auth.verifyToken)
.post('/attendance/check-in',controller.checkIn)
.post('/attendance/check-out',controller.checkOut)
.post('/leave/apply',controller.applyLeave)
.post('/payroll/generate',controller.generatePayroll)

 