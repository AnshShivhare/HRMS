import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcryptjs";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

var leaveModel = new Schema(
    {
        employeeId: Mongoose.Schema.Types.ObjectId,
        employeeName: { type: String},
        startDate: { type: Date},
        endDate: { type: Date},
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
      },

  {
    timestamps: true,
  }
);

leaveModel.plugin(mongoosePaginate);
leaveModel.plugin(mongooseAggregatePaginate);
const Leave = Mongoose.model("Leave", leaveModel);
export default Leave;