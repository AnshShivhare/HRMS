import Employee from "../../../../models/employe.js";
import Response from "../../../../assets/response.js";

export class Controller {
  
  // Get all employees with role "Employee"
  async getAllEmployees(req, res, next) {
    try {
      const employees = await Employee.find({ role: "Employee" }).select("-password");
      return res.json(new Response(employees, "Employee list fetched successfully"));
    } catch (error) {
      return next(error);
    }
  }

  async getEmployeeCount(req, res, next) {
    try {
      const count = await Employee.countDocuments({ role: "Employee" });
      return res.json(new Response({ totalEmployees: count }, "Employee count fetched successfully"));
    } catch (error) {
      return next(error);
    }
  }
  

  // Remove an employee by ID
  async removeEmployee(req, res, next) {
    try {
      
      if (req.user.role !== "HR") {
        return res.status(403).json({ error: "Access denied" });
      }
        console.log(req,"000000000000000000000000000000000000")
      const employee = await Employee.findById(req.query.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }

      await employee.deleteOne();
      return res.json(new Response({}, "Employee removed successfully"));
    } catch (error) {
      return next(error);
    }
  }
}

export default new Controller();
