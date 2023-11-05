// const mongoose=require("mongoose");
// require("dotenv").config();

// try{
//     mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser:true,useUnifiedTopology:true});
    
//     const db=mongoose.connection;
    
//     db.on('error',console.error.bind(console,'connection error:'));
//     db.once('open',function(){
//         console.log("connection : successfull");
//     })
//     }catch(err){
//         console.log(err);
// }



const mongoose = require('mongoose');
require("dotenv").config();
const uri2 =`${process.env.MONGO_URI}`;
const uri=`${process.env.ONLINE_MONGO_URI}`;
async function run() {
  try {
    // Connect to the MongoDB server
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Confirm a successful connection by checking the state
    if (mongoose.connection.readyState === 1) {
      console.log("Connected to MongoDB!");
    } else {
      console.error("Failed to connect to MongoDB.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run();

