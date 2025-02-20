import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcryptjs";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

var payrollModel = new Schema(
    {
        employeeId: Mongoose.Schema.Types.ObjectId,
        month: String,
        salary: Number
      },

  {
    timestamps: true,
  }
);

payrollModel.plugin(mongoosePaginate);
payrollModel.plugin(mongooseAggregatePaginate);
const Payroll = Mongoose.model("Payroll", payrollModel);
export default Payroll;