const mongoose=require("mongoose");
require("dotenv").config();

try{
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{useNewUrlParser:true,useUnifiedTopology:true});
    
    const db=mongoose.connection;
    
    db.on('error',console.error.bind(console,'connection error:'));
    db.once('open',function(){
        console.log("connection : successfull");
    })
    }catch(err){
        console.log(err);
}
