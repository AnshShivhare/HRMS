import Mongoose, { Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import bcrypt from "bcryptjs";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

var employeModel = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: { type: String, enum: ['HR', 'Employee'], default: 'Employee' }
      },

  {
    timestamps: true,
  }
);

employeModel.plugin(mongoosePaginate);
employeModel.plugin(mongooseAggregatePaginate);

// Export as default
const Employe = Mongoose.model("Employe", employeModel);
export default Employe;
