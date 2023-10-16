const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

const jwt = require('jsonwebtoken');
require("./db");


//parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


//modules

//user login singup

const registerUser = require("./modules/user/registerUser");
const loginUser = require('./modules/user/loginUser');

//courses
const addCourses = require("./modules/courses/addCourses");
const getAllCourses= require("./modules/courses/getAllCourses");
const getByIdCourses =require("./modules/courses/getByIdCourses");

//accounts

//payIn
const addPayIn = require("./modules/accounts/PayIn/addPayIn");
const getAllPayIn =require("./modules/accounts/PayIn/getAllPayIn");
const getPayInBtnDate = require("./modules/accounts/PayIn/getPayInBtnDate");

//payOut

//payIn
const addPayOut = require("./modules/accounts/PayOut/addPayOut");
const getAllPayOut =require("./modules/accounts/PayOut/getAllPayOut");
const getPayOutBtnDate = require("./modules/accounts/PayOut/getPayOutBtnDate");

//Employee

const addEmployee = require("./modules/employee/addEmp");
const addSalary = require("./modules/employee/addSalary");
const getEmpByField = require("./modules/employee/getEmpByField");
const getAllEmp = require("./modules/employee/getAllEmp");
const updateEmp = require('./modules/employee/updateEmp');

//students

const addStudent = require("./modules/students/addStud");
const getAllStud =require("./modules/students/getAllStud");
const getStudByField = require('./modules/students/getStudByField');
const addFees=require('./modules/students/addFees');
const updateStud = require('./modules/students/updateStud');

//fees

const courseWiseFees = require("./modules/fees/courseWiseFees");
const dateWiseFees = require('./modules/fees/dateWiseFees');
const userModel = require('./models/user/userSchema');

// Middleware for verifying JWT tokens

function verifyToken(req,res,next){
  const token =req.headers['authorization'];

  if(!token){
    return res.status(403).json({error:'No token Provided'});

  }

  jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
      if(err){
          return res.status(401).json({error:'Failed to authenticate token'})
      }
      req.userId = decoded.id;
      next();
  });
}

// Middleware for role-based authorization

function checkRole(role) {
  
  return async (req,res,next)=>{
   const user=  await userModel.findById(req.userId);
      if(!user || !role.includes(user.role)){
        return res.status(403).json({error:"Access Denied"});
      }
      next();
   
  }
}


/**************** fees routes ****************/

app.post("/feesByCourse",verifyToken, checkRole(['admin']),courseWiseFees);
app.post("/feesByDate",verifyToken, checkRole(['admin']),dateWiseFees)


/**************** student routes ****************/

app.post("/students",verifyToken, checkRole(['admin','staff']),addStudent);
app.get("/students",verifyToken, checkRole(['admin','staff']),getAllStud);
app.get("/searchStudents",verifyToken, checkRole(['admin','staff']),getStudByField);
app.patch("/fees",verifyToken, checkRole(['admin','staff']),addFees);
app.patch("/students",verifyToken, checkRole(['admin','staff']),updateStud);

/**************** courses routes ****************/
app.post("/courses",verifyToken, checkRole(['admin']),addCourses);
app.get("/courses",verifyToken, checkRole(['admin']),getAllCourses);
app.get("/course/:id",verifyToken, checkRole(['admin']),getByIdCourses);


/**************** employees ****************/

app.post("/employee",verifyToken, checkRole(['admin']),addEmployee);
app.get("/searchemp",verifyToken, checkRole(['admin']),getEmpByField);
app.get("/employee",verifyToken, checkRole(['admin']),getAllEmp);
app.patch("/employee",verifyToken, checkRole(['admin']),updateEmp);
app.patch("/salary",verifyToken, checkRole(['admin']),addSalary);


 /**************** Accounts ****************/

/****************payIn****************/

app.post("/payIn",verifyToken, checkRole(['admin']),addPayIn);
app.get("/payIn",verifyToken, checkRole(['admin']),getAllPayIn);
//between to date
app.get("/payInBtnDate",verifyToken, checkRole(['admin']),getPayInBtnDate);


/****************payOut****************/

app.post("/payOut",verifyToken, checkRole(['admin']),addPayOut);
app.get("/payOut",verifyToken, checkRole(['admin']),getAllPayOut);
//between to date
app.get("/payOutBtnDate",verifyToken, checkRole(['admin']),getPayOutBtnDate);

/**************** User ****************/

/****************Register User****************/



app.post("/user",verifyToken, checkRole(['admin','staff']),(req,res)=>{
  const role ="student";
  registerUser(req,res,role);
});

app.post("/staff",verifyToken, checkRole(['admin']),(req,res)=>{
   const role ="staff";
   registerUser(req,res,role);
});

//app.post("/staff",registerUser);

app.post("/admin",verifyToken, checkRole(['superadmin']),(req,res)=>{
  const role ="admin";
  registerUser(req,res,role);
});

app.post("/login",loginUser);

app.listen(8000,()=>{
 console.log("connected");
});