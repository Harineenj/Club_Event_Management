const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () =>{
  try{
     await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
     });
     console.log("mongodb connected successfully")
    }
    catch(error){
        console.error("MongoDB Connection Failed:", error.message);
    }
}

module.exports = connectDB;