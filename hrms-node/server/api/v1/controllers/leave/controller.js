import bcrypt from "bcryptjs";
import Employee from '../../../../models/employe.js';
import Attendance from '../../../../models/attendance.js';
import Leave from '../../../../models/leave.js';
import Payroll from '../../../../models/payroll.js';
import jwt from "jsonwebtoken";
import Response from "../../../../assets/response.js";


export class Controller {

    async applyLeave(req, res, next) {
        try {
            const { startDate, endDate } = req.body;

            const employeeId=req.user.id
            console.log(req,"--------------------------------")

            // Find the employee details from the database
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
     
            // Create a new leave request
            const newLeave = new Leave({
                employeeId,
                employeeName: employee.name, // Fetching name from Employee collection
                startDate,
                endDate,
                status: "Pending"
            });
    
            await newLeave.save();
            return res.json(new Response({ message: "Leave request submitted successfully" }));
        } catch (error) {
            return next(error);
        }
    }
    
    
      // Get All Leaves (HR) or Employee's Own Leaves
       async getLeaves(req, res, next) {
        try {
          const role = req.user.role;
      
          const employeeId=req.user.id
console.log(req,employeeId)
          const leaves = role === "HR" ? await Leave.find() : await Leave.find({ employeeId });
          return res.json(new Response({ leaves }, "Leave requests fetched successfully"));
        } catch (error) {
          return next(error);
        }
      }
    
      // Update Leave Status (HR Only)
       async updateLeaveStatus(req, res, next) {
        try {
          const { status } = req.body;
          if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json(new Response(null, "Invalid status update", false));
          }
          await Leave.findByIdAndUpdate(req.query.id, { status });
          return res.json(new Response({ message: "Leave status updated successfully" }));
        } catch (error) {
          return next(error);
        }
      }
}

export default new Controller();

