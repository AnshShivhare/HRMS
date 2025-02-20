import Mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";

const attendanceSchema = new Schema(
    {
        employeeId: Mongoose.Schema.Types.ObjectId,
        date: { type: Date, default: Date.now },
        checkIn: Date,
        checkOut: Date
    },
    {
        timestamps: true,
    }
);

attendanceSchema.plugin(mongoosePaginate);
attendanceSchema.plugin(mongooseAggregatePaginate);

// Export as default
const Attendance = Mongoose.model("Attendance", attendanceSchema);
export default Attendance;
