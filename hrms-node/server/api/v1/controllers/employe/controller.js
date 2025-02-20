import bcrypt from "bcryptjs";
import Employee from '../../../../models/employe.js';
import Attendance from '../../../../models/attendance.js';
import Leave from '../../../../models/leave.js';
import Payroll from '../../../../models/payroll.js';
import jwt from "jsonwebtoken";
import Response from "../../../../assets/response.js";


export class Controller {


    async register(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
    
            // Check if a user with the same email and role exists
            const existingUser = await Employee.findOne({ email, role });
            if (existingUser) {
                return res.status(400).json({ message: "User with this email and role already exists" });
            }
    
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Create new user
            const employee = new Employee({ name, email, password: hashedPassword, role });
            await employee.save();
    
            return res.json(new Response({},"Employee registered successfully"));
        } catch (error) {
            return next(error);
        }
    }
    
      async login(req, res, next) {
        try {
          const { email, password } = req.body;
          const employee = await Employee.findOne({ email });
          if (!employee) return res.status(400).json({ error: 'User not found' });

          const isMatch = await bcrypt.compare(password, employee.password);
          if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
          const token = jwt.sign({ id: employee._id, role: employee.role }, 'jwtsecret', { expiresIn: '8h' });
          const name = employee.name
          const _id=employee._id
          const user = {
            token,
            email,
            _id,
            name,
            role: employee.role 
          }
          return res.json(new Response(user, "login"));

        } catch (error) {
          return next(error);
        }
      }
      async checkIn(req, res, next) {
        try {
          const existingAttendance = await Attendance.findOne({ 
            employeeId: req.user.id, 
            date: { $gte: new Date().setHours(0, 0, 0, 0) } 
          });
      
          if (existingAttendance) {
            return res.status(400).json({ error: 'You have already checked in today' });
          }
      
          const attendance = new Attendance({ 
            employeeId: req.user.id, 
            checkIn: new Date() 
          });
      
          await attendance.save();
          return res.json(new Response({},'Checked in successfully' ));
        } catch (error) {
          return next(error);
        }
      }
      
      async checkOut(req, res, next) {
        try {
          const attendance = await Attendance.findOne({ 
            employeeId: req.user.id, 
            date: { $gte: new Date().setHours(0, 0, 0, 0) } 
          });
      
          if (!attendance) {
            return res.status(400).json({ error: 'No check-in record found' });
          }
      
          if (attendance.checkOut) {
            return res.status(400).json({ error: 'You have already checked out today' });
          }
      
          attendance.checkOut = new Date();
          await attendance.save();
          return res.json(new Response({},'Checked out successfully' ));
        } catch (error) {
          return next(error);
        }
      }
      

      async applyLeave(req, res, next) {
        try {
          const leave = new Leave({ employeeId: req.user.id, startDate: req.body.startDate, endDate: req.body.endDate });
          await leave.save();
          res.json({ message: 'Leave applied successfully' });
        } catch (error) {
          return next(error);
        }
      }

      async generatePayroll(req, res, next) {
        try {
          if (req.user.role !== 'HR') return res.status(403).json({ error: 'Access denied' });
          const payroll = new Payroll({ employeeId: req.body.employeeId, month: req.body.month, salary: req.body.salary });
          await payroll.save();
          res.json({ message: 'Payroll generated successfully' });
        } catch (error) {
          return next(error);
        }
      }
}

export default new Controller();
