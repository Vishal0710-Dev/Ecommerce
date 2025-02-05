import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:[true, 'email already taken']
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type:String,
        required:[true, 'address is required']
    },
    city:{
        type:String,
        required:[true, 'city is required']
    },
    country:{
        type:String,
        required:[true, 'country is required']
    },
    phone:{
        type:String,
        required:[true, 'phone no is required']
    },
    role: {
        type: String,
        enum:['user', 'admin'],
        default:'user'
    }
},{timestamps:true});
  export const userModel = mongoose.model("Users", userSchema);
  export default userModel;




  